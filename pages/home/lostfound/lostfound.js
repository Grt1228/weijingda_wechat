// pages/home/lostfound/lostfound.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '【注意啦】：收到陌生人来电或短信，微信等信息，凡是涉及到金钱的，请同学们提高200%警惕，防止上当受骗！！！下滑刷新，上拉加载~~',
    tabData: [{
      name: "捡",
      type: "1"
    }, {
      name: "丢",
      type: "2"
    }],
    currentGoodType: "1",
    lostPageNum: 1,
    foundPageNum: 1,
    pageSize: 6,
    show: false,
    loading: true,
    lostGoodData: [],
    foundGoodData: [],
    lostLoading: true,
    foundLoading: true
  },
  addMessage: function (e) {
    var havaWeChatInfo = app.globalData.havaWeChatInfo;
    var havaOpenid = app.globalData.havaOpenid;
    var weChatOpenId = wx.getStorageSync("weChatOpenId");
    var userWechatInfo = wx.getStorageSync("userWechatInfo");
    if ((havaWeChatInfo && havaOpenid) || (weChatOpenId !== "" && userWechatInfo !== "")) {
      wx.navigateTo({
        url: 'add/add'
      })
    } else {
      app.showLoadToast("没有授权或授权过期请点击微信按钮授权", "error", 1500);
    }
    //获取用户id
    //ajax
  },
  onGotUserInfo: function (e) {
    var havaWeChatInfo = app.globalData.havaWeChatInfo;
    var havaOpenid = app.globalData.havaOpenid;
    var weChatOpenId = wx.getStorageSync("weChatOpenId");
    var userWechatInfo = wx.getStorageSync("userWechatInfo");
    if (!havaWeChatInfo) {
      app.getWechatInfo(e);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onLoadFun();
  },

  onLoadFun: function() {
    var that = this;
    var openid = wx.getStorageSync('weChatOpenId');
    if (openid == null || openid == '' | openid == undefined) {
      app.getOpenId();
    }
    var url = app.globalData.baseUrl + '/portal/lostgood/list';
    var header = app.globalData.header;
    var status = '1';
    var pageNum = that.data.foundPageNum;
    var pageSize = that.data.pageSize;
    var data = {
      status: status,
      pageSize: pageSize,
      pageNum: pageNum,
      goodType: that.data.currentGoodType
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  successCallBack: function(res) {
    if (res.status == app.globalData.successCode) {
      if (this.data.currentGoodType === "1") {
        if (res.data.list.length > 0) {
          var d = res.data.list;
          var temp = this.data.foundGoodData.concat(d);
          this.setData({
            foundGoodData: temp
          })
          if (!res.data.isLastPage){
            this.setData({
              foundPageNum: this.data.foundPageNum+1
            })
          } else {
            this.data.foundPageNum = -1;
          }
          
        } else {
          this.data.foundPageNum = -1;
        }

      } else if (this.data.currentGoodType === "2") {
        if (res.data.list.length > 0) {
          var d = res.data.list;
          var temp = this.data.lostGoodData.concat(d);
          this.setData({
            lostGoodData: temp,
          })
          if (!res.data.isLastPage) {
            this.setData({
              lostPageNum: this.data.lostPageNum + 1
            })
          } else {
            this.data.lostPageNum = -1;
          }
        } else {
          this.data.lostPageNum = -1;
        }

      }
    } else {
      app.showLoadToast("获取失败请重试", "error", 1500);
    }
  },
  failCallBack: function(res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  clickTab: function(e) {
    var that = this;
    var status = '1';
    var pageSize = that.data.pageSize;
    var pageNum = null;
    if (that.data.currentGoodType === e.detail.activeKey) {
      return false;
    } else {
      if (e.detail.activeKey === "2") {
        if (that.data.lostGoodData.length > 0) {
          that.setData({
            currentGoodType: e.detail.activeKey
          })
          return false;
        }
        pageNum = this.data.lostPageNum;
      } else {
        if (that.data.foundGoodData.length > 0) {
          that.setData({
            currentGoodType: e.detail.activeKey
          })
          return false;
        }
        pageNum = this.data.foundPageNum;
      }
      //获取全部的坐标数据
      var status = '1'; //有效数据
      var pointType = '0'; //普通点 
      var data = {
        status: status,
        pageSize: pageSize,
        pageNum: pageNum,
        goodType: e.detail.activeKey
      };
      that.getOneTypeList(data)
      that.setData({
        currentGoodType: e.detail.activeKey
      })
    }
  },
  /**
   * 获取某个分类的坐标点集合
   */
  getOneTypeList: function(data) {
    var url = app.globalData.baseUrl + '/portal/lostgood/list';
    var header = app.globalData.header;
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  detail: function(e) {
    //console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../lostfound/detail/detail?id=' + id //传递参数
    })
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
    var flag = this.data.flag;
    if (flag) {
      this.setData({
        lostPageNum: 1,
        foundPageNum: 1,
        lostGoodData: [],
        foundGoodData: [],
        flag: false,
        lostLoading: true,
        foundLoading: true
      })
      this.onLoadFun();
    }
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      that.setData({
        lostPageNum: 1,
        foundPageNum: 1,
        lostGoodData: [],
        foundGoodData: [],
        flag: false,
        lostLoading: true,
        foundLoading: true
      })
      that.onLoadFun();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;

    if (that.data.currentGoodType === "2") {
      that.loadMoreData(that.data.lostLoading,that.data.lostPageNum,"2");
    } else {
      that.loadMoreData(that.data.foundLoading,that.data.foundPageNum,"1");
    }
  },

  loadMoreData: function(loading, pageNum, goodType) {
    if (loading && pageNum > 0) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        if (goodType === "2"){
          this.setData({
            show: false
          })
        }else{
          this.setData({
            show: false
          })
        }
        var data = {
          status: '1',
          pageSize: this.data.pageSize,
          pageNum: pageNum,
          goodType: goodType
        };
        this.getOneTypeList(data);
      }, 900)

    }
    if (loading && (pageNum == -1 || pageNum == 0)) {
      this.setData({
        show: true,
        type: 'loading'
      })
      setTimeout(() => {
        if (goodType === "2") {
          this.setData({
            show: true,
            type: 'end',
            lostLoading: false
          })
        } else {
          this.setData({
            show: true,
            type: 'end',
            foundLoading: false
          })
        }
        
      }, 900)
      return;
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})