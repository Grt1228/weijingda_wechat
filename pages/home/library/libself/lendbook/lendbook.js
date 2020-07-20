// pages/library/lendbook/lendbook.js
var app = getApp();
var util = require('../../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookUserName: '',
    bookPassword: ''
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

    var that = this
    var bookObj = JSON.parse(options.bookObj);
    var bookData = bookObj.res.data;
    var msg = bookObj.res.msg;
    var bookUserName = bookObj.bookUserName;
    var bookPassword = bookObj.bookPassword;
    that.data.bookUserName = bookUserName;
    that.data.bookPassword = bookPassword;
    that.setData({
      bookData: bookData,
      msg: msg,
      bookUserName: bookUserName
    })
  },
  bookRenew: function (event){
    //console.log(event)
    var barcode = event.currentTarget.id;
    var sn = event.currentTarget.dataset.renewcode;
    var url = app.globalData.baseUrl + '/portal/book/bookRenew.do';
    var header = app.globalData.bookHeader;
    var data = {
      sn: sn,
      barcode: barcode
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
    app.showLoadToast("续借中",5500);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this;
      var bookUserName = that.data.bookUserName;
      var bookPassword = that.data.bookPassword;
      //重新查询
      var url = app.globalData.baseUrl + '/portal/book/bookLogin.do';
      var header = app.globalData.bookHeader;
      var data = {
        bookUserName: bookUserName,
        bookPassword: bookPassword
      };
      wx.showModal({
        title:'提示',
        content: res.msg,
        showCancel:false,
        complete:function(){
          util.http(url, 'POST', data, header, that.renewGetBookBack, that.failCallBack);
          app.showLoadToast("更新最新信息",4000);
        }
      })
    } else {
      wx.hideToast();
      app.showErrorModal(res.msg, '续借失败');
    }
  },
  renewGetBookBack: function(res){
    if (res.status == app.globalData.successCode) {
      var that = this
      var bookData = res.data;
      var msg = res.msg;
      var bookUserName = that.data.bookUserName;
      that.setData({
        bookData: bookData,
        msg: msg,
        bookUserName: bookUserName
      })
    } else {
      wx.hideToast();
      app.showErrorModal('续借重新查询失败，请重试', '续借后查询失败');
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
    wx.navigateBack({
      delta: 2
    })
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