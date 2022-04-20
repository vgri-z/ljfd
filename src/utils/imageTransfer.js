// Blob转base64
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

// 调用方式
// blobToBase64(blob).then((res) => {
//   // 转化后的base64
//   console.log('base64', res)
// })

// url转base64
export function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = function () {
      let canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(image, 0, 0)
      // result
      let result = canvas.toDataURL('image/png')
      resolve(result)
    }
    // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = url
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(new Error('urlToBase64 error'))
    }
  })
}

// 调用方式
// let imgUrL = `http://XXX.jpg`
// urlToBase64(imgUrL).then(res => {
//   // 转化后的base64图片地址
//   console.log('base64', res)
// })

// base64转blob
export function base64ToBlob({ b64data = '', contentType = '', sliceSize = 512 } = {}) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data)
    let byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize)
      let byteNumbers = []
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i))
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers))
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result, {
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`
    })
    resolve(result)
  })
}

// 调用方式
// let base64 = base64.split(',')[1]
// base64ToBlob({ b64data: base64, contentType: 'image/png' }).then((res) => {
//   // 转后后的blob对象
//   console.log('blob', res)
// })
