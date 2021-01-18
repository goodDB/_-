// 云函数入口文件
const cloud = require('wx-server-sdk')    

cloud.init()

const db = cloud.database();       //创建数据库对象


// 云函数入口函数
exports.main = async (event, context) => {
  const result=  db.collection('user').get()
   return ( await result)                       //异步传输，获得数据后再返回
}