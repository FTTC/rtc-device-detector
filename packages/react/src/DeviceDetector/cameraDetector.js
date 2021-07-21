import a18n from 'a18n';
import React, { useState, useEffect } from 'react';
import './index.scss';
import DeviceSelect from './deviceSelect';
import Button from './base-components/button/button.js';
import TRTC from 'trtc-js-sdk';

let localStream = null;
const currentDetector = 'camera';
export default function cameraDetector({ activeDetector, handleCompleted }) {
  const [cameraLabel, setCameraLabel] = useState('');
  const [cameraID, setCameraID] = useState('');

  const initStream = async (cameraID) => {
    localStream = TRTC.createStream({
      video: true,
      audio: false,
      cameraId: cameraID,
    });
    await localStream.initialize();
    localStream.play('camera-video');
  };

  useEffect(() => {
    if (activeDetector === currentDetector && !localStream && cameraID) {
      initStream(cameraID);
    }
    return () => {
      if (activeDetector === currentDetector) {
        localStream && localStream.close();
        localStream = null;
      }
    };
  }, [activeDetector]);

  const handleCameraChange = async (cameraDevice) => {
    const { deviceId, label } = cameraDevice;
    if (localStream) {
      localStream.switchDevice('video', deviceId);
    } else {
      initStream(deviceId);
    }
    setCameraID(deviceId);
    setCameraLabel(label);
  };

  const handleError = () => {
    handleCompleted('error', cameraLabel);
  };

  const handleSuccess = () => {
    handleCompleted('success', cameraLabel);
  };

  return (
    <div className={`testing-body ${activeDetector !== currentDetector && 'hide'}`}>
      <div className="device-list">
        <span className="device-list-title">{a18n('摄像头选择')}</span>
        <DeviceSelect deviceType="camera" onChange={handleCameraChange}></DeviceSelect>
      </div>
      <div id="camera-video" className="camera-video"></div>
      <div className="testing-info-container">
        <div className="testing-info">{a18n('是否可以清楚的看到自己？')}</div>
        <div className="button-list">
          <Button type="outlined" onClick={handleError}>{a18n('看不到')}</Button>
          <Button type="contained" onClick={handleSuccess}>{a18n('看的到')}</Button>
        </div>
      </div>
    </div>
  );
}
