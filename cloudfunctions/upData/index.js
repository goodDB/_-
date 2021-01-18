const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
      try {
        return await db.collection('user').doc(event.id).update({
          data: {
            productionImage: _.push({name:event.name,number:event.number})
          }
        })
        } catch(res) {
          console.error(res)
        }
}