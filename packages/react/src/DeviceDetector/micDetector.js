import a18n from 'a18n';
import React, { useState, useEffect } from 'react';
import './index.scss';
import DeviceSelect from './deviceSelect';
import Button from './base-components/button/button';
import TRTC from 'trtc-js-sdk';

let localStream = null;
const currentDetector = 'microphone';
let timer = null;
export default function MicrophoneDetector({ activeDetector, handleCompleted }) {
  const [microphoneID, setMicrophoneID] = useState('');
  const [microphoneLabel, setMicrophoneLabel] = useState('');
  const [volumeNum, setVolumeNum] = useState(0);
  const [choseDevice, setChoseDevice] = useState(null);

  const initStream = async (microphoneID) => {
    console.log('microphoneID', microphoneID);
    localStream = TRTC.createStream({
      video: false,
      audio: true,
      microphoneId: microphoneID,
    });
    await localStream.initialize();
    localStream.play('audio-container');
    timer = setInterval(() => {
      const volume = localStream.getAudioLevel();
      setVolumeNum(Math.ceil(28 * volume));
    }, 100);
  };

  useEffect(() => {
    if (activeDetector === currentDetector && !localStream && microphoneID) {
      initStream(microphoneID);
    }
    return () => {
      if (activeDetector === currentDetector) {
        localStream && localStream.close();
        localStream = null;
        clearInterval(timer);
        setVolumeNum(0);
      }
    };
  }, [activeDetector]);

  const handleMicrophoneChange = async (microphoneDevice) => {
    setChoseDevice(microphoneDevice);
    const { deviceId, label } = microphoneDevice;
    if (localStream) {
      localStream.switchDevice('audio', deviceId);
    } else {
      initStream(deviceId);
    }
    setMicrophoneID(deviceId);
    setMicrophoneLabel(label);
  };

  return activeDetector === currentDetector && (
    <div className="testing-body">
      <div className="device-list">
        <span className="device-list-title">{a18n('麦克风选择')}</span>
        <DeviceSelect
          deviceType="microphone"
          choseDevice={choseDevice}
          onChange={handleMicrophoneChange}></DeviceSelect>
      </div>
      <div className="mic-testing-container">
        <div className="mic-testing-info">{a18n('对着麦克风说"哈喽"试试～')}</div>
        <div className="mic-bar-container">
          {
            new Array(28).fill('')
              .map((item, index) => <div key={index} className={`mic-bar ${volumeNum > index && 'active'}`}></div>)
          }
        </div>
        <div id="audio-container"></div>
      </div>
      <div className="testing-info-container">
        <div className="testing-info">{a18n('是否可以看到音量图标跳动？')}</div>
        <div className="button-list">
          <Button type="outlined" onClick={() => handleCompleted('error', microphoneLabel)}>{a18n('看不到')}</Button>
          <Button type="contained" onClick={() => handleCompleted('success', microphoneLabel)}>{a18n('看的到')}</Button>
        </div>
      </div>
    </div>
  );
}
