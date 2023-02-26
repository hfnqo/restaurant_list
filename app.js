const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

// 僅在非正式環境時，使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
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

  res.render('index', { restaurants: filterRestaurants, keyword, searchResult })
})

// 新增一家餐廳
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// 瀏覽特定餐廳
app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 新增餐廳
app.post('/restaurants', (req, res) => {
  const restaurant = req.body

  Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 編輯特定餐廳
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 更新餐廳
app.post('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = req.body
  
  Restaurant.findByIdAndUpdate(restaurantId, restaurantData)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})