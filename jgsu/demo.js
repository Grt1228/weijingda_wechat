//app.js
App({
  data: {
    openId: "",
    scene: "",
    shareTicket: "",
    sessionkey: "",
    isShow: true,
    islogin: true,
    //  baseUrl: "https://www.everglamming.com/hrym-wechat-web/",
    baseUrl: "http://192.168.1.160:8080/",
  },
  onLaunch: function (ops) {
    console.log("scene=========" + ops.scene);

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
      console.log(" //  请求完新版本信息的回调")
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      console.log(" // 新的版本下载失败")
    })

  },
  onShow: function (ops) {

    //设置常量，page中使用
    this.data.scene = ops.scene;
    this.data.shareTicket = ops.shareTicket;

    var that = this;
    var openid = "";//openid
    var nickName = "";//姓名
    var avatarUrl = "";//头像
    var province = "";//地区
    var platform = "";//设备号
    var v = "";//手机版本号
    var sex = "";//性别
    var sessionkey = "";
    wx.login({
      success: function (res) {
        //获取设备信息
        wx.getSystemInfo({
          success: function (res) {
            platform = res.system;
            that.globalData.platform = res.system;
            v = res.version;
            that.globalData.v = res.version;
          },
        })
        if (res.code) {

          //获取openId
          wx.request({
            url: that.data.baseUrl + 'hrym/program/getSessionkey',
            data: {
              "data": {
                "jscode": res.code
              },
              "header": {
                "appname": "慧修行",
                "platform": platform,
                "v": v
              }
            },
            method: 'POST',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              // console.log(that)
              that.data.sessionkey = openIdRes.data.data.sessionkey;

              that.globalData.sessionkey = openIdRes.data.data.session_key;

              openid = openIdRes.data.data.openid;
              that.data.openId = openIdRes.data.data.openid;
              that.globalData.openid = openIdRes.data.data.openid;
              // 判断openId是否获取成功
              if (openIdRes.data.data.openid != undefined) {
                // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
                //获取姓名等信息
                wx.getUserInfo({
                  success: function (data) {
                    nickName = data.userInfo.nickName;
                    avatarUrl = data.userInfo.avatarUrl;
                    province = data.userInfo.province;
                    sex = data.userInfo.gender;
                    //将信息传给后台
                    wx.request({
                      url: that.data.baseUrl + 'hrym/program/wechatUsersOPt',
                      data: {
                        "cmd": "insertWechatUser",
                        "data": {
                          "openId": openid,
                          "nickName": nickName,
                          "avatarUrl": avatarUrl,
                          "province": province,
                          "sex": sex
                        },
                        "header": {
                          "appname": "慧修行",
                          "platform": platform,
                          "v": v
                        }
                      },
                      method: 'post',
                      header: { 'content-type': 'application/json' },
                      success: function (res) {
                        //网络回滚
                        if (that.requestReadyCallback) {
                          that.requestReadyCallback(res);
                        }
                      },
                      fail: function (error) {
                        console.info("网络错误");
                        console.info(error);
                      }
                    })

                  },
                  fail: function (failData) {
                    console.info("用户拒绝授权");
                    wx.showModal({
                      title: '温馨提示',
                      content: '如不授权，将不能使用此功能',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                          wx.openSetting({
                            success: function (res) {

                              if (!res.authSetting["scope.userInfo"]) {

                                //这里是授权成功之后 填写你重新获取数据的js
                                //参考:
                                that.getLogiCallback('', function () {
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
                    // 
                  }
                });
              } else {
                console.info("获取用户openId失败");
              }

            },

            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      },
      fail: function (err) {
        console.log(that);
        that.data.islogin = false,

          wx.showToast({
            title: '网络异常。。',
            icon: 'loading',
            duration: 10000
          })
      }

    });
  },
  globalData: {
    // baseUrl: "https://www.everglamming.com/hrym-wechat-web/",
    baseUrl: "http://192.168.1.160:8080/",
    sessionkey: "",
    openGId: "",
    openid: "",//用户登陆的openid
    //session_key:"",//用户登陆时候和openid一起获取下来的
    platform: "",//用户手机型号
    v: "",//用户手机版本号
    flag: true,
    aeHttp: function (args, resolve, reject) {
      let param = {
        url: this.baseUrl + "hrym/program/",
        // appkey: '609388a15b3dfaca',
        // masterKey: "",
      };
      wx.request({
        url: param.url + args.url,
        data: args.data,
        method: 'POST',
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          console.log(this)
          reject(err);
        }
      })
    }
  },
  onHide: function () {
    this.globalData.flag = true;
    this.data.scene = "";
    this.data.sessionkey = "";
    this.data.isShow = true;
    // console.log(this.data.scene)
  },

})