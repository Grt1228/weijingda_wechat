// pages/library/library.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookUserName:'',
    bookPassword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#D2B48C',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  bookUserName: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      bookUserName: e.detail.value
    })
  }, 
  bookPassword: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      bookPassword: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var bookUserName = e.detail.value.bookUserName;
    var bookPassword = e.detail.value.bookPassword;
    if (!bookPassword || !bookUserName) {
      app.showErrorModal('学号及密码不能为空', '提醒');
      return false;
    }
    var url = app.globalData.baseUrl + '/portal/book/bookLogin.do';
    var header = app.globalData.bookHeader;
    var data = {
      bookUserName: bookUserName,
      bookPassword: bookPassword
    };
    that.data.bookUserName = bookUserName;
    that.data.bookPassword = bookPassword;
    app.showLoadToast('绑定中',8200);
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 1500
      });
      var that = this;
      var bookUserName = that.data.bookUserName;
      var bookPassword = that.data.bookPassword;
      var bookObj = {
        res:res,
        bookUserName:bookUserName,
        bookPassword: bookPassword
      }
      wx.redirectTo({
        url: 'lendbook/lendbook?bookObj=' + JSON.stringify(bookObj)
      })
    } else {
      wx.hideToast();
      app.showErrorModal(res.msg, '绑定失败');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常或获取验证码错误，联系管理员', '错误');
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