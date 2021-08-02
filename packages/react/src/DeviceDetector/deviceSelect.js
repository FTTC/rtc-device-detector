import React, { useState, useEffect } from 'react';
import TRTC from 'trtc-js-sdk';

const getDeviceList = async (deviceType) => {
  let deviceList = [];
  switch (deviceType) {
    case 'camera':
      deviceList = await TRTC.getCameras();
      break;
    case 'microphone':
      deviceList = await TRTC.getMicrophones();
      break;
    case 'speaker':
      deviceList = await TRTC.getSpeakers();
      break;
    default:
      break;
  }
  return deviceList;
};

export default function DeviceSelect({ deviceType, onChange, choseDevice }) {
  const [deviceList, setDeviceList] = useState([]);
  const [activeDevice, setActiveDevice] = useState({});
  const [activeDeviceId, setActiveDeviceId] = useState('');

  useEffect(() => {
    async function getDeviceListData() {
      const list = await getDeviceList(deviceType);
      const deviceIdList = list.map(item => item.deviceId);
      setDeviceList(list);
      if (choseDevice && deviceIdList.indexOf(choseDevice.deviceId) >= 0) {
        setActiveDevice(list.filter(item => item.deviceId === choseDevice.deviceId)[0]);
        setActiveDeviceId(choseDevice.deviceId);
      } else {
        setActiveDevice(list[0]);
        setActiveDeviceId(list[0].deviceId);
      }
    }
    getDeviceListData();
  }, []);

  useEffect(() => {
    if (activeDevice && JSON.stringify(activeDevice) !== '{}') {
      onChange && onChange(activeDevice);
    }
  }, [activeDevice]);

  navigator.mediaDevices.addEventListener('devicechange', async () => {
    const newList = await getDeviceList(deviceType);
    setDeviceList(newList);
  });

  const handleChange = (event) => {
    const deviceID = event.target.value;
    const activeDevice = deviceList.find(item => item.deviceId === deviceID);
    setActiveDevice(activeDevice);
    setActiveDeviceId(deviceID);
  };

  return (
    <div>
      <select className="device-select" value={activeDeviceId} onChange={handleChange}>
        {
          deviceList.map((item, index) => <option value={item.deviceId} key={index}>{item.label}</option>)
        }
      </select>
    </div>
  );
}
