import a18n from 'a18n';
import React, { useState, useEffect } from 'react';
import Button from './base-components/button/button';
import DeviceConnect from './deviceConnect';
import CameraDetector from './cameraDetector';
import MicDetector from './micDetector';
import SpeakerDetector from './speakerDetector';
import NetworkDetector from './networkDetector';
import DetectorReport from './detectorReport';
import { CameraIcon, MicIcon, SpeakerIcon, NetworkIcon } from './utils';
import RTCDetect from 'rtc-detect';
import './index.scss';
import en from '../locales/en.js';
import zh from '../locales/zh-CN.js';

a18n.addLocaleResource('en', en);
a18n.addLocaleResource('zh-CN', zh);

export default function DeviceDetector({ visible, onClose, lang = 'zh-CN', audioUrl = '', hasNetworkDetect = true, networkDetectInfo }) {
  const [open, setOpen] = useState(false);
  const [detectStage, setDetectStage] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  useEffect(() => {
    a18n.setLocale(lang);
  }, [lang]);

  const detect = new RTCDetect();
  const result = detect.getSystem();

  const stepNameList = ['camera', 'microphone', 'speaker', 'network'];
  // iOS系统和firefox浏览器，不包含扬声器检测
  if (result.browser.name === 'Firefox' || result.OS === 'iOS') {
    stepNameList.indexOf('speaker') >= 0 && stepNameList.splice(stepNameList.indexOf('speaker'), 1);
  }
  if (!hasNetworkDetect) {
    stepNameList.indexOf('network') >= 0 && stepNameList.splice(stepNameList.indexOf('network'), 1);
  }

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize.bind(this));
    return () => {
      window.removeEventListener('resize', handleSize.bind(this));
    };
  }, []);

  const handleSize = () => {
    if (window.innerWidth > 520) {
      setContainerStyle({
        transform: 'scale(1)',
      });
      return;
    }
    const Width = 520;
    const Height = 480;
    const scaleX = window.innerWidth / Width;
    const scaleY = window.innerHeight / Height;
    const scale = Math.min(scaleX, scaleY);
    setContainerStyle({
      transform: `scale(${scale})`,
    });
  };

  const stopBubble = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  // 重新检测
  const handleReset = () => {
    setCompleted({});
    setDetectStage(0);
    setActiveStep(0);
  };

  // 完成检测
  const handleClose = () => {
    setOpen(false);
    handleReset();
    onClose();
  };

  // 点击切换step
  const handleStep = (step) => {
    if (completed[stepNameList[step]] && completed[stepNameList[step]].completed) {
      setActiveStep(step);
    }
  };

  // 处理step的完成事件
  const handleCompleted = (type, result) => {
    setCompleted(prevConfig => ({
      ...prevConfig,
      [stepNameList[activeStep]]: {
        completed: true,
        type,
        result,
      },
    }));
    if (activeStep < stepNameList.length - 1) {
      setActiveStep(activeStep + 1);
    }
    if (stepNameList.indexOf('network') < 0 && activeStep === stepNameList.length - 1) {
      setDetectStage(2);
    }
  };

  return open && (<div className="device-detector-backdrop">
    <div className="root" style={containerStyle} onClick={stopBubble}>
      <Button type="outlined" className="close" onClick={handleClose}>{a18n('跳过检测')}</Button>
      {
        detectStage === 0 && <DeviceConnect
          stepNameList={stepNameList}
          startDeviceDetect={() => setDetectStage(1)}></DeviceConnect>
      }
      {
        detectStage === 1 && (
          <div className="step-container">
          {
            stepNameList.map((label, index) => {
              const success = completed[stepNameList[index]] && completed[stepNameList[index]].type === 'success';
              const error = completed[stepNameList[index]] && completed[stepNameList[index]].type === 'error';
              const active = activeStep === index;
              let stateClassName = '';
              if (active || success) {
                stateClassName = 'active';
              } else if (error) {
                stateClassName = 'error';
              }
              return (<div
                key={index}
                onClick={handleStep.bind(this, index)}
                className={`step ${stateClassName}`}>
                <span className="step-icon">
                  {
                    label === 'camera' && CameraIcon
                  }
                  {
                    label === 'microphone' && MicIcon
                  }
                  {
                    label === 'speaker' && SpeakerIcon
                  }
                  {
                    label === 'network' && NetworkIcon
                  }
                </span>
                <span className="step-label">
                  {label.toUpperCase()}
                </span>
              </div>);
            })
          }
        </div>)
      }
      {
        detectStage === 1 && (
          <div className="testing-container">
            {
              stepNameList.map((step, index) => {
                if (step === 'camera') {
                  return <CameraDetector
                  key={index}
                  activeDetector={stepNameList[activeStep]}
                  handleCompleted={handleCompleted}></CameraDetector>;
                }
                if (step === 'microphone') {
                  return <MicDetector
                  key={index}
                  activeDetector={stepNameList[activeStep]}
                  handleCompleted={handleCompleted}></MicDetector>;
                }
                if (step === 'speaker') {
                  return <SpeakerDetector
                  key={index}
                  audioUrl={audioUrl}
                  activeDetector={stepNameList[activeStep]}
                  handleCompleted={handleCompleted}></SpeakerDetector>;
                }
                if (step === 'network') {
                  return <NetworkDetector
                  key={index}
                  activeDetector={stepNameList[activeStep]}
                  networkDetectInfo={networkDetectInfo}
                  handleCompleted={handleCompleted}
                  generateReport={() => setDetectStage(2)}></NetworkDetector>;
                }
                return null;
              })
            }
          </div>
        )
      }
      {
        detectStage === 2
          && <DetectorReport
            reportData={completed}
            handleReset={handleReset}
            handleClose={handleClose}></DetectorReport>
      }
    </div>
  </div>);
}
