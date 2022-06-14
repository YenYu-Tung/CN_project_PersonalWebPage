const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')
mongoose.connect('mongodb+srv://alpha:camp@cluster0.e6ngl.mongodb.net/todo-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended: true}))
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
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({name})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/', (req, res) => {
  res.send('todo-list')
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})