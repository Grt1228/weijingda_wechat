const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(url, method, data, header, successCallBack, failCallBack) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      successCallBack(res.data)
    },
    fail: function (res) {
      failCallBack(res.data)
    }
  })
}

function isLogin(hasLogin) {
  if (hasLogin == false) {
    wx.navigateTo({
      url: '/pages/home/home'
    })
    return false;
  }
}

module.exports = {
  formatTime: formatTime,
  http: http,
  isLogin: isLogin
}
