// pages/map/map.js
var mapData = require('../../resources/map_data')
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    polyline: [],
    currentTab: '00',
    mapStatus: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var url = app.globalData.baseUrl + '/portal/map/group/list.do';
    var header = app.globalData.header;
    var status = '1'; //有效数据
    var data = {
      status: status
    };
    util.http(url, 'POST', data, header, this.groupSuccessCallBack, this.failCallBack);
  },
  groupSuccessCallBack: function(res) {
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var groupData = res.data;
      //增加全部选项
      var all = {
        createTime: '',
        mapGroupDesc: "全部",
        mapGroupId: "00",
        mapGroupName: "全部",
        modifiedTime: '',
        pkId: 1,
        status: "1"
      }
      groupData.push(all);
      groupData.reverse();
      this.setData({
        groupData: groupData
      })
      //获取全部的坐标数据
      var url = app.globalData.baseUrl + '/portal/map/point/list.do';
      var status = '1'; //有效数据
      var pointType = '0'; //普通点
      var data = {
        status: status,
        pointType: pointType
      };
      this.getOneTypePointList(url, data);
    } else {
      wx.hideToast();
      app.showErrorModal('获取失败请重试', '获取失败');
    }
  },
  failCallBack: function(res) {
    wx.hideToast();
    app.showErrorModal('系统异常，联系管理员', '错误');
  },
  getPolyline: function(pointData) {
    var polylines = [];
    var polylinePointList = [];
    var polyline = {};
    for (var item of pointData) {
      var latitude = item.mapPointLatitude;
      var longitude = item.mapPointLongitude;
      var polylinePoint = {
        latitude: latitude,
        longitude: longitude
      }
      polylinePointList.push(polylinePoint);
    }
    polyline = {
      points: polylinePointList,
      color: '#ff0000dd',
      width: 5,
      dottedLine: true,
      arrowLine: true
    }
    polylines.push(polyline);
    return polylines;
  },
  getMarkers: function(pointData) {
    var markers = [];
    this.setData({
      mapStatus: false
    })
    for (var onePoint of pointData) {
      //if (mapType==='00'||mapType === item.groupId){
      //for (var onePoint of item) {
      var marker = this.createMarker(onePoint);
      markers.push(marker)
      //}
      //}
    }
    return markers;
  },
  createMarker(point) {
    var latitude = point.mapPointLatitude;
    var longitude = point.mapPointLongitude;
    var callout = {
      content: point.mapPointName,
      display: 'ALWAYS',
      textAlign: 'center',
      padding: 5
    }
    var marker = {
      iconPath: "/images/map/location.png",
      id: point.id || 0,
      name: point.mapPointName || '',
      latitude: latitude,
      longitude: longitude,
      callout: callout
    };
    return marker;
  },
  //滑动切换
  swiperTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  //点击切换
  clickTab: function(e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.data.markers = [];
      that.data.mapStatus = false;
      var mapGroupId = e.target.dataset.current;
      if (mapGroupId=='00'){
        mapGroupId = '';
      }
      //获取全部的坐标数据
      var url = app.globalData.baseUrl + '/portal/map/point/list.do';
      var status = '1'; //有效数据
      var pointType = '0'; //普通点 
      var data = {
        status: status,
        pointType: pointType,
        mapGroupId: mapGroupId
      };
      this.getOneTypePointList(url, data);
      that.setData({
        currentTab: e.target.dataset.current,
        mapStatus: true
      })

    }
  },
  /**
   * 获取某个分类的坐标点集合
   */
  getOneTypePointList: function(url, data) {
    var header = app.globalData.header;
    var status = '1'; //有效数据
    util.http(url, 'POST', data, header, this.pointSuccessCallBack, this.failCallBack);
  },
  pointSuccessCallBack: function(res) {
    var that = this;
    if (res.status == app.globalData.successCode) {
      //console.log(res);
      var pointData = res.data;
      var pointType = pointData[0].pointType;
      if (pointType == '0') {
        //普通点
        that.data.markers = [];
        that.setData({
          mapStatus: true,
          markers: this.getMarkers(pointData)
          
        })
      } else {
        that.setData({
          polyline: this.getPolyline(pointData),
        })
      }

    } else {
      wx.hideToast();
      app.showErrorModal('获取失败请重试', '获取失败');
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapCtx = wx.createMapContext('jgsuMap');
    //获取线路
    var status = '1'; //有效数据
    var lineUrl = app.globalData.baseUrl + '/portal/map/point/list.do';
    var pointType = '1'; //普通点
    var lineData = {
      status: status,
      pointType: pointType
    };
    this.getOneTypePointList(lineUrl, lineData);
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