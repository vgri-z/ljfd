<template>
  <div class="carema-video">
    <div class="carema-content">
      <canvas id="canvas" height="300" width="400" style="width: 400px; margin: auto"></canvas>
      <video src="" id="srcvideo" style="display: none"></video>
    </div>

    <div style="text-align: center; margin-top: 10px">
      <el-button
        type="primary"
        size="small"
        id="startBtn"
        :disabled="isStartDisabled"
        @click="startRecord"
        >开始录制</el-button
      >
      <el-button
        type="primary"
        size="small"
        id="pauseBtn"
        :disabled="isPauseDisabled"
        @click="pauseRecord"
        >暂停录制</el-button
      >
      <el-button
        type="primary"
        size="small"
        id="resumeBtn"
        :disabled="isResumeDisabled"
        @click="resumeRecord"
      >
        恢复录制
      </el-button>
      <el-button
        type="primary"
        size="small"
        id="stopBtn"
        :disabled="isStopDisabled"
        @click="stopRecord"
        >结束录制</el-button
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      allChunks: [],
      mousex: 0,
      mousey: 0,
      drawArray: [],
      canvas: null,
      recorder: null,
      format: 'video/webm;codecs=vp9',
      isStartDisabled: true,
      isPauseDisabled: true,
      isResumeDisabled: true,
      isStopDisabled: true
    }
  },
  mounted() {
    this.caremaInit()
  },
  methods: {
    caremaInit() {
      this.canvas = document.getElementById('canvas')
      const ctx = this.canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      navigator.mediaDevices
        .getUserMedia({
          // audio: true,
          video: true
        })
        .then((mediaStream) => {
          console.log(mediaStream, '轨道')
          var srcvideo = document.getElementById('srcvideo')
          srcvideo.srcObject = mediaStream
          srcvideo.play()
          this.playCanvas(srcvideo, ctx)
        })

      this.setRecorder()
      this.setFormatSelect(this.format)
    },

    playCanvas(srcvideo, ctx) {
      ctx.drawImage(srcvideo, 0, 0, 400, 300)
      for (var i = 0; i < this.drawArray.length; i++) {
        ctx.beginPath()
        const xFraction = this.drawArray[i].x / 640
        const yFraction = this.drawArray[i].y / 460
        const r = 255 * (1 - xFraction)
        const g = 255 * yFraction
        const b = 255 * xFraction * (1 - yFraction)
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 1)`
        ctx.arc(this.drawArray[i].x, this.drawArray[i].y, 10, 0, 2 * Math.PI)
        ctx.fill()
      }
      requestAnimationFrame(() => {
        this.playCanvas(srcvideo, ctx)
      })
    },

    setRecorder(format) {
      const stream = this.canvas.captureStream(60) // 60 FPS recording
      this.recorder = new MediaRecorder(stream, {
        mimeType: format
      })
      this.recorder.ondataavailable = (e) => {
        this.allChunks.push(e.data)
      }

      this.isStartDisabled = false
    },
    // 开始录制
    startRecord() {
      this.recorder.start(10)
      this.isStartDisabled = true
      this.isPauseDisabled = false
      this.isResumeDisabled = true
      this.isStopDisabled = false
    },
    // 暂停录制
    pauseRecord() {
      this.recorder.pause()
      this.isPauseDisabled = true
      this.isResumeDisabled = false
    },
    // 恢复录制
    resumeRecord() {
      this.recorder.resume()
      this.isPauseDisabled = false
      this.isResumeDisabled = true
    },
    // 结束录制
    stopRecord() {
      this.recorder.stop()
      this.blobDownload(this.format)
      this.isStartDisabled = false
      this.isPauseDisabled = true
      this.isResumeDisabled = true
      this.isStopDisabled = true
    },

    setFormatSelect(format) {
      if (!MediaRecorder.isTypeSupported(format)) {
        alert(format)
        alert('当前浏览器不支持该编码类型')
        return
      }
      this.allChunks = []
      this.setRecorder(format)
    },

    // eslint-disable-next-line no-unused-vars
    blobDownload(format) {
      const link = document.createElement('a')
      link.style.display = 'none'
      const fullBlob = new Blob(this.allChunks)
      const downloadUrl = window.URL.createObjectURL(fullBlob)
      link.href = downloadUrl
      link.download = moment().format('YYYY/MM/DD') + '.mp4'
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
}
</script>

<style lang="less" scoped>
// .carema-video {
//   .carema-content {
//   }
// }
</style>
