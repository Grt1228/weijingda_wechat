// pages/cet/cet.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  studentName: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      studentName: e.detail.value
    })
  },
  cetNumber: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      cetNumber: e.detail.value
    })
  },
  checkCode: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      checkCode: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.baseUrl + '/portal/cet/cetCheckCode.do';
    var header = app.globalData.header;
    util.http(url, 'POST', null, header, this.getCodeSuccess, this.failCallBack);
    var flag = true;
    that.setData({
      flag: flag
    })
  },
  getCodeSuccess: function (res) {
    var that = this;
    var codeUrl = '';
    var flag = false;
    //console.log(res);
    if (res.status == app.globalData.successCode) {
      that.setData({
        codeUrl: res.data.checkCodeUrl,
        flag: flag
      })
    }
  },
  formSubmit: function (e) {
    var that = this;
    var studentName = e.detail.value.studentName;
    var cetNumber = e.detail.value.cetNumber;
    var checkCode = e.detail.value.checkCode;
    if (!checkCode || !cetNumber || !studentName) {
      app.showErrorModal('考号及姓名验证码都不能为空', '提醒');
      return false;
    }
    var url = app.globalData.baseUrl + '/portal/cet/score.do';
    var header = app.globalData.header;
    var data = {
      studentName: studentName,
      cetNumber: cetNumber,
      checkCode: checkCode
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      wx.showToast({
        title: '查询成功',
        icon: 'success',
        duration: 1500
      });
      wx.navigateTo({
        url: 'score/score?scoreObj=' + JSON.stringify(res.data) 
      })
    } else {
      wx.hideToast();
      app.showErrorModal('查询失败请重试', '查询失败');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常或获取验证码错误，联系管理员', '错误');
  },
  showImage :function(e){
    var current = e.target.dataset.codeurl;  
    wx.previewImage({
      current: current,
      urls: [current]
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