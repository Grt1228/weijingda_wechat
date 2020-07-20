// pages/home/lostfound/detail/detail.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '公告：联系方式点击可复制。点击图片可预览大图。',
    goodData:{}
  },
  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: () => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showImage: function (e) {
    wx.previewImage({
      current: this.data.goodData.image,
      urls: [this.data.goodData.image]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lostGoodId = options.id;
    var that = this;
    var openid = wx.getStorageSync('weChatOpenId');
    if (openid == null || openid == '' | openid == undefined) {
      app.getOpenId();
    }
    var url = app.globalData.baseUrl + '/portal/lostgood/findByid';
    var header = app.globalData.header;
    var data = {
      lostGoodId: lostGoodId
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      this.setData({
        goodData: res.data
      })
    } else {
      app.showLoadToast("获取失败请重试", "error", 1500);
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