const express = require('express')
const { engine } = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

const app = express()
const port = 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})