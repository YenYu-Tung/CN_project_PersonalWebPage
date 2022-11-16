const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({userId})
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})
router.get('/videos', (req, res) => {
  res.render('videos')
})
router.get('/musics', (req, res) => {
  res.render('musics')
})

module.exports = router