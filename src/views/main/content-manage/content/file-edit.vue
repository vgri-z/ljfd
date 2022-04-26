<template>
  <div class="file-edit">
    <el-dialog
      v-model="isFileShow"
      center
      title="附件上传"
      width="35%"
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
          :before-upload="caseBeforeUpload"
          :auto-upload="false"
          :file-list="caseList"
          :http-request="uploadCase"
        >
          <template #trigger>
            <el-button type="primary">选择案例文件</el-button>
          </template>
          <el-button style="margin-left: 10px" type="success" @click="submitUpload"
            >案例文件上传</el-button
          >
          <template #tip>
            <div class="el-upload__tip">注：上传图片、pdf、word、ppt等</div>
          </template>
        </el-upload>
      </div>
      <!-- 视频文件 -->
      <div class="item videos">
        <div class="title">视频信息</div>
        <el-upload class="upload-demo" action="" :file-list="videoList">
          <el-button type="primary">视频上传</el-button>
          <template #tip>
            <div class="el-upload__tip">注：上传MP4、wmv等格式视频</div>
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
import { ElMessage } from 'element-plus'
import { fileUpload } from '../../../../service/main/file/file'
import { editGlobalDanger } from '../../../../service/main/content/content'
export default {
  data() {
    return {
      isFileShow: false,
      caseList: [], // 案例文件
      videoList: [], // 视频
      dangerData: null,
      files: []
    }
  },
  emits: ['updateGlobalDanger'],
  methods: {
    show(data) {
      // 保存危险源信息
      this.dangerData = data
      this.dangerData.globalDangerSourceId = this.dangerData.organizations[0].globalDangerSourceId
      this.dangerData.organizationIds = []
      this.dangerData.organizations.forEach((item) => {
        this.dangerData.organizationIds.push(item.organizationId)
      })
      this.dangerData.organizations = this.dangerData.organizationIds
      console.log(this.dangerData)
      this.isFileShow = true
    },
    // 案例文件上传之前回调
    caseBeforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const whiteList = ['pdf', 'pptx', 'ppt', 'doc', 'docx', 'jpeg', 'png']
      if (whiteList.indexOf(fileSuffix) === -1) {
        ElMessage({
          message: '请上传图片、pdf、word、ppt文件',
          type: 'warning'
        })
        return false
      }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$msg('上传文件大小不能超过 2MB', 'error')
      //   return false
      // }
    },
    // 调用上传
    submitUpload() {
      this.$refs.caseUploadRef.submit()
    },
    // 上传
    async uploadCase(params) {
      let fd = new FormData()
      fd.append('file', params.file)
      const res = await fileUpload(fd)
      if (res.code === 0) {
        this.files.push(res.data)
      }
    },
    // 保存时，调用编辑危险源的接口，将文件保存进对应的危险源
    async save() {
      // 拿到上传的文件，一个个的push到files数组里面，保存在dabgerData里的files里面，点击确定时
      // 调用update接口，保存文件，然后属性列表页面
      this.dangerData.files.push(...this.files)
      const res = await editGlobalDanger(this.dangerData)
      if (res.code === 0) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.$emit('updateGlobalDanger')
        this.isFileShow = false
      }
    },
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
  margin-bottom: 40px;
}
</style>
