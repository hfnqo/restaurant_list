const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})