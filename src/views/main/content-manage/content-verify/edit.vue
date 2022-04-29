<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      title="审核"
      width="40%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="文本修改内容">
              <template v-for="item in Object.keys(compareDanger)" :key="item">
                <div class="item">
                  <div class="before">
                    <span>
                      修改前的{{ compareDanger[item].nameText }}：
                      <el-input
                        type="textarea"
                        autosize
                        readonly
                        v-model="compareDanger[item].globalValue"
                      />
                    </span>
                  </div>
                  <div class="after">
                    <span>
                      修改后的{{ compareDanger[item].nameText }}：
                      <el-input
                        type="textarea"
                        autosize
                        readonly
                        v-model="compareDanger[item].draftValue"
                      />
                    </span>
                  </div>
                </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新增图片">
              <div class="imgs">
                <el-upload
                  action=""
                  class="group-img"
                  accept="image/*"
                  ref="imgsUploadRef"
                  list-type="picture-card"
                  :before-remove="handleRemove"
                  :file-list="imgList"
                >
                  <el-icon><Plus /></el-icon>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新增案例">
              <div class="files">
                <el-upload
                  action=""
                  ref="caseUploadRef"
                  :before-remove="handleRemove"
                  :file-list="fileList"
                >
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新增视频">
              <div class="files">
                <el-upload
                  action=""
                  ref="caseUploadRef"
                  :before-remove="handleRemove"
                  :file-list="videoList"
                >
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="修改原因">
              <el-input readonly v-model="draftData.description" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核">
              <el-radio-group v-model="isApprove">
                <el-radio :label="true">同意</el-radio>
                <el-radio :label="false">驳回</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="驳回原因" prop="comment">
              <el-input v-model="editForm.comment" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
import { ElMessage } from 'element-plus/lib/components'
import {
  getGlobalDangerDetail,
  approveDraft,
  rejectDraft,
  getDraftDetail
} from '../../../../service/main/content/content'
import useNameValue from './hooks/useNameValue.js'
export default {
  data() {
    return {
      isEditShow: false,
      editForm: {
        dangerSouceDraftId: '',
        comment: ''
      },
      draftData: {},
      isApprove: true,
      rejectReason: '', // 驳回原因
      compareDanger: {},
      imgList: [], // 新增图片列表
      fileList: [], // 新增文件列表
      videoList: [], // 新增视频列表
      rules: {
        comment: {
          required: true,
          message: '请输入审核说明',
          trigger: 'blur'
        }
      }
    }
  },
  emits: ['updateDraft'],
  methods: {
    async show(data) {
      // console.log(data)
      const res = await getDraftDetail(data.id)
      this.draftData = res.data
      const baseUrl = 'http://114.55.1.241:8090/'
      this.draftData.files.forEach((file) => {
        file.url = baseUrl + file.uri
        if (file.mime.indexOf('video/') !== -1) {
          this.videoList.push(file)
        } else if (file.mime.indexOf('image/') !== -1) {
          this.imgList.push(file)
        } else {
          this.fileList.push(file)
        }
      })
      this.editForm.dangerSouceDraftId = this.draftData.id
      console.log(this.draftData, this.editForm)
      this.compareDangerSource(this.draftData.globalDangerSourceId)
      this.isEditShow = true
    },
    // 对比全局危险源和分厂危险源
    async compareDangerSource(id) {
      // 获取全局危险源详情
      const res = await getGlobalDangerDetail(id)
      const draftDanger = this.getCompareObj(this.draftData)
      const globalDanger = this.getCompareObj(res.data)
      // 对比两个草稿和全局危险源，获取差异对象
      Object.keys(draftDanger).forEach((key1) => {
        Object.keys(globalDanger).forEach((key2) => {
          if (key1 === key2 && draftDanger[key1] !== globalDanger[key2]) {
            this.compareDanger[key1] = {
              draftValue: draftDanger[key1],
              globalValue: globalDanger[key2]
            }
          }
        })
      })
      // 添加字段名
      Object.keys(this.compareDanger).forEach((key) => {
        const name = useNameValue(key)
        this.compareDanger[key]['nameText'] = name
      })
    },
    getCompareObj(originObj) {
      let targetObj = {}
      const {
        name,
        accident,
        emergencySolution,
        engineeringSolution,
        managementSolution,
        protection,
        riskLevel,
        trainingSolution,
        suggestions
      } = originObj
      targetObj = {
        name,
        accident,
        emergencySolution,
        engineeringSolution,
        managementSolution,
        protection,
        riskLevel,
        trainingSolution,
        suggestions
      }
      return targetObj
    },
    async save() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          let res
          if (this.isApprove) {
            res = await approveDraft(this.editForm)
          } else {
            res = await rejectDraft(this.editForm)
          }
          if (res.code === 0) {
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
            this.isEditShow = false
            this.$emit('updateDraft')
          }
        }
      })
    },
    handleRemove() {
      return false
    },
    cancel() {
      this.compareDanger = {}
      this.imgList = []
      this.videoList = []
      this.fileList = []
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  .item {
    margin-bottom: 5px;

    .before {
      margin-bottom: 5px;
    }
  }
  :deep(.el-textarea) {
    width: auto;
  }

  .imgs {
    :deep(.el-upload-list__item) {
      background: red;
      width: 100px;
      height: 100px;
    }

    :deep(.el-upload.el-upload--picture-card) {
      display: none;
    }
  }
}

.files {
  width: 100%;
}
</style>
