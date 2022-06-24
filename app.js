const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

require('./config/mongoose')

const methodOverirde = require('method-override')
app.use(methodOverirde('_method'))
//引用路由器
const routes = require('./routes')
app.use(routes)

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})