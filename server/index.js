const express = require('express')
const app = express()
app.set('secret', '12sdq2')
// 跨域
app.use(require('cors')())

// 中间件
app.use(express.json())

app.use('/upload', express.static(__dirname + '/upload'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)

// 测试数据路由
require('./routes/web/index')(app)
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000 running')
})