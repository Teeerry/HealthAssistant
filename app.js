//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
  globalData: {
  //需要显示的问题，以及关于问题指标的描述
    question: [
      {
        "question": "请输入你的腰臀比", //1
        "description": "腰围反映脂肪总量和脂肪分布的综合指标, 臀围反映髋部骨骼和肌肉的发育情况。腰臀比值越大，腰腹或内脏就有可能堆积更多的脂肪。"
      },
      {
        "question": "请输入你的腰围", //2
        "description": "腰围，指的是经脐点的腰部水平围长，是反映脂肪总量和脂肪分布的综合指标，世界卫生组织推荐的测量方法是：被测者站立，双脚分开25至30厘米，体重均匀分配。"
      },
      {
        "question": "请输入你的年龄", //3
        "description": "年龄"
      },
      {
        "question": "请输入你患有高血压的月数", //4
        "description": "高血压（hypertension）是指以体循环动脉血压（收缩压和/或舒张压）增高为主要特征（收缩压≥140毫米汞柱，舒张压≥90毫米汞柱），可伴有心、脑、肾等器官的功能或器质性损害的临床综合征。"
      },
      {
        "question": "请输入你的体重", //5
        "description": "体重"

      },
      {
        "question": "你的家人有任何糖尿病史吗？", //5
        "description": "家庭患病史"

      }
    ],
    //输入处理函数
    Input_handler: ["inputWHR", "inputWaist", "inputAge", "inputHypertension", "inputWeight","inputFamilyHistory"]
  }
})