var cloud = wx.cloud      

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    password:'',
    id:''
  },
  //登录按钮事件
  sign_button:function(){
    cloud.callFunction({
      name:"sign_button_getData"
    }).then(res=>{ 
      wx.showLoading({
        title: '登录中',
      })
      
       for(var x=0;x<res.result.data.length;x++)
       {
         if(this.data.user==res.result.data[x].user&&this.data.password==res.result.data[x].password)
         {
           this.setData({id:res.result.data[x]._id})
           console.log("ok")
           wx.navigateTo({
             url: '../value/value?id='+this.data.id,
           })
         }
       }

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    });


    //直接查询云存储 errmsg:ok
    // const db = cloud.database();       //创建数据库对象
    // db.collection('news').get({
    //   success:res=>{
    //     var reset = res.data[0];      //必须要指定某个下标来指定是哪个数据[0]，否者全部数据都赋值，    
    //     console.log(reset);           //要是想输出集合的全部数据，可以使用for循环(用法跟Java的一样),来进行指定属性的循环输出
    //     console.log(reset.password);   //指定变量的属性必须要指定哪个数据[0]才能打印出数据，否者系统会返回：undefined（未定义数据
        
    //       console.log('password:\t'+reset.password+'\nuser:\t'+reset.user )
    //   }
    // })

    
      

  },
  
    //注册按钮事件
    register_button:function(){
      var page  = this ; 
      var dl = "no";
      cloud.callFunction({
        name:"sign_button_getData"
      }).then(res=>{ 
        wx.showLoading({
          title: '加载中',
        })
        
         for(var x=0;x<res.result.data.length;x++)
         {
           console.log(this.data.user==res.result.data[x].user)
           if(this.data.user==res.result.data[x].user)
           {
             console.log("账号已存在");
             dl="yes";
           }
         }
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        if(dl=="yes"){
          wx.showToast({
            title: '账号已存在',
            icon:'none'
          })
        }
        else{
          if(this.data.user.length<=0){
            wx.showToast({
              title: '请输入账号',
              icon:'none'
            })
          }
          else{
            if(this.data.password.length<=0){
              wx.showToast({
                title: '请输入密码',
                icon:'none'
              })
            }
            else{
              wx.showToast({
                title: '正在注册',
                icon:'none'
              })
              cloud.callFunction({
                name:'addData',
                data:{
                  user:page.data.user,
                  password:page.data.password
                },
                sunccess:function(res){
                  wx.showLoading({
                    title: '注册成功',
                  })
                  console.log(res)
                }
              })
            }
          }

        }
      });


    },



  input_user:function(e){
      this.setData({user:e.detail.value})
  },
  
  input_password:function(e){
      this.setData({password:e.detail.value})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
})