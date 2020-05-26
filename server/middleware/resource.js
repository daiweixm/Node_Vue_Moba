module.exports = options => {
  return async (req, res, next) => {
    console.log('options:', options.modelname)
    const modelName = require('inflection').classify(req.params.resource)
    console.log('Model Name: ', modelName)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}