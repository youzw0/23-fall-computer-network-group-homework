// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.default = wx.getStorageSync('0')
    this.globalData.collection = wx.getStorageSync('1')

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    default: "",
    collection: [],
    userInfo: null
  },

  getDefault(){
    return this.globalData.default
  },
  setDefault(adcode){
    this.globalData.default = adcode
    wx.setStorageSync('0', adcode)
  },
  getCollection(){
    return this.globalData.collection
  },
  setCollection(arr){
    this.globalData.collection = arr
    wx.setStorageSync('1', arr)
  }
})
