module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://iyysz.imwork.net:27017/node-vue-moba', {
    useNewUrlParser: true
  })
}