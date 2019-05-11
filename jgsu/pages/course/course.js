// pages/course/course.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewState:'',
    arrayWeek: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    arrayYear: ["2017-2018-2","2018-2019-1"],
    objectArray: [
      {
        id: 0,
        name: '2017-2018-2'
      },
      {
        id: 1,
        name: '2018-2019-1'
      }
    ],
    indexWeek: 0,
    indexYear:1,
    currentYear:'',
    currentWeek:'',
    weekData: [
      {
        week: 1,
        name: '周一',
        status:false
      },
      {
        week: 2,
        name: '周二',
        status: false
      },
      {
        week: 3,
        name: '周三',
        status: false
      },
      {
        week: 4,
        name: '周四',
        status: false
      },
      {
        week: 5,
        name: '周五',
        status: false
      },
      {
        week: 6,
        name: '周六',
        status: false
      },
      {
        week: 0,
        name: '周日',
        status: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#33ccff',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var url = app.globalData.baseUrl + '/portal/course/currentWeekYear.do';
    var header = app.globalData.header;
    util.http(url, 'POST', null, header, this.successCallBack, this.failCallBack);
    var that = this;
    var weekData = [];
    that.setData({
      weekData: that.data.weekData
    });
  },
  oneWeekCourse:function(e){
    var that = this;
    var currentYear = that.data.currentYear;
    var currentWeek = that.data.currentWeek;
    var week = e.currentTarget.dataset.week;
    var weekData = that.data.weekData;
    var viewState = that.data.viewState;
    that.getOneDayCourse(currentYear, currentWeek, week, viewState);
    /*var url = app.globalData.baseUrl + '/portal/course/courseList.do';
    var header = app.globalData.header;
    var data = {
      currentYear: currentYear,
      currentWeek: currentWeek,
      week: week
    }
    util.http(url, 'POST', data, header, this.successGetCourseCallBack, this.failCallBack);
    app.showLoadToast('加载中', 1300);*/
    //改变颜色weekData
    for (var i = 0; i < weekData.length; i++) {
      if (weekData[i].week == week) {
        weekData[i].status = true;
        continue;
      }
      weekData[i].status = false;
    }
    that.data.weekData = weekData;
  },
  successCallBack: function (res) {
    if (!app.checkLoginStatus(res)) {
      return;
    }
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this
      var currentYear = res.data.currentYear;
      var currentWeek = res.data.currentWeek;
      var viewState = res.data.viewState;
      var indexWeek = that.data.indexWeek;
      var indexYear = that.data.indexYear;
      that.data.currentYear = currentYear;
      that.data.currentWeek = currentWeek;
      //循环定位当前学年周次
      for (var i = 0; i < that.data.arrayWeek.length;i++){
        if (currentWeek == that.data.arrayWeek[i]){
          indexWeek = i;
        }
      }
      for (var i = 0; i < that.data.arrayYear.length; i++) {
        if (currentYear == that.data.arrayYear[i]) {
          indexYear = i;
        }
      }
      that.setData({
        currentYear: currentYear,
        currentWeek: currentWeek,
        indexWeek: indexWeek,
        indexYear:indexYear,
        viewState: viewState
      });
      //获取当前周几
      var week = new Date().getDay();
      that.data.index = parseInt(week)-1;
      var weekData = that.data.weekData;
      //改变颜色weekData
      for (var i = 0; i < weekData.length; i++) {
        if (weekData[i].week == week) {
          weekData[i].status = true;
          continue;
        }
        weekData[i].status = false;
      }
      that.data.weekData = weekData;
      that.getOneDayCourse(currentYear, currentWeek, week, viewState);
      //查询当天课表
      /*var url = app.globalData.baseUrl + '/portal/course/courseList.do';
      var header = app.globalData.header;
      var data = {
        currentYear: currentYear,
        currentWeek: currentWeek,
        week:week
      }
      util.http(url, 'POST', data, header, this.successGetCourseCallBack, this.failCallBack);
      app.showLoadToast('加载中', 1300);*/
    } else {
      wx.hideToast();
      app.showErrorModal('获取当前学期、周次异常', '错误');
    }
  },
  successGetCourseCallBack:function(res){
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var that = this
      var weekData = [];
      var courseList = [];
      that.setData({
        courseList:res.data,
        weekData:that.data.weekData
      });
    } else {
      wx.hideToast();
      app.showErrorModal('获取当天课表异常', '错误');
    }
  },
  failCallBack: function (res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  bindPickerChangeWeek :function(e){
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var currentWeek = that.data.arrayWeek[e.detail.value];
    var currentYear = that.data.currentYear;
    var weekData = that.data.weekData;
    var week = 1;
    var viewState = that.data.viewState;
    that.data.currentWeek = currentWeek;
    that.setData({
      currentWeek: currentWeek,
      indexWeek: e.detail.value
    });
    that.getOneDayCourse(currentYear, currentWeek, week, viewState);
    //改变颜色weekData
    for (var i = 0; i < weekData.length; i++) {
      if (weekData[i].week == week) {
        weekData[i].status = true;
        continue;
      }
      weekData[i].status = false;
    }
    that.data.weekData = weekData;
  },
  bindPickerChangeYear: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var currentYear = that.data.arrayYear[e.detail.value];
    var currentWeek = that.data.currentWeek;
    var weekData = that.data.weekData;
    var viewState = that.data.viewState;
    var week = 1;
    that.data.currentYear = currentYear;
    that.setData({
      currentYear: currentYear,
      indexYear: e.detail.value
    });
    that.getOneDayCourse(currentYear, currentWeek, week, viewState);
    //改变颜色weekData
    for (var i = 0; i < weekData.length; i++) {
      if (weekData[i].week == week) {
        weekData[i].status = true;
        continue;
      }
      weekData[i].status = false;
    }
    that.data.weekData = weekData;
  },
  /**
   * 获取某年某周某天课表
   */
  getOneDayCourse: function (currentYear, currentWeek, week, viewState){
    var url = app.globalData.baseUrl + '/portal/course/courseList.do';
    var header = app.globalData.header;
    var data = {
      currentYear: currentYear,
      currentWeek: currentWeek,
      week: week,
      viewState: viewState
    }
    util.http(url, 'POST', data, header, this.successGetCourseCallBack, this.failCallBack);
    app.showLoadToast('加载中', 2000);
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