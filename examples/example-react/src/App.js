import DeviceDetector from 'rtc-device-detector-react';
import 'rtc-device-detector-react/dist/index.css';
import React, { useEffect, useState } from 'react';
import { SDKAPPID } from './app/config';
import { getLatestUserSig } from './app/index';

function App() {
  const [networkDetectInfo, setNetworkDetectInfo] = useState({});
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const uplinkUserId = 'uplink_test';
    const { userSig : uplinkUserSig } = getLatestUserSig(uplinkUserId);
    const downlinkUserId = 'downlink_test';
    const { userSig : downlinkUserSig } = getLatestUserSig(downlinkUserId);
    const roomId = 999999;
    const networkDetectInfo = {
      sdkAppId: SDKAPPID,
      roomId,
      uplinkUserInfo: {
        uplinkUserId,
        uplinkUserSig,
      },
      downlinkUserInfo: {
        downlinkUserId,
        downlinkUserSig,
      },
    }
    setNetworkDetectInfo(networkDetectInfo);
  }, []);
  return (
    <div>
      <DeviceDetector
        visible={visible}
        onClose={() => setVisible(false)}
        networkDetectInfo={networkDetectInfo}></DeviceDetector>
    </div>
  );
}

export default App;
