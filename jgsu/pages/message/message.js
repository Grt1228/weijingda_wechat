// pages/lostgood/lostgood.js 
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: null,
    text: '公告：禁止广告，以及违规文字内容，文明发言，谢谢你的配合！！！!!!!!!!!!!!!!!!!!!!!！',
    pace: 1.0, //滚动速度
    interval: 18, //时间间隔
    size: 20, //字体大小in px
    length: 0, //字体宽度
    offsetLeft: 0, //
    windowWidth: 0,
    showCloser: true,
    styles: {
      backgroundColor: '#eee',
      closerColor: 'red',
      contentColor: 'red',
    },
    dataSet: [],
    brick_option: {
      defaultExpandStatus: true,
      backgroundColor: '',
      forceRepaint: false
    },
    //下拉追加
    pageNum: 1,
    isEmpty:true
  },
  //查询view的宽度
  queryViewWidth: function (viewId) {
    //创建节点选择器
    return new Promise(function (resolve) {
      var query = wx.createSelectorQuery();
      //选择id
      var that = this;
      query.select('.' + viewId).boundingClientRect(function (rect) {
        resolve(rect.width);
      }).exec();
    });

  },
  //停止跑马灯
  stopMarquee: function () {
    var that = this;
    //清除旧的定时器
    if (that.data != null) {
      clearInterval(that.interval);
    }
  },
  //执行跑马灯动画
  excuseAnimation: function () {
    var that = this;
    if (that.data.length > that.data.windowWidth) {
      //设置循环
      let interval = setInterval(function () {
        if (that.data.offsetLeft <= 0) {
          if (that.data.offsetLeft >= -that.data.length) {
            that.setData({
              offsetLeft: that.data.offsetLeft - that.data.pace,
            })
          } else {
            that.setData({
              offsetLeft: that.data.windowWidth,
            })
          }
        } else {
          that.setData({
            offsetLeft: that.data.offsetLeft - that.data.pace,
          })
        }
      }, that.data.interval);
    }
  },
  //开始跑马灯
  startMarquee: function () {
    var that = this;
    that.stopMarquee();
    //初始化数据
    that.data.windowWidth = wx.getSystemInfoSync().windowWidth;
    that.queryViewWidth('text').then(function (resolve) {
      that.data.length = resolve;
      console.log(that.data.length + "/" + that.data.windowWidth);
      that.excuseAnimation();
    });
  },
  addMessage:function(e){
    if (app.data.havaWeChatInfo){
      wx.navigateTo({
        url: 'add/add'
      })
    }else{
      //授权
      app.getWechatInfo(e);
    }
    //获取用户id
    //ajax
  },
  onGotUserInfo: function (e) {
    var havaWeChatInfo = app.data.havaWeChatInfo;
    if (!havaWeChatInfo) {
      //console.log(e)
      app.getWechatInfo(e);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHeadText();
    this.getList();
  },
  getHeadText:function(){
    var that = this;
    var url = app.globalData.baseUrl + '/portal/text/list.do';
    var header = app.globalData.header;
    var status = '1';
    var pageSize = 1;
    var pageNum = 1;
    var textType = '0';
    var data = {
      status: status,
      rows: pageSize,
      page: pageNum,
      textType: textType
    };
    util.http(url, 'POST', data, header, this.headTextSuccessCallBack, this.headTextFailCallBack);
  },
  headTextSuccessCallBack:function(res){
    var that = this;
    var text = '公告：禁止个人广告，以及违规文字内容，文明发言，谢谢你的配合！！！！';
    if (res.status == app.globalData.successCode) {
      console.log(res);
      var text = res.data.list[0].textContext;
    }
    that.setData({
      text:text
    })
  },
  headTextFailCallBack: function (res) {
    var that = this;
    var text = '公告：禁止广告，以及违规文字内容，文明发言，谢谢你的配合！！！！';
    that.setData({
      text: text
    })
  },
  getList:function(){
    var that = this;
    var openid = wx.getStorageSync('weChatOpenId');
    if (openid==null||openid==''|openid==undefined){
      app.getOpenId();
    }
    var url = app.globalData.baseUrl + '/portal/message/list.do';
    var header = app.globalData.header;
    var status = '1';
    var pageSize = 4;
    var pageNum = that.data.pageNum;
    var data = {
      status: status,
      rows: pageSize,
      page: pageNum
    };
    util.http(url, 'POST', data, header, this.successCallBack, this.failCallBack);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  successCallBack: function (res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      //组装数据
      this.getDataSet(res);
    } else {
      wx.hideToast();
      app.showErrorModal('获取失败请重试', '查询失败');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  getDataSet:function(res){
    var that = this;
    var list = res.data.list;
    var dataSet = [];
    for (var item of list){
      var nickName = item.nickName;
      var avatar = item.avatarUrl;
      if (item.incognito!='0'){
        //匿名
        nickName = '匿名者'
        var avatarArray = ['http://p932yy1i1.bkt.clouddn.com/boy1.png',
        'http://p932yy1i1.bkt.clouddn.com/girl2.png',
        'http://p932yy1i1.bkt.clouddn.com/boy2.png',
        'http://p932yy1i1.bkt.clouddn.com/girl1.png']
        avatar = avatarArray[Math.floor((Math.random() * avatarArray.length))];
      }
      //展示点赞逻辑
      var oneLiked = false;
      var likedArray = wx.getStorageSync("likedArray");
      if (likedArray) {
        if (likedArray[item.messageId] == undefined || likedArray[item.messageId] == '' || likedArray[item.messageId]==null){
          //likedArray[item.messageId] = false;
          //wx.setStorageSync("likedArray", likedArray)
        }else{
          oneLiked = likedArray[item.messageId];
          this.setData({
            oneLiked: oneLiked
          })
        }
      } else {
        var likedArray = {};
        likedArray[item.messageId] = false;
        wx.setStorageSync("likedArray", likedArray)
      }
      var oneMessage = {
        id: item.messageId,
        content: item.content,
        //backgroundColor: '#F0F8FF',
        time: item.createTime/1000,
        likedCount: item.likedcount,
        liked: oneLiked,
        user: {
          avatar: avatar,
          username: nickName,
          userId: item.openid
        },
        images: ['http://p932yy1i1.bkt.clouddn.com/index2.jpg']
      }
      dataSet.push(oneMessage);
    }
    var totalDataSet = [];
    if(!that.data.isEmpty){
      totalDataSet = that.data.dataSet.concat(dataSet);
    }else{
      totalDataSet = dataSet;
      that.data.isEmpty = false;
    }
    that.setData({
      dataSet: totalDataSet
    })
    that.data.pageNum += 1;
  },
  handleLike:function(e){
    var that = this;
    var likedArray = wx.getStorageSync("likedArray");
    var messageId = e.detail.card_id;
    var liked = likedArray[messageId];
    var liked = !liked;
    //更新变量
    likedArray[messageId] = liked;
    //更新文章是否的缓存值
    wx.setStorageSync("likedArray", likedArray);
    //设置状态
    var dataSet = that.data.dataSet;
    for (var i = 0; i < dataSet.length; i++) {
      if (dataSet[i].id == messageId) {
        dataSet[i].liked = liked;
      }
    }
    that.setData({
      dataSet: dataSet
    })
    //更新数据库
    that.likedOrUnLiked(liked,messageId);
  },
  likedOrUnLiked:function(liked,messageId){
    var url = '';
    if (liked) {
      //+1
      url = app.globalData.baseUrl + '/portal/message/liked.do';
    } else {
      //-1
      url = app.globalData.baseUrl + '/portal/message/unLiked.do';
    }
    var header = app.globalData.header;
    var data = {
      messageId:messageId
    };
    util.http(url, 'POST', data, header, this.likedOrUnLikedSuccessCallBack, this.failCallBack);
  },
  likedOrUnLikedSuccessCallBack: function (res){
    var that = this;
    if (res.status == app.globalData.successCode) {
      //组装数据
      var dataSet = that.data.dataSet;
      for (var i = 0; i < dataSet.length; i++) {
        var likedCount =res.data.likedCount;
        if (dataSet[i].id == res.data.messageId) {
          dataSet[i].likedCount = res.data.likedcount;
        }
      }
      that.setData({
        dataSet: dataSet
      })
    } else {
      wx.hideToast();
      app.showErrorModal('点赞出错...', '出错了');
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startMarquee();
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
    this.data.pageNum = 1;
    this.data.isEmpty = true;
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底了');
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})