// 设置cookie储存用户名与密码
const setCookie = (c_name, c_pwd, exdays) => {
  let exdate = new Date()
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
  window.document.cookie = `userName=${c_name};path=/;expires=${exdate.toGMTString()}`
  window.document.cookie = `password=${c_pwd};path=/;expires=${exdate.toGMTString()}`
}

// 获取存储的用户名与密码
const getCookie = () => {
  const cookieObj = {}
  if (document.cookie.length > 0) {
    let arr = document.cookie.split('; ')
    arr.forEach((item) => {
      let arr2 = item.split('=')
      if (arr2[0] === 'userName') {
        cookieObj.userName = arr2[1]
      } else if (arr2[0] === 'password') {
        cookieObj.password = arr2[1]
      }
    })
  }
  return cookieObj
}

// 清除cookie
const clearCookie = () => {
  setCookie('', '', -1)
}

// 判断时候存储用户名与密码
const saveCookie = (bool, userName, password, days) => {
  // console.log(bool, userName, password, days)
  if (bool) {
    setCookie(userName, password, days)
  } else {
    clearCookie()
  }
}

export { setCookie, getCookie, saveCookie, clearCookie }
