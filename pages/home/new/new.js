// pages/new/new.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewData();
  },
  getNewData :function(){
    var url = app.globalData.baseUrl + '/portal/new/list.do';
    var header = app.globalData.header;
    var newStatus = '1';
    var pageSize = 30;
    var pageNum = 1;
    var data = {
      newStatus: newStatus,
      pageSize: pageSize,
      pageNum: pageNum
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      this.setData({
        newData: res.data.list
      });
    } else {
      wx.hideToast();
      app.showErrorModal('查询失败请重试', '查询失败');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  showDetail: function(e){
    //console.log(e)
    var oneData = encodeURIComponent(JSON.stringify(e.target.dataset));//函数可把字符串作为 URI 组件进行编码
    wx.navigateTo({
      url: '../new/detail/detail?oneData=' + oneData //传递参数
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
    this.getNewData();
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
    return {
      title: "井冈山大学校园新闻~~~~"
    }
  }
})