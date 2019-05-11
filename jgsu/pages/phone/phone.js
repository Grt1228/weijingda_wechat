// pages/phone/phone.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:'',
    list: [
      {
        id: 'school',
        phoneLevel:'0',
        name: '校级',
        open: false,
        pages: {}
      }, {
        id: 'institute',
        phoneLevel: '1',
        name: '院级',
        open: false,
        pages: {}
      }, {
        id: 'store',
        name: '商铺',
        phoneLevel: '2',
        open: false,
        pages: {}
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    var phoneLevel = '';
    var currentIndex = '';
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
        currentIndex = i;
        phoneLevel = list[i].phoneLevel;
        this.setData({
          currentIndex: currentIndex
        });
      } else {
        list[i].open = false;
      }
    }
    //请求数据展示
    var url = app.globalData.baseUrl + '/portal/phonebook/list.do';
    var header = app.globalData.header;
    var data = {
      phoneLevel: phoneLevel
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      //var that = this
      var phoneData = res.data.list;
      var currentIndex = this.data.currentIndex;
      var list = this.data.list;
      //set数据
      for(var i = 0;i<list.length;i++){
        if (i == currentIndex) {
          list[i].pages = phoneData;
        }
      }
      this.setData({
        list: list
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
  callPhone:function(e){
    //console.log(e);
    var phoneNumber = e.currentTarget.dataset.phoneNumber;
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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