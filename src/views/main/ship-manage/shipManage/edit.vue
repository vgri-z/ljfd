<template>
  <div class="edit">
    <el-card class="box-card1" shadow="never">
      <template #header>
        <div class="card-header1">
          <el-icon color="#0688e8" size="18px"><document-add /></el-icon>
          <span>单据基本信息</span>
        </div>
      </template>

      <!-- 表单 -->
      <el-form ref="registerFormRef" :model="registerForm" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据类型">
              <el-input disabled :placeholder="docketType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船舶名称/船舶号">
              <el-input
                v-model="registerForm.shipName"
                maxlength="100"
                placeholder="请输入船舶名称/船舶号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单据号">
              <el-input disabled :placeholder="docketNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船舶所有者">
              <el-input
                v-model="registerForm.shipOwner"
                maxlength="50"
                placeholder="请输入船舶所有者"
              />
            </el-form-item>
          </el-col>
          <!-- 证件人 -->
          <el-col :span="24">
            <el-card class="box-card2" shadow="never">
              <template #header>
                <div class="card-header2">
                  <el-icon color="#0688e8" size="18px"><circle-plus-filled /></el-icon>
                  <span @click="addApplicant">添加证件人</span>
                </div>
              </template>
              <div class="content">
                <div class="applicant">
                  <el-tabs type="border-card" @tab-click="tabChange">
                    <template v-for="item in persons" :key="item.name">
                      <el-tab-pane>
                        <template #label>
                          <span> {{ item.name }} </span>
                        </template>
                        <el-form ref="personRef" :model="item.personForm" label-width="80px">
                          <el-row>
                            <el-col :span="24">
                              <el-form-item label="证件类型">
                                <el-select
                                  v-model="item.personForm.identityCardTypeId"
                                  placeholder="请选择证件类型"
                                  style="width: 100%"
                                >
                                  <template v-for="item in identityTypes" :key="item.name">
                                    <el-option
                                      :label="item.displayName"
                                      :value="item.id"
                                    ></el-option>
                                  </template>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="24">
                              <el-form-item label="证件人">
                                <el-input
                                  v-model="item.personForm.identityCardName"
                                  maxlength="50"
                                  placeholder="请输入证件人"
                                /> </el-form-item
                            ></el-col>
                            <el-col :span="24">
                              <el-form-item label="证件号">
                                <el-input
                                  v-model="item.personForm.identityCardNumber"
                                  maxlength="50"
                                  placeholder="请输入证件号"
                                /> </el-form-item
                            ></el-col>
                            <el-col :span="24">
                              <el-form-item label="联系电话">
                                <el-input
                                  v-model="item.personForm.phoneNumber"
                                  maxlength="20"
                                  placeholder="请输入联系电话"
                                /> </el-form-item
                            ></el-col>
                            <el-col :span="24">
                              <el-form-item label="联系地址">
                                <el-input
                                  v-model="item.personForm.address"
                                  maxlength="20"
                                  placeholder="请输入联系地址"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="24">
                              <div class="imgs">
                                <!-- 身份证照片 -->
                                <el-form-item label="">
                                  <div class="card-img">
                                    <img
                                      v-if="item.personForm.identityCardPhoto"
                                      :src="item.personForm.identityCardPhoto"
                                      alt=""
                                    />
                                    <div class="pic-text">身份证照片</div>
                                  </div>
                                </el-form-item>
                                <el-form-item label="">
                                  <div class="camera-img">
                                    <img
                                      v-if="item.personForm.photo"
                                      :src="item.personForm.photo"
                                      alt=""
                                    />
                                    <div class="pic-text">
                                      <span>摄像头照片</span>
                                    </div>
                                  </div>
                                </el-form-item>
                              </div>
                            </el-col>
                          </el-row>
                        </el-form>
                      </el-tab-pane>
                    </template>
                  </el-tabs>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人">
              <el-input v-model="creater" disabled placeholder="请输入创建人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-input type="text" v-model="createTime" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="description">
              <el-input
                type="textarea"
                v-model="registerForm.description"
                maxlength="500"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="btns2">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { shipRegisterUpdate } from '../../../../service/main/main'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import localCache from '../../../../utils/cache'
export default {
  name: 'shipRegister',
  data() {
    return {
      registerForm: {
        applicants: [],
        description: '',
        shipName: '',
        shipOwner: '',
        registrationId: ''
      },
      docketType: '', // 单据类型
      identityTypes: '', // 证件类型
      persons: [
        {
          name: '',
          personForm: {
            identityCardName: '',
            identityCardNumber: '',
            address: '',
            phoneNumber: '',
            identityCardPhoto: ''
          }
        }
      ],
      type: null,
      userInfo: null,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      creater: '',
      identityCardPhoto: '',
      photo: '',
      currentTabIndex: 0, // 当前的tab的index
      socket: null,
      docketNumber: '',
      currentPersonInfo: null // 当前证件人的信息
    }
  },
  created() {
    this.dataInit()
  },
  methods: {
    // 初始化
    dataInit() {
      this.detail = localCache.cacheGet('detail')
      // console.log(this.detail)
      this.docketType = this.detail.categoryName
      // 证件类型
      this.identityTypes = this.$store.state.login.identityCards
      this.userInfo = this.$store.state.login.userInfo
      const { description, shipName, shipOwner } = this.detail
      this.registerForm = Object.assign(
        {},
        { description, shipName, shipOwner, registrationId: this.detail.id, applicants: [] }
      )
      this.createTime = this.detail.creationTime
      this.creater = this.detail.creatorName
      this.docketNumber = this.detail.number
      this.$nextTick(() => {
        const host = window.location.host
        this.detail.applicants.forEach((item, index) => {
          this.persons[index].name = `证件人${index + 1}`
          this.persons[index].personForm.identityCardName = item.identityCard.name
          this.persons[index].personForm.identityCardNumber = item.identityCard.number
          this.persons[index].personForm.address = item.address
          this.persons[index].personForm.phoneNumber = item.phoneNumber
          this.persons[index].personForm.identityCardPhoto =
            'http://' + host + '/' + item.identityCard.photoUri
          this.persons[index].personForm.photo = 'http://' + host + '/' + item.photoUri
          this.persons[index].personForm.identityCardTypeId = item.identityCard.typeId.value
        })
      })
    },
    // 保存
    async save() {
      this.registerForm.applicants = []
      this.persons.forEach((item) => {
        this.registerForm.applicants.push(item.personForm)
      })
      const res = await shipRegisterUpdate(this.registerForm)
      if (res.success) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.$router.back()
      }
    },
    tabChange(event) {
      this.currentTabIndex = event.index
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #fff;

  .box-card1 {
    width: 1200px;
    .card-header1 {
      display: flex;
      justify-content: flex-start;
      font-size: 18px;
      font-weight: 600;
      span {
        margin-left: 3px;
      }
    }
  }

  .box-card2 {
    margin-bottom: 10px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #ebebeb;

    :deep(.el-card__header) {
      padding: 10px !important;
      background: #f5f6f7;
      border: none;
    }

    .card-header2 {
      display: flex;
      justify-content: flex-start;
      span {
        cursor: pointer;
      }
    }

    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .applicant {
        width: 46%;

        :deep(.el-tabs) {
          box-shadow: none;
        }

        .read-btns {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          margin-left: 20px;
        }

        .imgs {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #ebebeb;
          padding-top: 10px;
          box-sizing: border-box;

          :deep(.el-form-item__content) {
            margin-left: 0 !important;
          }

          .el-form-item {
            width: 45%;
            height: 250px;
            .card-img,
            .camera-img {
              width: 100%;
              height: 100%;
              border: 1px solid #ebebeb;
              position: relative;
            }
            img {
              width: 100%;
              height: 100%;
            }
            .pic-text {
              font-weight: 600;
              width: calc(100% + 2px);
              background: #e6f3fd;
              position: absolute;
              bottom: -22px;
              left: -1px;

              display: flex;
              justify-content: space-around;
            }
          }
        }
      }
    }
  }
}
</style>
