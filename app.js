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

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  const restaurant = restaurantList.find(restaurant =>
    restaurant.id.toString() === restaurantId
  )

  res.render('show', { restaurant })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})