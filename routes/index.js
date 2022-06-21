//總路由器
const express = require('express')
const router = express.Router()

//引入home
const home = require('./modules/home')
router.use('/', home)
//引入todos
const todos = require('./modules/todos')
router.use('/todos', todos)

module.exports = router