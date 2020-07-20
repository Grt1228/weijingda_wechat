// pages/home/new/detail/detail.js
const app = getApp();
var util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneData: {},
    article: {},
    timer: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var daoneDatataTemp = decodeURIComponent(options.oneData); //函数可把字符串作为 URI 组件进行解码。
    var oneData = JSON.parse(daoneDatataTemp);
    this.data.oneData = oneData;
    var that = this;
    that.setData({
      oneData: oneData
    })
    that.getNewData(oneData.newid)
  },
  getNewData: function(newId) {
    var url = app.globalData.baseUrl + '/portal/new/byId';
    var header = app.globalData.header;
    var data = {
      newId: newId
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function(res) {
    if (res.status == app.globalData.successCode) {

      this.initJsonData(res.data.content);
    } else {
      wx.hideToast();
      app.showErrorModal('查询失败请重试', '查询失败');
    }
  },
  failCallBack: function(res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },

  initJsonData: function(data) {
    const _ts = this;
    //将markdown内容转换为towxml数据
    let articleData = app.towxml.toJson(data, 'markdown');
    articleData.theme = 'light';

    //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
    //例如`bind:touchstart`则为：
    this['event_bind_touchstart'] = (event) => {
      console.log(event.target.dataset._el); // 打印出元素信息
    };

    // 给todoList添加监听事件
    this['eventRun_todo_checkboxChange'] = (event) => {
      console.log(event.detail); // todoList checkbox发生change事件
    };

    //设置文章数据，并清除页面loading
    _ts.setData({
      article: articleData
    });
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
    this.getNewData();
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
      title: this.data.oneData.title
    }
  }
})