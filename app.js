const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

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

const methodOverirde = require('method-override')
app.use(methodOverirde('_method'))
//引用路由器
const routes = require('./routes')
app.use(routes)

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})