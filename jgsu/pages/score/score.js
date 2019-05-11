// pages/score/score.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res
        });
      },
    })
    var url = app.globalData.baseUrl + '/portal/user/getScore.do';
    var header = app.globalData.header;
    util.http(url, 'POST', null, header, this.successCallBack, this.failCallBack);
    app.showLoadToast('加载中', 2500);
  },
  //登陆成功回调函数
  successCallBack: function (res) {
    if (!app.checkLoginStatus(res)) {
      return;
    }
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      this.setData({
        scoreData: res.data
      });
    } else {
      wx.hideToast();
      app.showErrorModal(res.msg, '系统错误');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    //app.showErrorModal(res.data.msg, '绑定失败');
  },
  updateScore : function(e){
    var url = app.globalData.baseUrl + '/portal/user/updateScore.do';
    var header = app.globalData.header;
    util.http(url, 'POST', null, header, this.successCallBack, this.failCallBack);
    app.showLoadToast('更新中',3500);
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