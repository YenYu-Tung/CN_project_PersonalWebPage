//總路由器
const express = require('express')
const router = express.Router()
// 掛載 middleware
const { authenticator } = require('../middleware/auth')  

//引入home, 加入驗證程序
const home = require('./modules/home')

//引入todos, 加入驗證程序
const todos = require('./modules/todos')
router.use('/todos', authenticator, todos)
//user.js
const users = require('./modules/users')
router.use('/users', users)
//避免無限循環
router.use('/', authenticator, home)

module.exports = router