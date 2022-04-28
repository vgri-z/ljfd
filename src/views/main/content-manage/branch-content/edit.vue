<template>
  <div class="edit">
    <el-dialog
      v-model="isEditShow"
      center
      :title="title"
      width="40%"
      :close-on-click-modal="false"
      @closed="cancel"
    >
      <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="200px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="危险源或潜在事件" prop="name">
              <el-input v-model="editForm.name" placeholder="请输入危险源或潜在事件" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="可能发生的事故类型及后果" prop="accident">
              <el-input v-model="editForm.accident" placeholder="请输入可能发生的事故类型及后果" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工程控制措施" prop="emergencySolution">
              <el-input v-model="editForm.emergencySolution" placeholder="请输入工程控制措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="管理措施" prop="engineeringSolution">
              <el-input v-model="editForm.engineeringSolution" placeholder="请输入管理措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="培训教育措施" prop="managementSolution">
              <el-input v-model="editForm.managementSolution" placeholder="请输入培训教育措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个体防护" prop="protection">
              <el-input v-model="editForm.protection" placeholder="请输入个体防护" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="风险分级" prop="riskLevel">
              <el-select v-model="editForm.riskLevel" placeholder="请选择机构" style="width: 60%">
                <el-option
                  v-for="item in riskLevels"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="建议新增(改进)措施" prop="trainingSolution">
              <el-input
                v-model="editForm.trainingSolution"
                placeholder="请输入建议新增(改进)措施"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="应急措施" prop="suggestions">
              <el-input v-model="editForm.suggestions" placeholder="请输入应急措施" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="修改说明" prop="description">
              <el-input v-model="editForm.description" placeholder="请输入修改说明" />
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
import { resetRules } from './config/branchContent.config'
import {
  addDangerDraft,
  editBranchDanger,
  addBranchDanger
} from '../../../../service/main/content/content'
import { getDepartmentList } from '../../../../service/main/department/department'
import localCache from '../../../../utils/cache'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isEditShow: false,
      editForm: {
        dangerZoneId: '',
        name: '',
        riskLevel: 1,
        accident: '',
        emergencySolution: '',
        engineeringSolution: '',
        managementSolution: '',
        protection: '',
        suggestions: '',
        trainingSolution: '',
        organizationId: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      title: '编辑',
      rules: resetRules,
      departmentList: null,
      riskLevels: [
        { name: '蓝', value: 1 },
        { name: '黄', value: 2 },
        { name: '橙', value: 3 }
      ],
      rights: []
    }
  },
  created() {
    this.rights = localCache.cacheGet('userRights')
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    show(data) {
      console.log(data, 'data')
      this.editForm = Object.assign({}, this.editForm, data)
      console.log(this.editForm, 'editForm')
      this.isEditShow = true
    },
    save() {
      console.log(this.editForm)
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          let res = null
          if (this.editForm.id) {
            // 有id
            if (this.rights.includes('DangerSource.ManageOrganization')) {
              // 有权限
              res = await editBranchDanger(this.editForm)
            } else {
              // 无权限
              res = await addDangerDraft(this.editForm)
            }
          } else {
            // 没有id
            if (this.rights.includes('DangerSource.ManageOrganization')) {
              console.log('有权限')
              // 有权限
              res = await addBranchDanger(this.editForm)
            } else {
              // 无权限
              res = await addDangerDraft(this.editForm)
            }
          }
          if (res.success) {
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
            this.isEditShow = false
          }
        }
      })
    },
    cancel() {
      this.editForm = {
        dangerZoneId: '',
        name: '',
        riskLevel: 1,
        accident: '',
        emergencySolution: '',
        engineeringSolution: '',
        managementSolution: '',
        protection: '',
        suggestions: '',
        trainingSolution: '',
        organizations: []
      }
      this.isEditShow = false
    }
  }
}
</script>

<style lang="less" scoped></style>
