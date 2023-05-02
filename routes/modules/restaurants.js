const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增一家餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

// 瀏覽特定餐廳
router.get('/:_id', (req, res) => {
  const { _id } = req.params
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 新增餐廳
router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id

  Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 編輯特定餐廳
router.get('/:_id/edit', (req, res) => {
  const { _id } = req.params
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 更新餐廳
router.put('/:_id', (req, res) => {
  const { _id } = req.params
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete('/:_id', (req, res) => {
  const { _id } = req.params
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router