// pages/value/value.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice_style:0,
    images:['../image/1.jpg','../image/2.jpg','../image/3.jpg','../image/4.jpg'],
    imgUrl:{},
    conUrl:{},
    goupiao:{},
    goumai_color:'default',
    goumai_set:true,
    id:'',        
    number:''
  },

  choice:function(e){
    this.setData({choice_style:e.currentTarget.id});
  },
  swiperSetId:function(e){
    var page = this ;
    page.setData({choice_style:e.detail.current})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    console.log(options.id)
     page.setData({id:options.id})
    page.getContent();
    page.goupiao();
  },
  getContent:function(){
    var page = this;
    wx.request({

      //猫眼
      // url: 'https://m.maoyan.com/ajax/movieOnInfoList',
      // method:'GET',
      // header:{'content-type': 'application/json'},
      // success:function(res){
      //   console.log(res.data);
      //   var imgUrl = res.data.movieList;      
      //   for(var x=0;x<imgUrl.length;x++){
      //     var setimgurl = imgUrl[x].img.split('/w.h');
      //     imgUrl[x].img = setimgurl[0]+setimgurl[1];
      //   };

      //豆瓣
      url:'https://m.douban.com/rexxar/api/v2/movie/suggestion',
      success:function(res){
        console.log(res.data.items)
        page.setData({imgUrl:res.data.items});
      }
    })
  },
  list_tap:function(e){
    var page = this ;
    var id = e.currentTarget.id;
    console.log(e)
    wx.request({
      url:'https://m.douban.com/rexxar/api/v2/movie/'+id,   //猫眼内容详情api出了点问题
      success:function(res){
        console.log(res.data)
        page.setData({conUrl:res.data,choice_style:1})
      }  
    })  
  },

  //输入购票数量事件
  goumai_input:function(e){
    if(e.detail.value!=''&&e.detail.value>0){
      this.setData({
        number:e.detail.value,
        goumai_color:'primary',
        goumai_set:false
      })
    }
    else{
      this.setData({
        goumai_color:'default',
        goumai_set:true
      })
    }
  },

  goumai_button:function(){
    var page = this ;
    if(Object.keys(page.data.conUrl).length===0){     //Object.keys()返回一个数珠，如果对象为空，数组也为空
                                                      //三个是把等号两边的自动转化成为同一种类型并判断是否相等
      wx.showToast({
        title: '请先在内容页选择电影',
        icon:'none'
      })
    }
    else{
      console.log(this.data.conUrl.title)
    //调用云函数更新购票历史
    wx.cloud.callFunction({
      name:'upData',
      data:{
        id:this.data.id,
        name:this.data.conUrl.title,
        number:this.data.number
      }
    }).then(res=>{
      wx.showToast({
        title: '购买成功',
      })
      page.goupiao();
    }).catch(err=>{
      console.log(err)
      wx.showToast({
        title: '购买失败'+err,
      })
    })
    }

  },
  goupiao:function(){
    wx.cloud.callFunction({
      name:'getgoupiao',
      data:{
        id:this.data.id
      }
    }).then(res=>{
      console.log(res.result.data)
      this.setData({goupiao:res.result.data})
    })
  }
})