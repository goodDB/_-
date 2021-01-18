// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('user').add({
    data: {
      user:event.user,
      password:event.password
    },
    success: function(res) {
      console.log(res);
    }
  })

  return  "ok";
}