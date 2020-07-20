// pages/home/libsear/libsear.js

var util = require('../../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    keyWord: "",
    bookData: [],
    show: false,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  search: function(e){ 
    var title = "";
    if ( e === undefined) {
      title = this.data.keyWord;
    }else{
      if (e.detail.detail.value === ""){
        app.showLoadToast("图书名称为空", "error", 1500);
        return;
      }
      title = e.detail.detail.value;
      this.data.keyWord = e.detail.detail.value;
      this.data.pageIndex = 1;
      this.data.bookData = [];
      this.data.loading = true;
    }
    var url = app.globalData.baseUrl + '/portal/book/bookSearch.do';
    var header = app.globalData.header;
    var data = {
      searchKey: title,
      searchType: 'title',
      pageIndex: this.data.pageIndex
    }
    app.showLoadToast("加载中~~~", 
          "loading",
          1300,
          util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack)
         );
  },

  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this;
      var books = res.data;
      if (books.length == 0 && this.data.bookData.length > 0){
        this.data.pageIndex = -1;
      } else if (books.length == 0 && this.data.bookData.length == 0){
        app.showLoadToast("没有检索到此书，确认名称", "success", 2000);
      }
      that.data.bookData = that.data.bookData.concat(books);
      var totalBook = that.data.bookData;
      that.setData({
        books: totalBook
      })
    } else {
      app.showLoadToast("检索出错，请重试", "error", 1500);
    }
  },
  failCallBack: function (res) {
    app.showLoadToast("检索出错", "error", 1500);
  },
  detail: function(e){
    //e.target.dataset
    var oneData = JSON.stringify(e.target.dataset);//函数可把字符串作为 URI 组件进行编码
    wx.navigateTo({
      url: '../libsear/detail/detail?oneData=' + oneData 
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
    if (this.data.loading && this.data.pageIndex > 0 ) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        this.setData({
          show: false
        })
        this.data.pageIndex += 1;
        this.search();
      }, 800)
      
    }
    if (this.data.loading && this.data.pageIndex == -1 ) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        this.setData({
          show: true,
          type: 'end',
          loading: false
        })
      }, 1000)
      return;
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})