const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 瀏覽全部餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

module.exports = router