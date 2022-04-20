<template>
  <div class="consult-register">
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
              <el-input disabled placeholder="企业咨询登记" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-input
                v-model="registerForm.company"
                maxlength="50"
                placeholder="请输入公司名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单据号">
              <el-input disabled placeholder="自动生成" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="咨询内容">
              <el-input
                v-model="registerForm.content"
                maxlength="100"
                placeholder="请输入咨询内容"
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
                        <el-form
                          ref="personRef"
                          :model="item.personForm"
                          :rules="applicantRules"
                          label-width="80px"
                        >
                          <el-row>
                            <el-col :span="24">
                              <div class="read-btns">
                                <el-button size="small" type="primary" @click="readIDCard"
                                  >开始读卡</el-button
                                >
                                <!-- <el-button size="small" type="primary" @click="closeRead"
                                  >关闭读卡</el-button
                                > -->
                              </div>
                            </el-col>
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
                                      :src="
                                        'data:image/png;base64,' + item.personForm.identityCardPhoto
                                      "
                                      alt=""
                                    />
                                    <div class="pic-text">身份证照片</div>
                                  </div>
                                </el-form-item>
                                <el-form-item label="">
                                  <div class="camera-img">
                                    <img
                                      v-if="item.personForm.photo"
                                      :src="'data:image/png;base64,' + item.personForm.photo"
                                      alt=""
                                    />
                                    <div class="pic-text">
                                      <span>摄像头照片</span>
                                      <!-- 照片上传 -->
                                      <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :before-upload="beforeAvatarUpload"
                                      >
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                        <el-icon v-else class="avatar-uploader-icon"
                                          ><plus
                                        /></el-icon>
                                      </el-upload>
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
                <!-- 拍照区域 -->
                <div class="pic-area">
                  <el-card class="box-card3" shadow="never">
                    <el-tabs type="border-card">
                      <el-tab-pane label="录像">
                        <div class="picture">
                          <camera-video2 />
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="拍照">
                        <div class="picture">
                          <camera-photo
                            :isShowImg="isShowImg"
                            :showEmptyImg="isEmptyImg"
                            :isDisabled="isPhotoBtns"
                            ref="cameraRef"
                            @takePicture="getCaremaPic"
                            @startSuccess="photoSuccess"
                          />
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </el-card>
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
        <el-button type="primary" :disabled="isSaveDisabled" @click="save">保存</el-button>
        <!-- <el-button @close="close">关闭</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { consultRegister } from '../../../../service/main/main'
import { CameraPhoto, CameraVideo2 } from '../../../../components/camera-photo/index'
import { blobToBase64 } from '../../../../utils/imageTransfer'
import moment from 'moment'
import { ElMessage } from 'element-plus'
export default {
  name: 'shipRegister',
  components: { CameraPhoto, CameraVideo2 },
  data() {
    return {
      registerForm: {
        applicants: [],
        description: '',
        content: '',
        company: ''
      },
      docketType: '', // 单据类型
      identityTypes: '', // 证件类型
      persons: [
        {
          name: '证件人1',
          personForm: {
            identityCardPhoto: '',
            photo: ''
          }
        }
      ],
      isShowImg: false, // 是否显示拍照的图片
      isEmptyImg: true, // 是否显示video上的占位空白图片
      isPhotoBtns: true, // 是否禁用拍照与停止拍照按钮
      type: null,
      userInfo: null,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      creater: '',
      identityCardPhoto: '',
      photo: '',
      currentTabIndex: 0, // 当前的tab的index
      socket: null,
      currentPersonInfo: null, // 当前证件人的信息
      isSaveDisabled: false,
      imageUrl: ''
    }
  },
  created() {
    this.dataInit()
  },
  watch: {
    // 监听路由的变化
    $route: {
      handler: function (to) {
        if (to.fullPath.includes('type')) {
          this.dataInit()
        }
      },
      deep: true
    }
  },
  methods: {
    // 开启摄像头
    photoSuccess() {
      // 开启摄像头之后，隐藏空白占位图片
      this.isEmptyImg = false
      // 解除拍照按钮与停止拍照按钮的禁用状态
      this.isPhotoBtns = false
    },
    // 获取摄像头排到的照片
    getCaremaPic(event) {
      this.isShowImg = true
      this.persons[this.currentTabIndex].personForm.photo = event.split(',')[1]
    },
    // 添加证件人
    addApplicant() {
      this.persons.push({
        name: `证件人${this.persons.length + 1}`,
        personForm: {
          identityCardTypeId: this.identityTypes[0].id,
          identityCardPhoto: '',
          photo: ''
        }
      })
    },
    // 初始化读卡器
    openReader() {
      var host = 'ws://127.0.0.1:33666' //客户端电脑本地IP，非服务器IP，无需修改
      const that = this
      if (this.socket === null) {
        this.socket = new WebSocket(host)
      } else {
        console.log('已初始化.')
      }
      try {
        this.socket.onopen = function () {
          // console.log('初始化成功.'); //可以注释
          // getVersion() //可以注释：控件版本号
        }
        this.socket.onclose = function () {
          console.log('读卡服务已经断开.')
        }
        this.socket.onerror = function () {
          console.log('请检查控件是否正常安装，下载地址：...')
        }
        this.socket.onmessage = function (msg) {
          if (typeof msg.data == 'string') {
            var msgM = msg.data + ''
            var msgJson = JSON.parse(msgM)
            // console.log(msgM, msgJson)
            switch (msgJson.fun) {
              case 'EST_GetVersion#':
                console.log('版本号：' + msgJson.errMsg)
                break

              case 'EST_Reader_ReadIDCard#':
                if (msgJson.rCode == '0') {
                  console.log(msgJson, '获取身份证信息')
                  // 获取到数据，进行数据填充
                  that.persons[that.currentTabIndex].personForm.identityCardName = msgJson.name
                  that.persons[that.currentTabIndex].personForm.identityCardNumber = msgJson.certNo
                  that.persons[that.currentTabIndex].personForm.address = msgJson.address
                  that.persons[that.currentTabIndex].personForm.identityCardPhoto =
                    msgJson.base64Data
                } else if (msgJson.rCode == '1') {
                  console.log('已停止自动读卡')
                } else if (msgJson.rCode == '-2') {
                  console.log('请放身份证')
                } else {
                  console.log(msgJson.errMsg)
                }
                break

              default:
                break
            }
          } else {
            alert('连接异常,请检查是否成功安装控件.')
          }
        }
      } catch (ex) {
        alert('连接异常,请检查是否成功安装控件.')
      }
    },
    // 初始化
    dataInit() {
      this.isSaveDisabled = false
      this.type = this.$route.query.type
      // 证件类型
      this.identityTypes = this.$store.state.login.identityCards
      this.userInfo = this.$store.state.login.userInfo
      this.creater = this.userInfo.userName
      // 表单置空
      this.registerForm = {
        applicants: [],
        description: '',
        content: '',
        company: ''
      }
      this.persons = [
        {
          name: '证件人1',
          personForm: {
            identityCardTypeId: this.identityTypes[0].id,
            identityCardPhoto: '',
            photo: ''
          }
        }
      ]
      this.resetCamera()
      // if (this.socket) {
      //   this.closeRead() // 关闭读卡
      // }
      this.openReader()
    },
    // 重置摄像头
    resetCamera() {
      if (this.$refs.cameraRef) {
        // this.$refs.cameraRef.stopPicture()
        // this.$refs.cameraRef.webcamInit()
        // 切换路由或者证件人的时候，初始化拍照组件的状态
        this.isShowImg = false
        this.isEmptyImg = true
        this.isPhotoBtns = true
      }
    },
    // 保存
    async save() {
      this.isSaveDisabled = true
      this.registerForm.applicants = []
      this.persons.forEach((item) => {
        this.registerForm.applicants.push(item.personForm)
      })
      console.log(this.registerForm, 'registerForm')
      // this.$refs.personRef.validate(async (valid) => {
      //   console.log(valid)
      // })
      const res = await consultRegister(this.registerForm)
      if (res.success) {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        this.dataInit()
      }
      // console.log(res, '======')
    },
    tabChange(event) {
      this.currentTabIndex = event.index
      this.resetCamera()
      // 关闭读卡服务
      // this.closeRead()
    },
    // 开始读卡
    readIDCard() {
      try {
        if (this.socket.readyState == 1) {
          this.socket.send('EST_Reader_ReadIDCard#')
        } else {
          console.log('未找到控件，请检查控件是否安装.')
        }
      } catch (ex) {
        console.log('连接异常,请检查是否成功安装控件.')
      }
    },
    // 关闭读卡
    closeRead() {
      try {
        if (this.socket != null) {
          this.socket.close()
          this.socket = null
        }
      } catch (ex) {
        console.log(ex)
      }
    },
    close() {},
    beforeAvatarUpload(event) {
      // console.log('上传之前', event)
      blobToBase64(event).then((res) => {
        console.log(res, 'base64')
        this.persons[this.currentTabIndex].personForm.photo = res.split(',')[1]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.consult-register {
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

      .pic-area {
        width: 46%;
        height: 100%;

        .box-card3 {
          border: none;
          .card-header3 {
            display: flex;
            justify-content: flex-start;
          }

          :deep(.el-tabs) {
            box-shadow: none;
          }

          .picture {
            // width: 80%;
            // height: 80%;
            width: 400px;
            height: auto;
            margin: 0 auto;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
