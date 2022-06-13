const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb+srv://alpha:camp@cluster0.e6ngl.mongodb.net/todo-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('lalala')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})