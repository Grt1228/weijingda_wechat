// pages/mypage/addphone/addphone.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['校级', '院级', '商铺'],
    objectArray: [
      {
        id: 0,
        name: '校级'
      },
      {
        id: 1,
        name: '院级'
      },
      {
        id: 2,
        name: '商铺'
      }
    ],
    index: 0
  },
  phoneName: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      phoneName: e.detail.value
    })
  },
  phoneNumber: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      phoneNumber: e.detail.value
    })
  },
  phoneLevel: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      phoneLevel: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var phoneName = e.detail.value.phoneName;
    var phoneNumber = e.detail.value.phoneNumber;
    var phoneLevel = e.detail.value.phoneLevel;
    if (phoneLevel==="" || phoneNumber==="" || phoneName==="") {
      app.showLoadToast("电话名称，联系方式是必填项", "error", 1500);
      return false;
    }
    var openid = wx.getStorageSync("weChatOpenId");
    var url = app.globalData.baseUrl + '/portal/phonebook/insertOne.do';
    var header = app.globalData.header;
    var data = {
      phoneName: phoneName,
      phoneNumber: phoneNumber,
      phoneLevel: phoneLevel,
      openid: openid
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      app.showLoadToast(res.msg, "success", 2000,this.succCall);
    } else {
      wx.hideToast();
      app.showErrorModal('系统异常请重试', '错误');
    }
  },
  succCall: function(){
    wx.switchTab({
      url: '/pages/mypage/mypage'
    })
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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