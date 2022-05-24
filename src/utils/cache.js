// localStorage封装
class LocalCache {
  // 储存值
  cacheSet(key, value) {
    window.localStorage.setItem(`manage-${key}`, JSON.stringify(value))
  }

  // 获取值
  cacheGet(key) {
    const value = window.localStorage.getItem(`manage-${key}`)
    if (value) {
      return JSON.parse(value)
    }
  }

  // 删除某一个值
  deleteCache(key) {
    window.localStorage.removeItem(`manage-${key}`)
  }

  // 清除所有的值
  clearCache() {
    window.localStorage.clear()
  }
}

const localCache = new LocalCache()

export default localCache
