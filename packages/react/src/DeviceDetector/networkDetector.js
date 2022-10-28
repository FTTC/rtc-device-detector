import a18n from 'a18n';
import React, { useState, useEffect, useMemo } from 'react';
import Button from './base-components/button/button';
import RTCDetect from 'rtc-detect';
import TRTC from 'trtc-js-sdk';
import { NETWORK_QUALITY } from './utils';

let uplinkClient = null;
let downlinkClient = null;
let uplinkStream = null;
const networkTestingResult = {
  uplinkNetworkQualities: [],
  downlinkNetworkQualities: [],
  rttList: [],
};
const currentDetector = 'network';
let timer = null;

export default function networkDetector({ activeDetector, networkDetectInfo, handleCompleted, generateReport }) {
  const [detectorInfo, setDetectorInfo] = useState({});
  const [count, setCount] = useState(15);

  useEffect(() => () => {
    setDetectorInfo({});
  }, []);

  useEffect(() => {
    if (activeDetector === currentDetector && count !== 0) {
      setCount(15);
      getDetectorInfo();
    }
    return () => {
      clearInterval(timer);
      uplinkStream && uplinkStream.close();
      uplinkClient && uplinkClient.leave();
      downlinkClient && downlinkClient.leave();
    };
  }, [activeDetector]);

  useEffect(() => {
    if (count === 0) {
      getAverageInfo(detectorInfo);
      uplinkStream && uplinkStream.close();
      uplinkClient && uplinkClient.leave();
      downlinkClient && downlinkClient.leave();
    }
  }, [count]);

  const showRttValue = useMemo(() => {
    if (typeof detectorInfo.rtt === 'undefined') {
      return '';
    }
    if (detectorInfo.rtt === 0) {
      return a18n('未知');
    }
    return `${detectorInfo.rtt}ms`;
  }, [detectorInfo.rtt]);

  const isWebRTCSupported = () => {
    const apiList = ['RTCPeerConnection', 'webkitRTCPeerConnection', 'RTCIceGatherer'];
    return apiList.filter(api => api in window).length > 0;
  };

  const isUserMediaSupported = () => {
    if (!navigator.mediaDevices) {
      return false;
    }
    const apiList = ['getUserMedia', 'enumerateDevices'];
    return apiList.filter(api => api in navigator.mediaDevices).length === apiList.length;
  };

  const isWebSocketSupported = () => 'WebSocket' in window && 2 === window.WebSocket.CLOSING;

  const getDetectorInfo = async () => {
    const detect = new RTCDetect();
    const systemResult = detect.getSystem();
    const webRTCSupportResult = isWebRTCSupported && isUserMediaSupported && isWebSocketSupported;
    const APISupportResult = detect.getAPISupported();

    const detectorInfo = {
      system: systemResult.OS,
      browser: `${systemResult.browser.name} ${systemResult.browser.version}`,
      TRTCSupport: webRTCSupportResult ? a18n('支持') : a18n('不支持'),
      screenMediaSupport: APISupportResult.isScreenCaptureAPISupported ? a18n('支持') : a18n('不支持'),
    };
    setDetectorInfo(detectorInfo);

    timer = setInterval(() => {
      setCount((prevValue) => {
        const newValue = prevValue - 1;
        if (newValue === 0) {
          clearInterval(timer);
          return 0;
        }
        return newValue;
      });
    }, 1000);

    testUplinkNetworkQuality();
    testDownlinkNetworkQuality();
  };

  // 获取上行网络质量和RTT
  const testUplinkNetworkQuality = async () => {
    const { sdkAppId, roomId } = networkDetectInfo;
    const { uplinkUserId, uplinkUserSig } = networkDetectInfo.uplinkUserInfo;
    uplinkClient = TRTC.createClient({
      sdkAppId,
      userId: uplinkUserId,
      userSig: uplinkUserSig,
      mode: 'rtc',
      useStringRoomId: typeof(roomId) === 'string',
    });

    uplinkStream = TRTC.createStream({ audio: true, video: false });
    await uplinkStream.initialize();

    uplinkClient.on('network-quality', async (event) => {
      const { uplinkNetworkQuality } = event;
      networkTestingResult.uplinkNetworkQualities.push(uplinkNetworkQuality);
      setDetectorInfo(prevConfig => ({
        ...prevConfig,
        uplinkQuality: uplinkNetworkQuality,
      }));
      const { rtt } = await uplinkClient.getTransportStats();
      setDetectorInfo(prevConfig => ({
        ...prevConfig,
        rtt,
      }));
      networkTestingResult.rttList.push(rtt);
    });

    await uplinkClient.join({ roomId }); // 加入用于测试的房间
    await uplinkClient.publish(uplinkStream);
  };

  // 获取下行网络质量
  async function testDownlinkNetworkQuality() {
    const { sdkAppId, roomId } = networkDetectInfo;
    const { downlinkUserId, downlinkUserSig } = networkDetectInfo.downlinkUserInfo;
    downlinkClient = TRTC.createClient({
      sdkAppId,
      userId: downlinkUserId,
      userSig: downlinkUserSig,
      mode: 'rtc',
      useStringRoomId: typeof(roomId) === 'string',
    });

    downlinkClient.on('stream-added', async (event) => {
      await downlinkClient.subscribe(event.stream, { audio: true, video: true });
      downlinkClient.on('network-quality', (event) => {
        const { downlinkNetworkQuality } = event;
        networkTestingResult.downlinkNetworkQualities.push(downlinkNetworkQuality);
        setDetectorInfo(prevConfig => ({
          ...prevConfig,
          downlinkQuality: downlinkNetworkQuality,
        }));
      });
    });

    await downlinkClient.join({ roomId }); // 加入用于测试的房间
  }

  // 获取15秒检测平均值
  const getAverageInfo = (detectorInfo) => {
    const uplinkAverageQuality = Math.ceil(networkTestingResult.uplinkNetworkQualities
      .reduce((value, current) => value + current, 0) / networkTestingResult.uplinkNetworkQualities.length);
    const downlinkAverageQuality = Math.ceil(networkTestingResult.downlinkNetworkQualities
      .reduce((value, current) => value + current, 0) / networkTestingResult.downlinkNetworkQualities.length);
    const rttAverageQuality = Math.ceil(networkTestingResult.rttList
      .reduce((value, current) => value + current, 0) / networkTestingResult.rttList.length);
    const detectorResultInfo = {
      ...detectorInfo,
      uplinkQuality: uplinkAverageQuality,
      downlinkQuality: downlinkAverageQuality,
      rtt: rttAverageQuality,
    };
    if (networkTestingResult.uplinkNetworkQualities.length === 0) {
      detectorResultInfo.uplinkQuality = 0;
    }
    if (networkTestingResult.downlinkNetworkQualities.length === 0) {
      detectorResultInfo.downlinkQuality = 0;
    }
    if (networkTestingResult.rttList.length === 0) {
      detectorResultInfo.rtt = 0;
    }
    networkTestingResult.uplinkNetworkQualities = [];
    networkTestingResult.downlinkNetworkQualities = [];
    networkTestingResult.rttList = [];
    handleCompleted('success', detectorResultInfo);
    setDetectorInfo(detectorResultInfo);
  };

  return activeDetector === currentDetector && (
    <div className="testing-body">
      <div className="testing-list">
        <div className="testing-item-container">
          <div>{a18n('操作系统')}</div>
          <div className={!detectorInfo.system ? 'network-loading' : ''}>{detectorInfo.system}</div>
        </div>
        <div className="testing-item-container">
          <div>{a18n('浏览器')}</div>
          <div className={!detectorInfo.browser ? 'network-loading' : ''}>{detectorInfo.browser}</div>
        </div>
        <div className="testing-item-container">
          <div>{a18n('是否支持TRTC')}</div>
          <div className={!detectorInfo.TRTCSupport ? 'network-loading' : ''}>{detectorInfo.TRTCSupport}</div>
        </div>
        <div className="testing-item-container">
          <div>{a18n('是否支持屏幕分享')}</div>
          <div className={!detectorInfo.screenMediaSupport ? 'network-loading' : ''}>{detectorInfo.screenMediaSupport}</div>
        </div>
        <div className="testing-item-container">
          <div>{a18n('网络延时')}</div>
          <div className={typeof detectorInfo.rtt === 'undefined' ? 'network-loading' : ''}>{showRttValue}</div>
        </div>
        <div className="testing-item-container">
          <div>{a18n('上行网络质量')}</div>
          <div className={!NETWORK_QUALITY[detectorInfo.uplinkQuality] ? 'network-loading' : ''}>{a18n(NETWORK_QUALITY[detectorInfo.uplinkQuality] || '')}</div>
        </div>
        <div className="testing-item-container">
          <div>{a18n('下行网络质量')}</div>
          <div className={!NETWORK_QUALITY[detectorInfo.downlinkQuality] ? 'network-loading' : ''}>{a18n(NETWORK_QUALITY[detectorInfo.downlinkQuality] || '')}</div>
        </div>
      </div>
      {
        count > 0
          ? <Button className="gray-button" type="disabled">{a18n`剩余检测时间（${count}）s`}</Button>
          : <Button
            className="report-button"
            type="contained"
            onClick={generateReport}>{a18n('查看检测报告')}</Button>
      }
    </div>
  );
}
