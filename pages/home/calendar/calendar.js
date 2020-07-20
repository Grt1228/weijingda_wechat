// pages/calendar/calendar.js
var app = getApp();
var util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.baseUrl + '/portal/calendar/list',
    header: app.globalData.header,
    background: [
      //'#84e7d0', '#b49eeb', '#f5a8f0','#aad4f5','#ffb366'
      '#edec8c','#008ea1','#e3d434','#008f75'
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //日历样式
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var that = this;
    //获取当月的节假日List
    var data = {
      calendarYear: year,
      calendarMonth: month,
      calendarType: '0',
      status: '0'
    };
    util.http(that.data.url, 'POST', data, that.data.header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    var that = this;
    var background = that.data.background;
    if (res.status == app.globalData.successCode) {
      var that = this;
      var calendarData = res.data.list;
      let days_style = new Array;
      for (var i = 0; i < calendarData.length; i++) {
              var index = Math.floor((Math.random() * background.length));
              var currentColor = background[index];
              days_style.push({
                month: 'current',
                day: calendarData[i].calendarDay,
                color: 'white',
                background: currentColor
              });
      }
      var that = this;
      that.setData({
        days_style: days_style
      })

      //获取日历下方的描述信息
      var data = {
        calendarType: '1',
        status: '1'
      };
      util.http(that.data.url, 'POST', data, that.data.header, this.successCallBack_desc, this.failCallBack);
    } else {
      app.showLoadToast("信息获取异常~", "error", 2000)
    }
  },
  successCallBack_desc: function(res){
    if(res.status == app.globalData.successCode){
      var that = this;
      var calendarDescData = res.data.list;
      that.setData({
        calendarDescData: calendarDescData
      })
    } else {
      app.showLoadToast("信息获取异常~", "error", 2000)
    }
  },
  failCallBack: function (res) {
    app.showLoadToast("信息获取异常~","error",2000)
  },
  //下个月
  next: function(event) {
    var currentMonth = event.detail.currentMonth;
    var currentYear = event.detail.currentYear;
    this.getShowDate(currentMonth, currentYear);
  },
  //上个月
  prev: function(event) {
    var currentMonth = event.detail.currentMonth;
    var currentYear = event.detail.currentYear;
    this.getShowDate(currentMonth, currentYear);
  },
  getShowDate: function(currentMonth, currentYear) {
    //日历样式
    var month = currentMonth
    var year = currentYear
    var that = this;
    var background = that.data.background;
    var url = app.globalData.baseUrl + '/portal/calendar/list';
    var header = app.globalData.header;
    var data = {
      calendarYear: year,
      calendarMonth: month,
      calendarType: ''
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '井大官方校历，快来看看假期安排~~~'
    }
  }
})