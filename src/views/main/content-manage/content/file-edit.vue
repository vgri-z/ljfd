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
      <!-- 图片 -->
      <div class="item images">
        <div class="title">图片信息</div>
        <el-upload
          class="upload"
          action="string"
          multiple
          ref="imgsUploadRef"
          :before-upload="imgsBeforeUpload"
          :auto-upload="false"
          :file-list="imgsList"
          :http-request="uploadImgs"
        >
          <template #trigger>
            <el-button type="primary">选择图片</el-button>
          </template>
          <el-button style="margin-left: 10px" type="success" @click="submitImgsUpload"
            >图片上传</el-button
          >
          <template #tip>
            <div class="el-upload__tip">注：上传jpg、jpeg、png、svg等格式图片</div>
          </template>
        </el-upload>
      </div>
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
          <el-button style="margin-left: 10px" type="success" @click="submitCaseUpload"
            >案例文件上传</el-button
          >
          <template #tip>
            <div class="el-upload__tip">注：pdf、doc、ppt等格式文件</div>
          </template>
        </el-upload>
      </div>
      <!-- 视频文件 -->
      <div class="item videos">
        <div class="title">视频信息</div>
        <el-upload
          class="upload"
          action="string"
          multiple
          ref="videoUploadRef"
          :before-upload="videoBeforeUpload"
          :auto-upload="false"
          :file-list="videoList"
          :http-request="uploadVideo"
        >
          <template #trigger>
            <el-button type="primary">选择视频文件</el-button>
          </template>
          <el-button style="margin-left: 10px" type="success" @click="submitVideoUpload"
            >视频文件上传</el-button
          >
          <template #tip>
            <div class="el-upload__tip">注：请上传mp4、wvm等格式文件</div>
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
      imgsList: [], // 图片
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
    // 文件上传之前回调(通用)
    /**
     * @params file 文件
     * @params formatArr 文件格式数组
     * @params message 提示消息
     */
    beforeUpload(file, formatArr, message) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const whiteList = formatArr
      if (whiteList.indexOf(fileSuffix) === -1) {
        ElMessage({
          message: message,
          type: 'warning'
        })
        return false
      }
    },
    // 文件手动上传(通用)
    async fileUpload(params) {
      let fd = new FormData()
      fd.append('file', params.file)
      const res = await fileUpload(fd)
      if (res.code === 0) {
        this.files.push(res.data)
      }
    },
    // 图片上传之前回调
    imgsBeforeUpload(file) {
      this.beforeUpload(
        file,
        ['jpeg', 'jpg', 'png', 'svg', 'gif', 'tif', 'gif'],
        '请上传符合格式的图片'
      )
    },
    // 案例文件上传之前回调
    caseBeforeUpload(file) {
      this.beforeUpload(
        file,
        ['pdf', 'pptx', 'ppt', 'doc', 'docx'],
        '请上传pdf、doc、ppt格式的文件'
      )
    },
    // 视频文件上传之前回调
    videoBeforeUpload(file) {
      this.beforeUpload(file, ['mp4', 'wvm'], '请上传符合格式的视频')
    },
    // 调用上传(图片)
    submitImgsUpload() {
      this.$refs.imgsUploadRef.submit()
    },
    // 调用上传(案例)
    submitCaseUpload() {
      this.$refs.caseUploadRef.submit()
    },
    // 调用上传(视频)
    submitVideoUpload() {
      this.$refs.videoUploadRef.submit()
    },
    // 上传(图片)
    async uploadImgs(params) {
      this.fileUpload(params)
    },
    // 上传(案例)
    async uploadCase(params) {
      this.fileUpload(params)
    },
    // 上传(视频)
    async uploadVideo(params) {
      this.fileUpload(params)
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
.images {
  margin-bottom: 40px;
}
.cases {
  margin-bottom: 40px;
}
</style>
