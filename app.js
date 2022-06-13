const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb+srv://alpha:camp@cluster0.e6ngl.mongodb.net/todo-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const Todo = require('./models/todo')


const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Todo.find()//取出Todo model的資料
  .lean() //model object turn into JS
  .then(todos => res.render('index', {todos}))
  .catch(error => console.error(error))  
})

app.get('/', (req, res) => {
  res.send('lalala')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})