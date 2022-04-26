<template>
  <div class="file-edit">
    <el-dialog
      v-model="isFileShow"
      center
      title="附件上传"
      width="40%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <!-- 案例文件 -->
      <div class="item cases">
        <div class="title">案例信息</div>
        <el-upload
          class="upload"
          action="string"
          multiple
          ref="caseUploadRef"
          :auto-upload="false"
          :file-list="caseList"
          :before-upload="beforeUpload"
          :http-request="uploadCase"
        >
          <template #trigger>
            <el-button type="primary">选择案例文件</el-button>
          </template>
          <el-button style="margin-left: 10px" type="success" @click="submitUpload"
            >案例文件上传</el-button
          >
          <template #tip>
            <div class="el-upload__tip">上传图片、pdf、word、ppt等</div>
          </template>
        </el-upload>
      </div>
      <!-- 视频文件 -->
      <div class="item videos">
        <div class="title">视频信息</div>
        <el-upload class="upload-demo" action="" :file-list="videoList">
          <el-button type="primary">视频上传</el-button>
          <template #tip>
            <div class="el-upload__tip">上传MP4、wmv等格式视频</div>
          </template>
        </el-upload>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="save">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fileUpload } from '../../../../service/main/file/file'
export default {
  data() {
    return {
      isFileShow: false,
      caseList: [], // 案例文件
      videoList: [] // 视频
    }
  },
  methods: {
    show() {
      this.isFileShow = true
    },
    beforeUpload(event) {
      console.log(event, 'before upload')
    },
    submitUpload() {
      this.$refs.caseUploadRef.submit()
    },
    async uploadCase(params) {
      let fd = new FormData()
      fd.append('file', params.file)
      const file = fd.get('file')
      console.log(file, 'file')
      const res = await fileUpload(fd)
      console.log(res)
    },
    save() {},
    cancel() {}
  }
}
</script>

<style lang="less" scoped>
.item {
  .title {
    margin-bottom: 10px;
  }
}
.cases {
  margin-bottom: 20px;
}
</style>
