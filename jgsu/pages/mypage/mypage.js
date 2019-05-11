// pages/mypage/mypage.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    list: [
      {
        id: 'about',
        name: '关于我们',
        pages: 'about',
        level:'0'
      }, {
        id: 'idea',
        name: '反馈意见',
        pages: 'idea',
        level: '1'
      }, {
        id: 'addphone',
        name: '添加号码',
        pages: 'addphone',
        level: '1'
      }
    ],
    defHeadIcon:'http://p932yy1i1.bkt.clouddn.com/%E7%A4%BE%E5%8C%BA-%E5%8C%BF%E5%90%8D.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f8f8f8',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id;
    var level = e.currentTarget.dataset.level;
    var hasLogin = app.globalData.hasLogin;
    if (level == 1) {
      if (hasLogin == false) {

        wx.navigateTo({
          url: '/pages/login-last/login-last'
        })
        return false;
      }
    }
    wx.navigateTo({
      url: '../mypage/' + id + '/' + id + ''
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var userSchoolInfo = wx.getStorage({
      key: 'userSchoolInfo',
      success: function(res) {
        that.setData({
          userSchoolInfo: res.data
        })
      },
    })
    var userWechatInfo = wx.getStorage({
      key: 'userWechatInfo',
      success: function (res) {
        console.log(res);
        that.setData({
          userWechatInfo: res.data
        })
      },
    })
  },
  onGotUserInfo: function (e) {
    var that = this;
    var havaWeChatInfo = app.data.havaWeChatInfo;
    if (!havaWeChatInfo) {
      //console.log(e)
      app.getWechatInfo(e);
      var userWechatInfo = wx.getStorage({
        key: 'userWechatInfo',
        success: function (res) {
          console.log(res);
          that.setData({
            userWechatInfo: res.data
          })
        },
      })
    }
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