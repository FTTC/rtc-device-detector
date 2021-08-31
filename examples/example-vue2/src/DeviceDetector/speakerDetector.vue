<template>
  <div v-if="activeDetector === currentDetector" class="testing-body">
    <div class="device-list">
      <span class="device-list-title">扬声器选择</span>
      <DeviceSelect
        deviceType="speaker"
        :choseDevice="choseDevice"
        :onChange="handleSpeakerChange"></DeviceSelect>
    </div>
    <div class="audio-player-container">
      <div class="audio-player-info">请调高设备音量，点击播放下面的音频试试～</div>
      <audio id="audio-player" :src="url" controls></audio>
    </div>
    <div class="testing-info-container">
      <div class="testing-info">是否可以听到声音？</div>
      <div class="button-list">
        <Button type="outlined" :onClick="() => handleCompleted('error', speakerLabel)">听不到</Button>
        <Button type="contained" :onClick="() => handleCompleted('success', speakerLabel)">听的到</Button>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceSelect from './deviceSelect.vue';
import Button from './button.vue';
export default {
  name: 'speakerDetector',
  props: {
    audioUrl: String,
    activeDetector: String,
    handleCompleted: Function,
  },
  components: {
    DeviceSelect,
    Button,
  },
  data() {
    return {
      audioPlayer: null,
      currentDetector: 'speaker',
      speakerLabel: '',
      url: '',
      choseDevice: null,
    };
  },
  methods: {
    async handleSpeakerChange(speakerDevice) {
      this.choseDevice = speakerDevice;
      const { deviceId, label } = speakerDevice;
      this.audioPlayer && (await this.audioPlayer.setSinkId(deviceId));
      this.speakerLabel = label;
    },
  },
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
