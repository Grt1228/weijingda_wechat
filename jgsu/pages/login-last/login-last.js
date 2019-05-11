// pages/login-last/login-last.js
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  username: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
  password: function (e) {    //获取input输入的值
    var that = this;
    that.setData({
      password: e.detail.value
    })
    var id_num = that.data.ID_num
  },
  checkcode: function (e) {    //获取input输入的值
    var that = this;
    that.setData({
      checkcode: e.detail.value
    })
    var id_num = that.data.ID_num
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.baseUrl + '/portal/user/getcheckcode.do';
    var header = app.globalData.header;
    util.http(url, 'POST', null, header, this.getCodeSuccess, this.failCallBack);
    var flag = true;
    that.setData({
      flag: flag
    })
  },
  getCodeSuccess: function (res) {
    var codeUrl = '';
    //console.log(res);
    if (res.status == app.globalData.successCode) {
      var that = this;
      var flag = false;
      that.setData({
        codeUrl: res.data.checkCodeUrl,
        flag: flag
      })
      app.globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
    }
  },
  formSubmit: function (e) {
    var that = this;
    var loginName = e.detail.value.username;
    var password = e.detail.value.password;
    var checkCode = e.detail.value.checkcode;
    if (!loginName || !password || !checkCode) {
      app.showErrorModal('账号及密码验证码都不能为空', '提醒');
      return false;
    }
    var url = app.globalData.baseUrl + '/portal/user/login.do';
    var header = app.globalData.header;
    var openId = wx.getStorageSync('weChatOpenId');
    var data = {
      loginName: loginName,
      password: password,
      checkCode: checkCode,
      openId: openId
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  //登陆成功回调函数
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 1500
      });
      var userSchoolInfo = {
        loginName: res.data.loginName,
        studentName: res.data.studentName
      };
      wx.setStorage({
        key: 'userSchoolInfo',
        data: userSchoolInfo,
      })
      app.globalData.hasLogin = true;
      wx.switchTab({
        url: '../index-last/index-last'
      })
    } else {
      wx.hideToast();
      app.showErrorModal(res.msg, '绑定失败');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    //app.showErrorModal(res.data.msg, '绑定失败');
  },
  onGotUserInfo: function (e) {
    var havaWeChatInfo = app.data.havaWeChatInfo;
    if (!havaWeChatInfo){
      //console.log(e)
      app.getWechatInfo(e);
    }
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