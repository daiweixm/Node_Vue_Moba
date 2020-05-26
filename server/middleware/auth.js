module.exports =  options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  return async(req, res, next) => {
    authorization = req.headers.authorization
    console.log('authorization:', authorization)
    assert(authorization, 401, '请先登录')

    const token = String(req.headers.authorization || '').split(' ').pop()
    console.log('token:', token)
    assert(token, 401, 'token过期或丢失，请重新登录')
    // 验证登录数据
    const tokenData = jwt.verify(token,options.secret)
    console.log('tokenData:', tokenData)
    assert(tokenData, 401, '无效的jwt tokendata')
    const { id } = tokenData
    assert(id, 401, 'id无效')
    const user = await AdminUser.findById(id)
    req.user = user
    assert(req.user, 401, '请先登录')

    next()
  }
}