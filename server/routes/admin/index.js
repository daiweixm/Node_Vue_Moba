module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const authMid = require('../../middleware/auth')
  const router = express.Router({
    mergeParams: true
  })


  const resourceMid = require('../../middleware/resource')

  // 引用模型
  // POST
  // const Category = require('../../models/Category')

  router.post('/', async (req, res) => {
    // const model = await Category.create(req.body)
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // GET
  router.get('/', async (req, res) => {
    // const items = await Category.find().populate('parent').limit(1000)
    // res.send(items)
    // const modelName = require('inflection').classify(req.params.resource)
    // console.log(modelName)
    // const Model = require(`../../models/${modelName}`)
    const queryOptions = {}
    console.log('GET, req.Model.modelName:', req.Model.modelName)
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(1000)
    res.send(items)
  })

  // GET :id
  router.get('/:id', async (req, res) => {
    // const item = await Category.findById(req.params.id)
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })

  // PUT
  router.put('/:id', async (req, res) => {
    // const item = await Category.findByIdAndUpdate(req.params.id, req.body)
    const item = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(item)
  })

  // DELETE
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
      status: 200
    })
  })

  app.use('/admin/api/rest/:resource',authMid({'secret': app.get('secret')}), resourceMid({'modelname': 'test'}), router)

  //上传文件
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../upload'})
  app.post('/admin/api/upload', authMid({'secret': app.get('secret')}), upload.single('file'),async (req, res) => {
    const file = req.file
    file.url = `http://127.0.0.1:3000/upload/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    // 找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({
      username
    }).select('+password')

    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     msg: '用户不存在'
    //   })
    // }

    console.log(user)
    // 校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    assert(isValid, 422, '密码不正确')
    // if (!isValid) {
    //   return res.status(422).send({
    //     msg: '密码不正确'
    //   })
    // }

    // 返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))

    return res.send({token, msg: '登录成功'})
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      msg: err.message
    })
  })

 
}