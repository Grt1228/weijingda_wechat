// pages/lostgood/lostgood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [{
      id: '1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      backgroundColor: '#fff',
      time: 1533106010,
      likedCount: 0,
      liked: false,
      user: {
        avatar: '',
        name: 'Minya Chan',
        userId: '1'
      }
    },
    {
      id: '2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      backgroundColor: '#fff',
      time: 1533106010,
      likedCount: 0,
      liked: false,
      user: {
        avatar: '',
        name: 'Minya Chan',
        userId: '1'
      }
    }],
    brick_option: {
      defaultExpandStatus: false,
      ackgroundColor: '#ababab',
      forceRepaint: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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