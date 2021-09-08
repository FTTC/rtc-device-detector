<template>
  <div id="app">
    <DeviceDetector
      :visible="visible"
      :onClose="handleClose"
      :networkDetectInfo="networkDetectInfo"></DeviceDetector>
  </div>
</template>

<script>
import { SDKAPPID } from './app/config';
import { getLatestUserSig } from './app/index';
import DeviceDetector from './DeviceDetector/index.vue';

export default {
  name: 'App',
  components: {
    DeviceDetector,
  },
  data() {
    return {
      networkDetectInfo: {},
      visible: true,
    };
  },
  methods: {
    initData() {
      const uplinkUserId = 'uplink_test';
      const { userSig: uplinkUserSig } = getLatestUserSig(uplinkUserId);
      const downlinkUserId = 'downlink_test';
      const { userSig: downlinkUserSig } = getLatestUserSig(downlinkUserId);
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
      };
      this.networkDetectInfo = networkDetectInfo;
    },
    handleClose() {
      this.visible = false;
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
