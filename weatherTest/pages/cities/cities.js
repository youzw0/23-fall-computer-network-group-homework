// pages/recent/recent.js
Page({



  /**
   * 页面的初始数据
   */
  data: {
    weathers: [],
    adcodes: [
      "110000", "320100","450109","450100","310000","440100","440300","810000","420100","510100","330100",
    ],
    back: '<'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options == "refresh"){
      this.setData({weathers:this.data.weathers})
      return
    }
    var that = this
    var i = 0
    for(var j=0; j<this.data.adcodes.length; j++){
      this.data.weathers.push({ city: "", low: "", high: "", temp: "", weather: "", adcode:"" })
    }
    that.loadWeather(i)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(this.data.weathers + " 渲染完成")
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

  toIndex() {
    console.log("返回主页");
    wx.navigateBack()
  },

  toSearch() {
    console.log("进入搜索");
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  loadWeather:function(i){
    var that = this
    if(i>=that.data.adcodes.length){
      return
    }

    var code = this.data.adcodes[i]
    var wea = { city: "", low: "", high: "", temp: "", weather: "", }

    var url1 = "https://restapi.amap.com/v3/weather/weatherInfo?key=0cb3a4ed4bdbceaf7ef2e45dd2364bc7&city=" + code + "&extensions=base"
    var url2 = "https://restapi.amap.com/v3/weather/weatherInfo?key=0cb3a4ed4bdbceaf7ef2e45dd2364bc7&city=" + code + "&extensions=all"

    wx.request({
      url: url1,
      header: {
        'content-type': 'application.json'
      },
      success(res) {
        res = res.data.lives[0]
        wea.city = res.city
        wea.weather = res.weather
        wea.temp = res.temperature
        wea.adcode = that.data.adcodes[i]
        
        wx.request({
          url: url2,
          header: {
            'content-type': 'application.json'
          },
          success(res) {
            res = res.data.forecasts[0].casts[0]
            wea.low = res.nighttemp
            wea.high = res.daytemp

            that.data.weathers[i] = wea
            that.onLoad("refresh")
            that.loadWeather(i+1)
          }
        })
      }
    })

  },

  toRecent(e){
    var app = getApp()
    var target = e.currentTarget.dataset.target
    app.set
    console.log("跳转到近期天气页面"+target)
    wx.navigateTo({
      url: '../recent/recent?adcode='+target
    })
  },

  onDelete(){
    this.setData({back: '×'})
  },

  goBack(){
    var that = this
    if(that.data.back == '<'){
      that.toIndex()
    }else{
      this.setData({back: '<'})
    }
  },

  delItem(e){
    var adcode = e.currentTarget.dataset.adcode
    console.log("删除了"+adcode)
    var arr = []
    var that = this
    for(var i=0; i<that.data.adcodes.length; i++){
      var code = that.data.adcodes[i]
      if(code != adcode){
        arr.push(code)
      }
    }
    that.setData({adcodes, arr})
    var app = getApp()
    app.setCollection(arr)
  }
})