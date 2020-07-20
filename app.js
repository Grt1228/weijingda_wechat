//app.js
const Towxml = require('/towxml/main'); 
App({
  onLaunch: function() {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //创建一个towxml对象，供其它页面调用
  towxml: new Towxml(),
  globalData: {
    userInfo: null,
    baseUrl: "http://192.168.0.102:8888",
    successCode: "0",
    failCode: "1",
    header: {
      'Cookie': ''
    },
    bookHeader: {
      'Cookie': '',
    },
    hasLogin: false,
    havaWeChatInfo: false,
    havaOpenid: false,
    openId: "",
    scene: "",
    shareTicket: "",
    sessionkey: "",
    isShow: true
  },
  checkLoginStatus: function(res) {
    if (res.status == '10') {
      wx.hideToast();
      this.showErrorModal(res.msg, '提示');
      this.globalData.hasLogin = false;
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return false;
    } else if (res.status == '20') {
      wx.hideToast();
      this.showErrorModal(res.msg, '提示');
      return false;
    }
    return true;
  },
  onShow: function() {
    this.checkSessionYesOrNo();
  },
  checkSessionYesOrNo: function() {
    var that = this;
    wx.checkSession({
      success: function() {
        console.log("yes")
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("no")
        that.getOpenId();
      }
    })
  },

  getOpenId: function() {
    //设置常量，page中使用
    //this.data.scene = ops.scene;
    //this.data.shareTicket = ops.shareTicket;
    var that = this;
    var openid = ""; //openid
    var nickName = ""; //姓名
    var avatarUrl = ""; //头像
    var province = ""; //地区
    var platform = ""; //设备号
    var v = ""; //手机版本号
    var sex = ""; //性别
    var sessionkey = "";
    wx.login({
      success: function(res) {
        //获取设备信息
        wx.getSystemInfo({
          success: function(res) {
            platform = res.system;
            that.globalData.platform = res.system;
            v = res.version;
            that.globalData.v = res.version;
          },
        })
        if (res.code) {
          //获取openId
          wx.request({
            url: that.globalData.baseUrl + '/portal/user/getWechatInfo.do',
            data: {
              "jscode": res.code,
              "appName": "微井大",
              "platform": platform,
              "v": v,
              "type": "WX"
            },
            method: 'POST',
            success: function(openIdRes) {
              //console.log(that);
              //console.log(openIdRes);
              that.globalData.sessionkey = openIdRes.data.data.sessionKey;
              openid = openIdRes.data.data.openId;
              that.globalData.openId = openid;
              that.globalData.havaOpenid = true;
              var weChatOpenId = openid;
              wx.setStorage({
                key: 'weChatOpenId',
                data: weChatOpenId
              })
              // 判断openId是否获取成功
              if (openIdRes.data.data.openId != undefined) {} else {
                console.info("获取用户openId失败");
              }
            },
            fail: function(error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      },
      fail: function(err) {
        console.log(that);
        wx.showToast({
          title: '网络异常。。',
          icon: 'loading',
          duration: 10000
        })
      }
    });
  },
  getWechatInfo: function(e) {
    var that = this;
    var weChatOpenId = wx.getStorageSync('weChatOpenId');
    if (weChatOpenId !== null && weChatOpenId !==undefined){
      that.globalData.havaOpenid = true;
    }
    that.globalData.openId = weChatOpenId;
    var openId = weChatOpenId; //openid
    var nickName = ""; //姓名
    var avatarUrl = ""; //头像
    var country = ""; //地区
    var platform = ""; //设备号
    var v = ""; //手机版本号
    var gender = ""; //性别
    if (e.detail.errMsg == 'getUserInfo:ok') {
      //seccess
      nickName = e.detail.userInfo.nickName;
      avatarUrl = e.detail.userInfo.avatarUrl;
      country = e.detail.userInfo.country;
      gender = e.detail.userInfo.gender;
      wx.setStorage({
        key: 'userWechatInfo',
        data: e.detail.userInfo,
      })
      //将信息传给后台
      wx.request({
        url: that.globalData.baseUrl + '/portal/user/saveWechatInfo.do',
        data: {
          "openId": openId,
          "nickName": nickName,
          "avatarUrl": avatarUrl,
          "country": country,
          "gender": gender,
          "appname": "微井大",
          "platform": platform,
          "v": v
        },
        method: 'post',
        success: function(res) {
          //网络回滚
          if (res.data.status == that.globalData.successCode) {
            that.globalData.havaWeChatInfo = true;
          }
        },
        fail: function(error) {
          console.info("网络错误");
          console.info(error);
        }
      })
    } else {
      //失败
      console.info("用户拒绝授权");
      wx.showModal({
        title: '温馨提示',
        content: '如不授权，将不能使用此功能',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.openSetting({
              success: function(res) {
                if (!res.authSetting["scope.userInfo"]) {
                  //这里是授权成功之后 填写你重新获取数据的js
                  //参考:
                  that.getLogiCallback('', function() {
                    callback('')
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  showErrorModal: function(content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, icon, duration,succCall) {
    wx.lin.showToast({
      title: title,
      icon: icon,
      success: (res) => {
        succCall()
      },
      complete: (res) => {
        console.log(res)
      }
    })
  },
  showLoadMessage: function(type, duration, icon, content) {
    wx.lin.showMessage({
      type: type,
      duration: duration,
      icon: icon,
      content: content
    })
  }
})