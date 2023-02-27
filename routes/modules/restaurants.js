const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增一家餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

// 瀏覽特定餐廳
router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 新增餐廳
router.post('/', (req, res) => {
  const restaurant = req.body

  Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 編輯特定餐廳
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 更新餐廳
router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = req.body

  Restaurant.findByIdAndUpdate(restaurantId, restaurantData)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params

  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router