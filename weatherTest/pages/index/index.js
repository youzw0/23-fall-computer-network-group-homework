// pages/weather/weather.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    adcode: "",
    temp: "温度",
    low: "最低温度",
    high: "最高温度",
    weather: "天气",
    city: "城市",
    date: "日期",
    winddirection:"[风向]",
    humidity:"[湿度]",
    windpower:"[风力]",
    tomweather:"天气",
    tomhigh:"高",
    tomlow:"低",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var page=this
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=0cb3a4ed4bdbceaf7ef2e45dd2364bc7&city=320100&extensions=all',
      header:{
        'content-type': 'application.json'
      },
      success(res){
        res=res.data.forecasts[0]
        page.setData({
          low:res.casts[0].nighttemp,
          high:res.casts[0].daytemp,
          date:res.casts[0].date,
          tomweather:res.casts[1].dayweather,
          tomhigh:res.casts[1].daytemp,
          tomlow:res.casts[1].nighttemp,
        })
      }
    })
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=0cb3a4ed4bdbceaf7ef2e45dd2364bc7&city=320100&extensions=base',
      header:{
        'content-type': 'application.json'
      },
      success(res){
        res=res.data.lives[0]
        page.setData({
          city:res.city,
          weather:res.weather,
          temp:res.temperature,
          winddirection:res.winddirection,
          windpower:res.windpower,
          humidity:res.humidity,
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  toRecent(){
    console.log("跳转到近日天气页面")
    wx.navigateTo({
      url: '../recent/recent',
    })
  },

  toCities(){
    console.log("跳转到城市管理页面")
    wx.navigateTo({
      url: '../cities/cities',
    })
  }
})