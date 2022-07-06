//總路由器
const express = require('express')
const router = express.Router()

//引入home
const home = require('./modules/home')
router.use('/', home)
//引入todos
const todos = require('./modules/todos')
router.use('/todos', todos)
//user.js
const users = require('./modules/users')
router.use('/users', users)

module.exports = router