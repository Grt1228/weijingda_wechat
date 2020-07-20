// pages/mypage/mypage.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    hasWechatInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    showPop: false,
    openTypeItemList: [
      { name: '转发给好友', openType: 'share' },
      { name: '获取手机号', openType: 'getPhoneNumber' }
    ],
    grids2: [
      {
        image: 'about',
        text: '关于我们',
        id: 'about',
        pages: 'about',
        level: '0'
      }, {
        image: 'idea',
        text: '反馈意见',
        id: 'idea',
        pages: 'idea',
        level: '0'
      }, {
        image: 'lianxi',
        text: '联系我们',
        id: 'lianxi',
        pages: 'lianxi',
        level: '0'
      }, {
        image: 'help',
        text: '帮助中心',
        id: 'help',
        pages: 'help',
        level: '0'
      }, {
        image: 'phone',
        text: '添加号码',
        id: 'phone',
        pages: 'phone',
        level: '0'
      }
    ],
    defHeadIcon: 'http://p932yy1i1.bkt.clouddn.com/%E7%A4%BE%E5%8C%BA-%E5%8C%BF%E5%90%8D.png'
  },
  onImage() {
    wx.previewImage({
      urls: ['https://wjdgood.oss-cn-shanghai.aliyuncs.com/26.6km.jpg']
    });
  },
  bindGetUserInfo: function (e) {
    var havaWeChatInfo = app.globalData.havaWeChatInfo;
    if (!havaWeChatInfo) {
      //console.log(e)
      app.getWechatInfo(e);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.havaWeChatInfo) {
      this.data.hasWechatInfo = true;
    } else {
      this.data.hasWechatInfo = false;
    }
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
  clickGrids: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var level = e.currentTarget.dataset.level;
    var hasLogin = app.globalData.hasLogin;
    if (level == 1) {
      if (hasLogin == false) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
        return false;
      }
    }else if (id == "lianxi") {
      that.setData({
        showPop: true
      })
    }else{
      wx.navigateTo({
        url: '../mypage/' + id + '/' + id + ''
      })
    }
    
  },
  showOpenTypeActionSheet: function() {
    this._showActionSheet({ itemList: this.data.openTypeItemList, showCancel: true })
  },
  _showActionSheet: function({ itemList, showCancel = false, title = '', locked = false }) {
    wx.lin.showActionSheet({
      itemList: itemList,
      showCancel: showCancel,
      title: title,
      locked,
      success: (res) => {
        console.log(res);
        wx.showToast({
          title: res.item.name,
          icon: 'none'
        })
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var userSchoolInfo = wx.getStorage({
      key: 'userSchoolInfo',
      success: function (res) {
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