//下面是在云函数端获取一个集合所有记录的例子，因为有最多一次取 100 条的限制，因此很可能一个请求无法取出所有数据，需要分批次取：

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const countResult = await db.collection('user').doc(event.id).get()
  return countResult;
}