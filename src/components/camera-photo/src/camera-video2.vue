<template>
  <div class="camera-video2">
    <video id="myVideo" playsinline class="video-js vjs-default-skin"></video>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      options: {
        controls: true,
        bigPlayButton: false,
        width: 400,
        height: 300,
        fluid: false,
        plugins: {
          record: {
            audio: true,
            video: true,
            maxLength: 3600,
            debug: true
          }
        }
      },
      player: null
    }
  },
  mounted() {
    const videojs = window.videojs
    const RecordRTC = window.RecordRTC
    this.player = videojs('myVideo', this.options, function () {
      var msg =
        'Using video.js ' +
        videojs.VERSION +
        ' with videojs-record ' +
        videojs.getPluginVersion('record') +
        ' and recordrtc ' +
        RecordRTC.version

      videojs.log(msg)
    })

    this.player.on('startRecord', function () {
      console.log('started recording!')
    })

    this.player.on('finishRecord', () => {
      console.log('finished recording: ', this.player.recordedData)
      this.blobDownload(this.player.recordedData)
    })
  },
  methods: {
    blobDownload(data) {
      const link = document.createElement('a')
      link.style.display = 'none'
      const fullBlob = new Blob([data])
      const downloadUrl = window.URL.createObjectURL(fullBlob)
      link.href = downloadUrl
      link.download = moment().format('YYYY-MM-DD HH:mm') + '.mp4'
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
}
</script>

<style lang="less" scoped>
.camera-video2 {
}
</style>
