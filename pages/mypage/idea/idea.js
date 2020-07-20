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
    
  },
  formSubmit: function (e) {
    var that = this;
    var ideaDetail = e.detail.value.ideaDetail;
    var linkType = e.detail.value.linkType;
    if (!ideaDetail) {
      wx.lin.showMessage({
        type: 'error',
        duration: 1500,
        content: '反馈内容不能为空'
      })
      return false;
    }
    var url = app.globalData.baseUrl + '/portal/idea/add.do';
    var header = app.globalData.header;
    var openid = wx.getStorageSync("weChatOpenId");
    var data = {
      ideaDetail: ideaDetail,
      linkType: linkType,
      openid: openid
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      app.showLoadToast(res.msg, "success", 2000, this.succCall);
      
    } else {
      wx.lin.showMessage({
        type: 'warning',
        duration: 1500,
        content: "系统异常请重试"
      })
    }
  },
  succCall: function(){
    wx.switchTab({
      url: '/pages/mypage/mypage'
    })
  },
  failCallBack: function (res) {
    wx.lin.showMessage({
      type: 'warning',
      duration: 1500,
      content: "系统异常请重试"
    })
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