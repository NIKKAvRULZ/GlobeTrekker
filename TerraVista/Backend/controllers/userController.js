const User = require('../models/User');

// @desc    Add country to favorites
// @route   PUT /api/users/favorites
// @access  Private
const addFavoriteCountry = async (req, res) => {
  const { countryCode } = req.body;

  try {
    const user = await User.findById(req.user._id);
    
    if (!user.favoriteCountries.includes(countryCode)) {
      user.favoriteCountries.push(countryCode);
      await user.save();
    }

    res.json(user.favoriteCountries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove country from favorites
// @route   DELETE /api/users/favorites/:countryCode
// @access  Private
const removeFavoriteCountry = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.favoriteCountries = user.favoriteCountries.filter(
      code => code !== req.params.countryCode
    );
    
    await user.save();
    res.json(user.favoriteCountries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get favorite countries
// @route   GET /api/users/favorites
// @access  Private
const getFavoriteCountries = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favoriteCountries');
    res.json(user.favoriteCountries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addFavoriteCountry,
  removeFavoriteCountry,
  getFavoriteCountries
};