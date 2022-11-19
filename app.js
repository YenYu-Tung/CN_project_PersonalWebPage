const express = require('express')
const session = require('express-session')
const app = express()
const usePassport = require('./config/passport')

require('dotenv').config()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

require('./config/mongoose')

//express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//passport
usePassport(app)
//connect-flash
const flash = require('connect-flash')
app.use(flash())

//設定本地變數 
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

const methodOverirde = require('method-override')
app.use(methodOverirde('_method'))
//引用路由器
const routes = require('./routes')
app.use(routes)

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')



app.listen(PORT, () => {
  console.log("Server is running!")
})

// Export the Express API
module.exports = app;