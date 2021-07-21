import a18n from 'a18n';
import React, { useState, useEffect } from 'react';
import DeviceSelect from './deviceSelect';
import Button from './base-components/button/button';

const currentDetector = 'speaker';
let audioPlayer = null;
const mp3Url = 'https://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/45f1edea3701925920950247965/v.f1010.mp3';
export default function SpeakerDetector({ audioUrl, activeDetector, handleCompleted }) {
  const [speakerLabel, setSpeakerLabel] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (audioUrl === '') {
      setUrl(mp3Url);
    } else {
      setUrl(audioUrl);
    }
  }, [audioUrl]);


  useEffect(() => {
    if (activeDetector === currentDetector) {
      audioPlayer = document.getElementById('audio-player');
    }
    return () => {
      if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
      }
      audioPlayer && (audioPlayer.currentTime = 0);
    };
  }, [activeDetector]);

  const handleSpeakerChange = async (speakerDevice) => {
    const { deviceId, label } = speakerDevice;
    audioPlayer && (await audioPlayer.setSinkId(deviceId));
    setSpeakerLabel(label);
  };

  return (
    <div className={`testing-body ${activeDetector !== currentDetector && 'hide'}`}>
      <div className="device-list">
        <span className="device-list-title">{a18n('扬声器选择')}</span>
        <DeviceSelect selectType="option" label={a18n('扬声器选择')} deviceType="speaker" onChange={handleSpeakerChange}></DeviceSelect>
      </div>
      <div className="audio-player-container">
        <div className="audio-player-info">{a18n('请调高设备音量，点击播放下面的音频试试～')}</div>
        <audio id="audio-player" src={url} controls></audio>
      </div>
      <div className="testing-info-container">
        <div className="testing-info">{a18n('是否可以听到声音？')}</div>
        <div className="button-list">
          <Button type="outlined" onClick={() => handleCompleted('error', speakerLabel)}>{a18n('听不到')}</Button>
          <Button type="contained" onClick={() => handleCompleted('success', speakerLabel)}>{a18n('听的到')}</Button>
        </div>
    </div>
    </div>
  );
}
