const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

// 僅在非正式環境時，使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword.trim()) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword.trim()
  let filterRestaurants = restaurantList.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
    restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
    restaurant.category.includes(keyword)
  )

  let searchResult = ''
  if (filterRestaurants.length <= 0) {
    searchResult = `找不到符合搜尋字詞「${keyword}」`
  } else {
    searchResult = `找到 ${filterRestaurants.length} 筆 符合搜尋字詞「${keyword}」`
  }

  res.render('index', { restaurants: filterRestaurants, keyword: keyword, searchResult: searchResult })
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