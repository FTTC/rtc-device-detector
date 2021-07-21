import a18n from 'a18n';
import React, { useState, useEffect } from 'react';
import TRTC from 'trtc-js-sdk';
import './index.scss';
import Button from './base-components/button/button';
import {
  isOnline,
  handleGetUserMediaError,
  CameraIcon,
  MicIcon,
  SpeakerIcon,
  NetworkIcon,
  ErrorIcon,
} from './utils';

const deviceFailAttention = a18n('1. 若浏览器弹出提示，请选择“允许”<br>')
  + a18n('2. 若杀毒软件弹出提示，请选择“允许”<br>')
  + a18n('3. 检查系统设置，允许浏览器访问摄像头及麦克风<br>')
  + a18n('4. 检查浏览器设置，允许网页访问摄像头及麦克风<br>')
  + a18n('5. 检查摄像头/麦克风是否正确连接并开启<br>')
  + a18n('6. 尝试重新连接摄像头/麦克风<br>')
  + a18n('7. 尝试重启设备后重新检测');
const networkFailAttention = a18n('1. 请检查设备是否联网<br>')
  + a18n('2. 请刷新网页后再次检测<br>')
  + a18n('3. 请尝试更换网络后再次检测');

export default function DeviceConnect({ stepNameList, startDeviceDetect }) {
  const [progress, setProgress] = useState(0);
  const [deviceState, setDeviceState] = useState({});
  const [connectResult, setConnectResult] = useState({});
  const [showConnectResult, setShowConnectResult] = useState(false);
  const [showRemind, setShowRemind] = useState(false);
  const hasCameraDetect = stepNameList.indexOf('camera') >= 0;
  const hasMicrophoneDetect = stepNameList.indexOf('microphone') >= 0;
  const hasSpeakerDetect = stepNameList.indexOf('speaker') >= 0;
  const hasNetworkDetect = stepNameList.indexOf('network') >= 0;

  useEffect(() => () => {
    handleReset();
  }, []);

  const handleReset = () => {
    setProgress(0);
    setConnectResult({});
    setShowConnectResult(false);
  };

  const getDeviceConnectResult = async () => {
    const cameraList = await TRTC.getCameras();
    const micList = await TRTC.getMicrophones();
    const speakerList = await TRTC.getSpeakers();
    const hasCameraDevice = cameraList.length > 0;
    const hasMicrophoneDevice = micList.length > 0;
    const hasSpeakerDevice = hasSpeakerDetect ? speakerList.length > 0 : true;
    const hasNetworkConnect = hasNetworkDetect ? await isOnline() : true;
    let deviceStateObj = {
      hasCameraDevice,
      hasMicrophoneDevice,
      hasSpeakerDevice,
      hasNetworkConnect,
      hasCameraConnect: false,
      hasMicrophoneConnect: false,
      hasSpeakerConnect: hasSpeakerDevice,
    };
    setDeviceState(deviceStateObj);
    setConnectResult(getDeviceConnectInfo(deviceStateObj));

    if (hasCameraDevice) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          deviceStateObj = {
            ...deviceStateObj,
            hasCameraConnect: true,
          };
          setDeviceState(deviceStateObj);
          // 显示设备连接信息
          setConnectResult(getDeviceConnectInfo(deviceStateObj));
          // 释放摄像头设备
          stream.getTracks()[0].stop();
        })
        .catch((error) => {
          handleGetUserMediaError(error);
        });
    }

    if (hasMicrophoneDevice) {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: hasMicrophoneDevice })
        .then((stream) => {
          deviceStateObj = {
            ...deviceStateObj,
            hasMicrophoneConnect: hasMicrophoneDevice,
          };
          setDeviceState(deviceStateObj);
          // 显示设备连接信息
          setConnectResult(getDeviceConnectInfo(deviceStateObj));
          // 释放麦克风设备
          stream.getTracks()[0].stop();
        })
        .catch((error) => {
          handleGetUserMediaError(error);
        });
    }
  };

  const getDeviceConnectInfo = (deviceState) =>  {
    let connectInfo = a18n('连接出错，请重试');
    if (deviceState.hasCameraConnect
      && deviceState.hasMicrophoneConnect
      && deviceState.hasSpeakerConnect
      && deviceState.hasNetworkConnect) {
      if (hasNetworkDetect) {
        connectInfo = a18n('设备及网络连接成功，请开始设备检测');
      } else {
        connectInfo = a18n('设备连接成功，请开始设备检测');
      }
      return {
        info: connectInfo,
        success: true,
      };
    }
    // 第一步：浏览器未检测到摄像头/麦克风/扬声器设备的提示
    if (!(deviceState.hasCameraDevice && deviceState.hasMicrophoneDevice && deviceState.hasSpeakerDevice)) {
      connectInfo = a18n`未检测到${deviceState.hasCameraDevice ? '' : a18n('【摄像头】')}${deviceState.hasMicrophoneDevice ? '' : a18n('【麦克风】')}${deviceState.hasSpeakerDevice ? '' : a18n('【扬声器】')}设备，请检查设备连接`;
      return {
        info: connectInfo,
        success: false,
      };
    }
    // 第二步：浏览器未拿到摄像头/麦克风权限的提示
    if (!(deviceState.hasCameraConnect && deviceState.hasMicrophoneConnect)) {
      connectInfo = deviceState.hasNetworkConnect
        ? a18n('请允许浏览器及网页访问摄像头/麦克风设备')
        : a18n('请允许浏览器及网页访问摄像头/麦克风设备，并检查网络连接');
      return {
        info: connectInfo,
        success: false,
        remind: deviceFailAttention,
      };
    }
    // 第三步：浏览器检测未连接网络的提示
    if (!deviceState.hasNetworkConnect) {
      connectInfo = a18n('网络连接失败，请检查网络连接');
      return {
        info: connectInfo,
        success: false,
        remind: networkFailAttention,
      };
    }
    return {
      info: connectInfo,
      success: false,
    };
  };

  useEffect(() => {
    let interval;
    if (showConnectResult === false) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            setShowConnectResult(true);
            return 100;
          }
          return oldProgress + 10;
        });
      }, 200);
      getDeviceConnectResult();
    }
    return () => {
      clearInterval(interval);
    };
  }, [showConnectResult]);

  return (
    <div className="device-connect">
      <div className="testing-title">{a18n('设备连接')}</div>
      <div className="testing-prepare-info">
      {
        a18n`设备检测前请确认设备连接了${hasCameraDetect ? a18n('摄像头') : ''}${hasMicrophoneDetect ? a18n('、麦克风') : ''}${hasSpeakerDetect ? a18n('、扬声器') : ''}${hasNetworkDetect ? a18n('和网络') : ''}`
      }
      </div>
      <div className="device-display">
      {
        stepNameList.map((stepName, index) => {
          if (stepName === 'camera') {
            return (
              <div key={index} className={`${showConnectResult && (deviceState.hasCameraConnect ? 'connect-success' : 'connect-fail')}`}>
                <span className="device">
                  {CameraIcon}
                </span>
              </div>
            );
          }
          if (stepName === 'microphone') {
            return (
              <div key={index} className={`${showConnectResult && (deviceState.hasMicrophoneConnect ? 'connect-success' : 'connect-fail')}`}>
                <span className="device">
                  {MicIcon}
                </span>
              </div>
            );
          }
          if (stepName === 'speaker') {
            return (
              <div key={index} className={`${showConnectResult && (deviceState.hasSpeakerConnect ? 'connect-success' : 'connect-fail')}`}>
                <span className="device">
                  {SpeakerIcon}
                </span>
              </div>
            );
          }
          if (stepName === 'network') {
            return (
              <div key={index} className={`${showConnectResult && (deviceState.hasNetworkConnect ? 'connect-success' : 'connect-fail')}`}>
                <span className="device">
                  {NetworkIcon}
                </span>
              </div>
            );
          }
          return null;
        })
      }
      {
        !showConnectResult && (
          <div className="outer-progress">
            <div className="inner-progress" style={{ transform: `translateX(${progress - 100}%)` }}></div>
          </div>
        )
      }
      </div>
      {
        !showConnectResult && <div className="text gray-text">{a18n('设备正在连接中，请稍后')}</div>
      }
      {
        showConnectResult && <div className={`text ${connectResult.success ? 'green-text' : 'red-text'}`}>
          <span>{connectResult.info}</span>
          {
            connectResult.remind
              && <div
                className="error-connect"
                onTouchStart={() => setShowRemind(true)}
                onMouseEnter={() => setShowRemind(true)}
                onTouchEnd={() => setShowRemind(false)}
                onMouseLeave={() => setShowRemind(false)}>
                <span className="error-icon">
                  {ErrorIcon}
                </span>
                {
                  showRemind && (
                    <div className="connect-attention-info" dangerouslySetInnerHTML={{ __html: connectResult.remind }}>
                    </div>
                  )
                }
              </div>
          }
        </div>
      }
      <div className="button-container">
        {
          !showConnectResult && <Button type='disabled'>{a18n('开始检测')}</Button>
        }
        {
          showConnectResult
            && !(deviceState.hasCameraConnect
            && deviceState.hasMicrophoneConnect
            && deviceState.hasSpeakerConnect
            && deviceState.hasNetworkConnect)
          && <Button type='contained' onClick={handleReset}>{a18n('重新连接')}</Button>
        }
        {
          showConnectResult && (deviceState.hasCameraConnect
            && deviceState.hasMicrophoneConnect
            && deviceState.hasSpeakerConnect
            && deviceState.hasNetworkConnect)
          && <Button type='contained' onClick={startDeviceDetect}>{a18n('开始检测')}</Button>
        }
      </div>
    </div>
  );
}
