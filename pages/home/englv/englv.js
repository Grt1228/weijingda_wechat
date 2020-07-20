// pages/cet/cet.js
var util = require('../../../utils/util.js');
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
    
  },
  navToC: function(){
    wx.navigateToMiniProgram({
      appId: 'wx2eec5fb00157a603',
      envVersion: 'release',
      success(res) {
        // 打开成功
      },
      fail(res) {
        console.log("打开失败")
      }
    })
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