const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
app.get('/search', (req, res) => {
  if (!req.query.keyword.trim()) {
    res.redirect('/')
  }

  const keywords = req.query.keyword.trim()
  const keyword = req.query.keyword.toLowerCase().trim()

  Restaurant.find()
    .lean()
    .then(restaurantData => {
      const filterRestaurants = restaurantData.filter(
        data => 
          data.name.toLowerCase().includes(keyword) || 
          data.name_en.toLowerCase().includes(keyword) || 
          data.category.includes(keyword)
      )
      res.render('index', { restaurant: filterRestaurants, keywords })
    })
    .catch(error => console.log(error))
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
app.put('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = req.body
  
  Restaurant.findByIdAndUpdate(restaurantId, restaurantData)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
app.delete('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})