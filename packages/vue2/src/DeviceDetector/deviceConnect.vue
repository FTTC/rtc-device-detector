<template>
  <div class="device-connect">
    <div class="testing-title">设备连接</div>
    <div class="testing-prepare-info">
      {{
        `设备检测前请确认设备连接了${hasCameraDetect ? '摄像头' : ''}${hasMicrophoneDetect ? '、麦克风' : ''}${hasSpeakerDetect ? '、扬声器' : ''}${this.hasNetworkDetect ? '和网络' : ''}`
      }}
    </div>
    <div class="device-display">
      <div v-for="(stepName, index) in stepNameList" :key="index">
        <!-- 摄像头连接图标 -->
        <div
          v-if="stepNameList === 'camera'"
          :class="showConnectResult && (deviceState.hasCameraConnect ? 'connect-success' : 'connect-fail')">
          <span class="device">
            {CameraIcon}
          </span>
        </div>
        <!-- 麦克风连接图标 -->
        <div
          v-if="stepNameList === 'microphone'"
          :class="showConnectResult && (deviceState.hasMicrophoneConnect ? 'connect-success' : 'connect-fail')">
          <span class="device">
            {MicIcon}
          </span>
        </div>
        <!-- 扬声器连接图标 -->
        <div
          v-if="stepNameList === 'speaker'"
          :class="showConnectResult && (deviceState.hasSpeakerConnect ? 'connect-success' : 'connect-fail')">
          <span class="device">
            {MicIcon}
          </span>
        </div>
        <!-- 网络连接图标 -->
        <div
          v-if="stepNameList === 'network'"
          :class="showConnectResult && (deviceState.hasNetworkConnect ? 'connect-success' : 'connect-fail')">
          <span class="device">
            {MicIcon}
          </span>
        </div>
      </div>
    </div>
    <!-- <div v-if="!showConnectResult" class="outer-progress">
      <div class="inner-progress" style={{ transform: `translateX(${progress - 100}%)` }}></div>
    </div>
    <div v-if="!showConnectResult" class="text gray-text">设备正在连接中，请稍后</div>
    <div v-if="showConnectResult" :class="['text' `${connectResult.success ? 'green-text' : 'red-text'}`]">
      <span>{connectResult.info}</span>
      <div
        v-if="connectResult.remind"
        class="error-connect"
        @touchstart="() => setShowRemind(true)"
        @mouseenter="() => setShowRemind(true)"
        @touchend="() => setShowRemind(false)"
        @mouseleave="() => setShowRemind(false)">
        <span class="error-icon">{{ErrorIcon}}</span>
        <div v-if="showRemind" class="connect-attention-info" dangerouslySetInnerHTML={{ __html: connectResult.remind }}>
        </div>
      </div>
    </div> -->
    <div class="button-container">
      <Button v-if="!showConnectResult" type='disabled'>开始检测</Button>
      <Button v-if="showReconnectButton" type='contained' onClick={handleReset}>重新连接</Button>
      <Button v-if="showStartDetectButton" type='contained' onClick={startDeviceDetect}>开始检测</Button>
    </div>
  </div>
</template>

<script>
import Button from './button.vue';
import {
  isOnline,
  handleGetUserMediaError,
} from '../utils';

const deviceFailAttention = '1. 若浏览器弹出提示，请选择“允许”<br>'
  + '2. 若杀毒软件弹出提示，请选择“允许”<br>'
  + '3. 检查系统设置，允许浏览器访问摄像头及麦克风<br>'
  + '4. 检查浏览器设置，允许网页访问摄像头及麦克风<br>'
  + '5. 检查摄像头/麦克风是否正确连接并开启<br>'
  + '6. 尝试重新连接摄像头/麦克风<br>'
  + '7. 尝试重启设备后重新检测';
const networkFailAttention = '1. 请检查设备是否联网<br>'
  + '2. 请刷新网页后再次检测<br>'
  + '3. 请尝试更换网络后再次检测';

export default {
  name: 'deviceConnect',
  components: {
    Button,
  },
  props: {
    stepNameList: {
      type: Array,
      default: () => [],
    },
    startDeviceDetect: Function,
  },
  data() {
    return {
      progress: 0,
      deviceState: {},
      connectResult: {},
      showConnectResult: false,
      showRemind: false,
    }
  },
  computed: {
    hasCameraDetect() {
      return this.stepNameList.indexOf('camera') >= 0;
    },
    hasMicrophoneDetect() {
      return this.stepNameList.indexOf('microphone') >= 0;
    },
    hasSpeakerDetect() {
      return this.stepNameList.indexOf('speaker') >= 0;
    },
    hasNetworkDetect() {
      return this.stepNameList.indexOf('network') >= 0;
    },
    showReconnectButton() {
      const deviceState = this.deviceState;
      return this.showConnectResult
        && !(deviceState.hasCameraConnect
        && deviceState.hasMicrophoneConnect
        && deviceState.hasSpeakerConnect
        && deviceState.hasNetworkConnect);
    },
    showStartDetectButton() {
      const deviceState = this.deviceState;
      return this.showConnectResult
        && (deviceState.hasCameraConnect
        && deviceState.hasMicrophoneConnect
        && deviceState.hasSpeakerConnect
        && deviceState.hasNetworkConnect);
    }
  },
  methods: {
    // async getDeviceConnectResult() {
    //   let cameraList = [];
    //   let micList = [];
    //   let speakerList = [];
    //   try {
    //     cameraList = await TRTC.getCameras();
    //     micList = await TRTC.getMicrophones();
    //     speakerList = await TRTC.getSpeakers();
    //   } catch (error) {
    //     console.log('rtc-device-detector getDeviceList error', error);
    //   }
    //   const hasCameraDevice = cameraList.length > 0;
    //   const hasMicrophoneDevice = micList.length > 0;
    //   const hasSpeakerDevice = hasSpeakerDetect ? speakerList.length > 0 : true;
    //   const hasNetworkConnect = hasNetworkDetect ? await isOnline() : true;
    //   let deviceStateObj = {
    //     hasCameraDevice,
    //     hasMicrophoneDevice,
    //     hasSpeakerDevice,
    //     hasNetworkConnect,
    //     hasCameraConnect: false,
    //     hasMicrophoneConnect: false,
    //     hasSpeakerConnect: hasSpeakerDevice,
    //   };
    //   this.deviceState = deviceStateObj;
    //   this.connectResult = this.getDeviceConnectInfo(deviceStateObj);

    //   if (hasCameraDevice) {
    //     navigator.mediaDevices
    //       .getUserMedia({ video: true, audio: false })
    //       .then((stream) => {
    //         deviceStateObj = {
    //           ...deviceStateObj,
    //           hasCameraConnect: true,
    //         };
    //         setDeviceState(deviceStateObj);
    //         // 显示设备连接信息
    //         setConnectResult(getDeviceConnectInfo(deviceStateObj));
    //         // 释放摄像头设备
    //         stream.getTracks()[0].stop();
    //       })
    //       .catch((error) => {
    //         handleGetUserMediaError(error);
    //       });
    //   }

    //   if (hasMicrophoneDevice) {
    //     navigator.mediaDevices
    //       .getUserMedia({ video: false, audio: hasMicrophoneDevice })
    //       .then((stream) => {
    //         deviceStateObj = {
    //           ...deviceStateObj,
    //           hasMicrophoneConnect: hasMicrophoneDevice,
    //         };
    //         setDeviceState(deviceStateObj);
    //         // 显示设备连接信息
    //         setConnectResult(getDeviceConnectInfo(deviceStateObj));
    //         // 释放麦克风设备
    //         stream.getTracks()[0].stop();
    //       })
    //       .catch((error) => {
    //         handleGetUserMediaError(error);
    //       });
    //   }
    // },
    getDeviceConnectInfo(deviceState) {
      let connectInfo = '连接出错，请重试';
      if (deviceState.hasCameraConnect
        && deviceState.hasMicrophoneConnect
        && deviceState.hasSpeakerConnect
        && deviceState.hasNetworkConnect) {
        connectInfo = this.hasNetworkDetect ? '设备及网络连接成功，请开始设备检测' : '设备连接成功，请开始设备检测';
        return {
          info: connectInfo,
          success: true,
        };
      }
      // 第一步：浏览器未检测到摄像头/麦克风/扬声器设备的提示
      if (!(deviceState.hasCameraDevice && deviceState.hasMicrophoneDevice && deviceState.hasSpeakerDevice)) {
        connectInfo = `未检测到${deviceState.hasCameraDevice ? '' : '【摄像头】'}${deviceState.hasMicrophoneDevice ? '' : '【麦克风】'}${deviceState.hasSpeakerDevice ? '' : '【扬声器】'}设备，请检查设备连接`;
        return {
          info: connectInfo,
          success: false,
        };
      }
      // 第二步：浏览器未拿到摄像头/麦克风权限的提示
      if (!(deviceState.hasCameraConnect && deviceState.hasMicrophoneConnect)) {
        connectInfo = deviceState.hasNetworkConnect
          ? '请允许浏览器及网页访问摄像头/麦克风设备'
          : '请允许浏览器及网页访问摄像头/麦克风设备，并检查网络连接';
        return {
          info: connectInfo,
          success: false,
          remind: deviceFailAttention,
        };
      }
      // 第三步：浏览器检测未连接网络的提示
      if (!deviceState.hasNetworkConnect) {
        connectInfo = '网络连接失败，请检查网络连接';
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
    },
  },
  mounted() {
    // this.getDeviceConnectResult();
  }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>