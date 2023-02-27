const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 搜尋特定餐廳
router.get('/', (req, res) => {
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

module.exports = router