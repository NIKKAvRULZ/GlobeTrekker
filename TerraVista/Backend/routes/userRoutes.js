const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  addFavoriteCountry,
  removeFavoriteCountry,
  getFavoriteCountries
} = require('../controllers/userController');

router.route('/favorites')
  .get(protect, getFavoriteCountries)
  .put(protect, addFavoriteCountry);

router.route('/favorites/:countryCode')
  .delete(protect, removeFavoriteCountry);

module.exports = router;