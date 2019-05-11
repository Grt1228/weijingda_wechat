// pages/index-last/index-last.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   * level 1需要登陆，0不需要登陆
   */
  data: {
    swiperImage: [
      {
        imageUrl:'http://p932yy1i1.bkt.clouddn.com/index1.jpg',
        imageName:'默认首页'
      },
      {
        imageUrl: 'http://p932yy1i1.bkt.clouddn.com/index2.jpg',
        imageName: '默认首页'
      }
    ],
    angle: 0,
    list: [
      {
        id: 'englv',
        name: '英语等级',
        pages: 'englv',
        level:'0'
      }, {
        id: 'score',
        name: '成绩查询',
        pages: 'score',
        level: '1'
      }, {
        id: 'test',
        name: '考试安排',
        pages: 'test',
        level: '1'
      }, {
        id: 'course',
        name: '课表查询',
        pages: 'course',
        level: '1'
      }, {
        id: 'new',
        name: '校园新闻',
        pages: 'new',
        level: '0'
      }, {
        id: 'phone',
        name: '通讯录',
        pages: 'phone',
        level: '1'
      }, {
        id: 'map',
        name: '校园地图',
        pages: 'map',
        level: '0'
      }, {
        id: 'calendar',
        name: '井大校历',
        pages: 'calendar',
        level: '0'
      }, {
        id: 'library',
        name: '图书馆',
        pages: 'library',
        level: '0'
      }, {
        id: 'message',
        name: '留言板',
        pages: 'message',
        level: '0'
      }
      /*, {
        id: 'lostgood',
        name: '失物招领',
        pages: 'lostgood',
        level: '1'
      }*/
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
    var url = app.globalData.baseUrl + '/portal/image/getImage.do';
    var header = app.globalData.header;
    var data = {
      status:'1',//有效
      imageType:'0'//轮播图
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
  onScoreTap: function (event) {
    wx.navigateTo({
      url: '../score/score'
    })
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id;
    var level = e.currentTarget.dataset.level;
    var hasLogin = app.globalData.hasLogin;
    if (level==1){
      if (hasLogin == false) {
        
        wx.navigateTo({
          url: '/pages/login-last/login-last'
        })
        return false;
      }
    }
    wx.navigateTo({
      url: '../' + id + '/' + id + ''
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