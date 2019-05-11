// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      year: '2018',
      month: '3',
      days: [1, 2, 10, 11, 17, 18, 24, 25, 31]
    }, {
      year: '2018',
      month: '4',
      days: [1, 5, 7, 8, 14, 15, 21, 22, 28, 29]
    }, {
      year: '2018',
      month: '5',
      days: [1, 5, 6, 12, 13, 19, 20, 26, 27]
    }, {
      year: '2018',
      month: '6',
      days: [2, 3, 9, 10, 16, 17, 18, 23, 24, 30]
    }, {
      year: '2018',
      month: '7',
      days: [1, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    }, {
      year: '2018',
      month: '8',
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    }, {
      year: '2018',
      month: '9',
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 22, 23, 24]
    }, {
      year: '2018',
      month: '10',
      days: [1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28]
    }, {
      year: '2018',
      month: '11',
      days: [3, 4, 10, 11, 17, 18, 24, 25]
    }, {
      year: '2018',
      month: '12',
      days: [1, 2, 8, 9, 15, 16, 22, 23, 30, 31]
    }, {
      year: '2019',
      month: '1',
      days: [1, 5, 6, 12, 13, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    }, {
      year: '2019',
      month: '2',
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    }, {
      year: '2019',
      month: '3',
      days: [2, 3, 9, 10, 16, 17, 23, 24, 30, 31]
    }, {
      year: '2019',
      month: '4',
      days: [5, 6, 7, 13, 14, 20, 21, 27, 28]
    }, {
      year: '2019',
      month: '5',
      days: [1, 4, 5, 11, 12, 18, 19, 25, 26]
    }, {
      year: '2019',
      month: '6',
      days: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30]
    }, {
      year: '2019',
      month: '7',
      days: [6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    }],
    background: [
      //'#84e7d0', '#b49eeb', '#f5a8f0','#aad4f5'
      '#ffb366'
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7acfb0',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    //日历样式
    let days_style = new Array;
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var that = this;
    var list = that.data.list;
    var background = that.data.background;
    for (var i = 0; i < list.length; i++) {
      if (list[i].year == year) {
        if (list[i].month == month) {
          for (var j = 0; j < list[i].days.length; j++) {
            var index = Math.floor((Math.random() * background.length));
            var currentColor = background[index];
            days_style.push({
              month: 'current',
              day: list[i].days[j],
              color: 'white',
              background: currentColor
            });
          }
        }
      }
    }
    var that = this;
    that.setData({
      days_style: days_style
    })
  },
  //下个月
  next: function(event) {
    var currentMonth = event.detail.currentMonth;
    var currentYear = event.detail.currentYear;
    this.getShowDate(currentMonth, currentYear);
  },
  //上个月
  prev: function(event) {
    var currentMonth = event.detail.currentMonth;
    var currentYear = event.detail.currentYear;
    this.getShowDate(currentMonth, currentYear);
  },
  getShowDate: function(currentMonth, currentYear) {
    //日历样式
    let days_style = new Array;
    var month = currentMonth
    var year = currentYear
    var that = this;
    var list = that.data.list;
    var background = that.data.background;
    for (var i = 0; i < list.length; i++) {
      if (list[i].year == year) {
        if (list[i].month == month) {
          for (var j = 0; j < list[i].days.length; j++) {
            var index = Math.floor((Math.random() * background.length));
            var currentColor = background[index];
            days_style.push({
              month: 'current',
              day: list[i].days[j],
              color: 'white',
              background: currentColor
            });
          }
        }
      }
    }
    var that = this;
    that.setData({
      days_style: days_style
    })
  },
  getNowTime: function() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()

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