// pages/test/test.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f2f7f5',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var url = app.globalData.baseUrl + '/portal/user/getTestSchedule.do';
    var header = app.globalData.header;
    util.http(url, 'POST', null, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if(!app.checkLoginStatus(res)){
      return;
    }
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this
      if (res.data.data .length==0){
        that.setData({
          flag: true
        })
      }else{
        var testObj = res.data.data;
        var testYear = res.data.data[0].testYear;
        that.setData({
          testObj: testObj,
          testYear: testYear
        })
      }
    } else {
      wx.hideToast();
      app.showErrorModal('查询失败请重试', '查询失败');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})