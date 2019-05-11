// pages/mypage/idea/idea.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  ideaDetail: function(e){
    var that = this;
    that.setData({
      ideaDetail: e.detail.value
    })
  },
  linkType: function (e) {
    var that = this;
    that.setData({
      linkType: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var ideaDetail = e.detail.value.ideaDetail;
    var linkType = e.detail.value.linkType;
    if (!ideaDetail) {
      app.showErrorModal('反馈内容不能为空', '提醒');
      return false;
    }
    var url = app.globalData.baseUrl + '/portal/idea/add.do';
    var header = app.globalData.header;
    var data = {
      ideaDetail: ideaDetail,
      linkType: linkType
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 3000
      });
      wx.switchTab({
        url: '/pages/index-last/index-last'
      })
    } else {
      wx.hideToast();
      app.showErrorModal('系统异常请重试', '错误');
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