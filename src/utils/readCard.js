let socket = null

export function openReader() {
  var host = 'ws://127.0.0.1:33666' //客户端电脑本地IP，非服务器IP，无需修改
  if (socket === null) {
    socket = new WebSocket(host)
  } else {
    console.log('已初始化.')
  }
  try {
    socket.onopen = function () {
      // console.log('初始化成功.'); //可以注释
      getVersion() //可以注释：控件版本号
    }
    socket.onclose = function () {
      console.log('读卡服务已经断开.')
    }
    socket.onerror = function () {
      console.log('请检查控件是否正常安装，下载地址：...')
    }
    socket.onmessage = function (msg) {
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
              posBeep()
              return msgJson
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
}

//单次读取身份证信息
export function readIDCard() {
  try {
    if (socket.readyState == 1) {
      socket.send('EST_Reader_ReadIDCard#')
    } else {
      console.log('未找到控件，请检查控件是否安装.')
    }
  } catch (ex) {
    console.log('连接异常,请检查是否成功安装控件.')
  }
}

// 获取版本号
function getVersion() {
  socket.send('EST_GetVersion#')
}

//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
  if (socket.readyState == 1) {
    socket.send('EST_PosBeep#')
  } else {
    console.log('未找到控件，请检查控件是否安装.')
  }
}
