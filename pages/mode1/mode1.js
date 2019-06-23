// mode1.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    WHR: 0,
    Waist: 0,
    Age: 0,
    Hypentension: 0,
    Weight: 0,
    //
    Question: app.globalData.question[0].question,
    Description: app.globalData.question[0].description,
    Inputhandler: app.globalData.Input_handler[0],
    //
    Risk: 0,
    Progress: 0, //0 1 2 3 对应四种问题
    CurrentState: 0,
    Empty: ''
  
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
  
  },
  /**
   * 自定义事件函数
   */
  //读取输入的数据
  //1-1
  inputWHR: function (e) {
    this.setData({
      WHR: e.detail.value
    })
  },
  //1-2
  inputWaist: function (e) {
    this.setData({
      Waist: e.detail.value
    })   
  },
  //1-3
  inputAge: function (e) {
    this.setData({
      Age: e.detail.value
    })
  },
  //1-4
  inputHypertension: function (e) {
    this.setData({
      Hypentension: e.detail.value
    })
  },
  //1-5
  inputWeight: function (e) {
    this.setData({
      Weight: e.detail.value
    })   
  },

  //按钮处理函数，更新页面，跳转结果
  //这里的CurrentState实质上已经更新为下一个状态
  nextbutton: function (e) {
    //state 0
    if (this.data.CurrentState == 0) {
      if (this.data.WHR < 0.89) {
        this.data.CurrentState = 1
      }
      else {
        this.data.CurrentState = 2
      }
    }
    //state 24
    else if (this.data.CurrentState == 24) {
      if (this.data.WHR >= 0.94) {
        this.data.Risk = 1
      }
      else if (this.data.Age < 62.5) {
        this.data.Risk = 0
      }
      else {
        this.data.Risk = 1
      }
      this.data.CurrentState = 6
    }
    // state 1
    else if (this.data.CurrentState == 1) {
      if (this.data.Waist < 81.25) {
        this.data.Risk = 0
        this.data.CurrentState = 6
      }
      else {
        this.data.CurrentState = 11
      }
    }
    // state 11
    else if (this.data.CurrentState == 11) {
      if (this.data.Age >= 52.2) {
        this.data.CurrentState == 13
        if (this.data.Waist < 94.5) {
          this.data.Risk = 0
          this.data.CurrentState = 6
        }
        else {
          this.data.Risk = 1
          this.data.CurrentState = 6
        }
      }
      else {
        this.data.CurrentState = 12
      }
    }
    //state 22
    else if (this.data.CurrentState == 22) {
      if (this.data.Age < 46.5) {
        this.data.Risk = 0
        this.data.CurrentState = 6
      }
      else if (this.data.Age < 69.5) {
        this.data.Risk = 0
        this.data.CurrentState = 6
      }
      else if (this.data.Age >= 69.5) {
        this.data.CurrentState = 24
        if (this.data.WHR >= 0.94) {
          this.data.Risk = 1
          this.data.CurrentState = 6
        }
        else {
          this.data.CurrentState = 25
          if (this.data.Age < 62.5) {
            this.data.Risk = 0
            this.data.CurrentState = 6
          }
          else {
            this.data.Risk = 1
            this.data.CurrentState = 6
          }
        }
      }
    }
    // state 12
    else if (this.data.CurrentState == 12) {
      if (this.data.Hypentension < 9) {
        this.data.Risk = 0
        this.data.CurrentState = 6
      }
      else {
        this.data.Risk = 1
        this.data.CurrentState = 6
      }
    }
    //state 2
    else if (this.data.CurrentState == 2) {
      if (this.data.Hypentension >= 6) {
        this.data.Risk = 1
        this.data.CurrentState = 6
      }
      else {
        this.data.CurrentState = 21
      }
    }
    // state 21
    else if (this.data.CurrentState == 21) {
      if (this.data.Weight >= 88.5) {
        this.data.Risk = 1
        this.data.CurrentState = 6
      }
      else {
        this.data.CurrentState = 22
      }
    }
    //
    //更新数据
    this.setData({
      Risk: this.data.Risk,
      CurrentState: this.data.CurrentState
    })
    ///////////////////////////////////////
    //准备输入waist
    if (this.data.CurrentState == 1){
      this.setData({
        Question: app.globalData.question[1].question,
        Description: app.globalData.question[1].description,
        Inputhandler: app.globalData.Input_handler[1],
        Empty:''
      })
    }
    //准备输入age
    else if (this.data.CurrentState == 11 || this.data.CurrentState == 22) {
      this.setData({
        Question: app.globalData.question[2].question,
        Description: app.globalData.question[2].description,
        Inputhandler: app.globalData.Input_handler[2],
        Empty: ''
      })
    }
    //准备输入Hypertension
    else if (this.data.CurrentState == 2 || this.data.CurrentState == 12){
      this.setData({
        Question: app.globalData.question[3].question,
        Description: app.globalData.question[3].description,
        Inputhandler: app.globalData.Input_handler[3],
        Empty: ''
      })
    }
    //准备输入weight
    else if (this.data.CurrentState == 21) {
      this.setData({
        Question: app.globalData.question[4].question,
        Description: app.globalData.question[4].description,
        Inputhandler: app.globalData.Input_handler[4],
        Empty: ''
      })
    }   
    //结束测试
    else if (this.data.CurrentState == 6) {
      wx.navigateTo({
        url: '../result/result'
      })
    }  
  }
})