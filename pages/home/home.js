var app = getApp();
var util = require('../../utils/util.js');
import naviConfigs from './navi.js'

Page({

  /**
   * 页面的初始数据
   * level 1需要登陆，0不需要登陆
   */
  data: {
    swiperImage: [
      {
        imageUrl: 'https://wx4.sinaimg.cn/large/d0a55498gy1g1vbr6t6nhj20fk078q7c.jpg',
        imageName: '默认首页'
      },
      {
        imageUrl: 'http://www.jgsu.edu.cn/images/001.jpg',
        imageName: '默认首页'
      }
    ],
    naviConfigs: naviConfigs
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.baseUrl + '/portal/image/getImage.do';
    var header = app.globalData.header;
    var data = {
      status: '1',//有效
      imageType: '0'//轮播图
    }
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this;
      var swiperImage = res.data;
      that.setData({
        swiperImage: swiperImage
      })
    } else {
      var that = this;
      var swiperImage = that.data.swiperImage;
      that.setData({
        swiperImage: swiperImage
      })
    }
  },
  failCallBack: function (res) {
    var that = this;
    var swiperImage = that.data.swiperImage;
    that.setData({
      swiperImage: swiperImage
    })
  },
  onNaviCard(e) {
    let {
      title,
      navigatemark,
      level
    } = e.target.dataset;
    var hasLogin = app.globalData.hasLogin;
    if (level == 1) {
      if (hasLogin == false) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
        return false;
      }
    }
    wx.navigateTo({
      url: '/pages/home/' + navigatemark + '/' + navigatemark + ''
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
    return {
      title: '欢迎体验井冈山大学微信小程序~~~'
    }
  }
})