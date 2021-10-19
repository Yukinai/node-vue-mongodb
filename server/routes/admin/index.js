module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })


  //登陆校验中间件

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })  
  //创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //资源列表
  router.get('/',async(req,res,next)=>{
    const token= String(req.headers.authorization || '').split(' ').pop()
      assert(token,401,'请先登陆')
      const { id } =jwt.verify(token,app.get('secret'))
      assert(id,401,'请先登陆')
      req.user =await AdminUser.findById(id)
      assert(req.user,401,'请先登陆')
      await next();
  } ,async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName) {
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
      }
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  //获取资源
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id).limit(10)
    res.send(model)
  })

//更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
//删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    //根据用户名找用户
    const user = await AdminUser.findOne({
      username
    }).select('+password')
    assert(user, 422, '用户不存在')
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({
      token
    })
  })

  //
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}