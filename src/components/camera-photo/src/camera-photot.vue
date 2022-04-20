<template>
  <div class="camera-photo">
    <div class="photo-area">
      <img v-if="showEmptyImg" src="../../../assets/img/empty.png" alt="" />
      <video id="webcam" autoplay playsinline width="400" height="300"></video>
      <canvas v-show="isShowImg" id="canvas" class="d-none"></canvas>
      <!-- <audio id="snapSound" src="audio/snap.wav" preload="auto"></audio> -->
    </div>
    <div class="btns">
      <el-button type="primary" @click="startPicture">开启摄像头</el-button>
      <el-button :disabled="isDisabled" type="primary" @click="takePicture">拍照</el-button>
      <el-button :disabled="isDisabled" type="primary" @click="stopPicture">停止</el-button>
    </div>
  </div>
</template>

<script>
import Webcam from 'webcam-easy'
export default {
  data() {
    return {
      webcam: null,
      imgUrl: ''
    }
  },
  props: {
    isShowImg: {
      type: Boolean,
      default: false
    },
    showEmptyImg: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  created() {
    // this.webcamInit()
  },
  mounted() {
    this.webcamInit()
  },
  methods: {
    webcamInit() {
      const webcamElement = document.getElementById('webcam')
      const canvasElement = document.getElementById('canvas')
      // const snapSoundElement = document.getElementById('snapSound')
      this.webcam = new Webcam(webcamElement, 'user', canvasElement)
      // console.log(this.webcam)
    },
    // 开启摄像头
    startPicture() {
      this.webcam
        .start()
        .then(() => {
          // console.log(res, 'start success')
          this.$emit('startSuccess')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 拍照
    takePicture() {
      this.imgUrl = this.webcam.snap()
      this.$emit('takePicture', this.imgUrl)
      // console.log(this.imgUrl)
    },
    // 停止拍照
    stopPicture() {
      this.webcam.stop()
    }
  }
}
</script>

<style lang="less" scoped>
.photo-area {
  width: 400px;
  height: auto;
  border: 1px solid #ebebeb;
  margin-bottom: 10px;
  position: relative;

  img {
    width: 400px;
    height: 300px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
