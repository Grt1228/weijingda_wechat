// pages/message/add/add.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    incognito:"0",
    openId:'',
  },
  content: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var content = e.detail.value.content;
    var incognito = that.data.incognito;
    if (!content) {
      app.showErrorModal('不能为空', '提醒');
      return false;
    }
    if (content.length>300){
      app.showErrorModal('最多300字', '提醒');
      return false;
    }
    var url = app.globalData.baseUrl + '/portal/message/add.do';
    var header = app.globalData.header;
    //openid
    var openid = that.data.openId;
    var data = {
      content: content,
      incognito: incognito,
      openid: openid
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      wx.showToast({
        title: '留言成功',
        icon: 'success',
        duration: 3000
      });
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        flag: true
      });
      wx.navigateBack({
        delta: 1
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openId = wx.getStorageSync('weChatOpenId');
    this.data.openId = openId;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      flag: false
    });
  },
  switchChange: function (e) {
    if(e.detail.value){
      this.data.incognito = "1";
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