// pages/phone/phone.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: '',
    phoneType: [{
      id: 'school',
      phoneLevel: '0',
      open: false,
      pages: {},
      tab: '校级',
      key: 'school',
      icon: 'school',
      picPlacement: 'left'
    }, {
      id: 'institute',
      phoneLevel: '1',
      open: false,
      pages: {},
      tab: '院级',
      key: 'institute',
      icon: 'institute',
      picPlacement: 'left'
    }, {
      id: 'store',
      phoneLevel: '2',
      open: false,
      pages: {},
      tab: '其他',
      key: 'store',
      icon: 'store',
      picPlacement: 'left'
    }]
  },
  copyLink(e) {
    var data = e.currentTarget.dataset.link;
    wx.setClipboardData({
      data: data,
      success: () => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  callPhone(e) {
    var data = e.currentTarget.dataset.link;
    wx.makePhoneCall({
      phoneNumber: data
    })
  },
  kindToggle: function(e) {
    var phoneLevel = '0';
    if (e !== undefined) {
      var phoneLevel = e.detail.activeKey;
    }

    //请求数据展示
    var url = app.globalData.baseUrl + '/portal/phonebook/list.do';
    var header = app.globalData.header;
    var data = {
      phoneLevel: phoneLevel
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function(res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      //var that = this
      var phoneData = res.data.list;
      //set数据
      this.setData({
        phoneData: phoneData
      });
    } else {
      wx.hideToast();
      app.showErrorModal('查询失败请重试', '查询失败');
    }
  },
  failCallBack: function(res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.kindToggle()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '井冈山大学校园通讯录~~~'
    }
  }
})