// pages/home/lostfound/add/add.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requiredRules: {
      required: true,
      message: "输入完整的信息"
    },
    imageUrl: [],
    type: "success",
    duration: 1500,
    dialogFlag: false,
    subData: {}
  },
  formSubmit: function(e) {
    var adderMobile = e.detail.value.adderMobile;
    var adderName = e.detail.value.adderName;
    var goodDetail = e.detail.value.goodDetail;
    var goodPosition = e.detail.value.goodPosition;
    var goodTitle = e.detail.value.goodTitle;
    var goodType = e.detail.value.goodType;
    var imageUrl = this.data.imageUrl[0];
    var flag4 = this.checkReq(goodType, "失招类型类型不能为空");
    var flag3 = this.checkReq(adderMobile, "联系方式不能为空");
    var flag2 = this.checkReq(goodTitle, "标题不能为空");
    var flag1 = this.checkReq(adderName, "昵称不能为空");
    if(!(flag1 && flag2 && flag3 && flag4)){
      return;
    }
    var openid = wx.getStorageSync('weChatOpenId');
    if (openid == null || openid == '' | openid == undefined) {
      app.getOpenId();
    }
    if (goodType ==="丢失"){
      goodType = "1"
    } else if (goodType === "捡到") {
      goodType = "2"
    }
    var data = {
      adderMobile: adderMobile,
      adderName: adderName,
      goodDetail: goodDetail,
      goodPosition: goodPosition,
      goodTitle: goodTitle,
      goodType: goodType,
      image: imageUrl,
      openid: openid,
      goodStatus: "02",
      status: "1"
    }
    this.setData({
      subData : data,
      dialogFlag: true
    })
  },
  onConfirmTap: function() {
    var that = this;
    var url = app.globalData.baseUrl + '/portal/lostgood/add.do';
    var header = app.globalData.header;
    var data = that.data.subData;
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
    this.data.dialogFlag = false;
  },
  onCancelTap: function(){
    this.data.dialogFlag = false; 
  },
  successCallBack: function(res) {
    if (res.status == app.globalData.successCode) {
      app.showLoadToast("发布成功", "success", 1500, this.succCall);
    } else {
      app.showLoadToast("失败请重试", "error", 1500);
    }
  },
  failCallBack: function(res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  succCall: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      flag: true
    });
    wx.navigateBack({
      delta: 1
    })
  },
  checkReq: function(e, text) {
    if (e === "" || e == null) {
      app.showLoadMessage('success', 1500, 'warning', text);
      return false;
    }
    return true;
  },
  chooseImage: function(e) {
    //console.log(e);
    var that = this;
    var tempPath = e.detail.current;
    var url = app.globalData.baseUrl + '/portal/image/upload';
    wx.uploadFile({
      url: url, //仅为示例，非真实的接口地址
      filePath: tempPath[0],
      name: 'file',
      formData: {
        'imageType': '3'
      },
      success(res) {
        var data = JSON.parse(res.data);
        if (data.status == app.globalData.successCode) {
          that.data.imageUrl[0] = data.data;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  }
})