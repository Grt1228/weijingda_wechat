// pages/home/libsear/detail/detail.js

var util = require('../../../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookName: {},
    detailParam: "",
    flag : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var data = {
      detailParam: options.oneData
    }
    this.setData({
      bookName: JSON.parse(options.oneData),
      detailParam: options.oneData

    })
    this.getDetail(data);
  },
  successCallBack: function (res) {
    var f = this.data.flag;
    if (res === "" && f <= 1) {
      var data = {
        detailParam: this.data.detailParam
      }
      this.setData({
        flag : f+1
      })
      this.getDetail(data);
    } else if (res === "" && f > 1) {
      app.showLoadToast("出错了，请重试~~~", "error", 1500);
    }
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this;
      var books = res.data;
      that.setData({
        books: books
      })
    } else if (f <= 1) {
      app.showLoadToast("出错了，自动重试中~~~", "error", 1500);
    } else if (f > 1){
      app.showLoadToast("出错了，请返回重试~~~", "error", 1500);
    }
  },
  getDetail: function (data) {
    var url = app.globalData.baseUrl + '/portal/book/bookDetail.do';
    var header = app.globalData.header;
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  failCallBack: function (res) {
    app.showLoadToast("出错了，请返回重试~~~", "error", 1500);
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
    return {
      title: "我在为微井大小程序找到了《" + this.data.bookName.title + "》这本书在图书馆里有馆藏。"
    }
  }
})
