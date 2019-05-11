

Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: null,
    text: '公告：遵守法律，萨达',
    pace: 1.3, //滚动速度
    interval: 20, //时间间隔
    size: 20, //字体大小in px
    length: 0, //字体宽度
    offsetLeft: 0, //
    windowWidth: 0,
  },
  //查询view的宽度
  queryViewWidth: function(viewId) {
    //创建节点选择器
    return new Promise(function(resolve) {
      var query = wx.createSelectorQuery();
      //选择id
      var that = this;
      query.select('.' + viewId).boundingClientRect(function(rect) {
        resolve(rect.width);
      }).exec();
    });

  },
  //停止跑马灯
  stopMarquee: function() {
    var that = this;
    //清除旧的定时器
    if (that.data != null) {
      clearInterval(that.interval);
    }
  },
  //执行跑马灯动画
  excuseAnimation: function() {
    var that = this;
    if (that.data.length > that.data.windowWidth) {
      //设置循环
      let interval = setInterval(function() {
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
  startMarquee: function() {
    var that = this;
    that.stopMarquee();
    //初始化数据
    that.data.windowWidth = wx.getSystemInfoSync().windowWidth;
    that.queryViewWidth('text').then(function(resolve) {
      that.data.length = resolve;
      console.log(that.data.length + "/" + that.data.windowWidth);
      that.excuseAnimation();
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.startMarquee();
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