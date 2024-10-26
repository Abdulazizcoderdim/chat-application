const UserModel = require('../models/user.model');

async function checkEmail(req, res) {
  try {
    const { email } = req.body;

    const checkEmail = await UserModel.findOne({ email }).select('-password');

    if (!checkEmail) {
      return res.status(400).json({
        message: 'User not exist',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'email verify',
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: error.message || error });
  }
}

module.exports = checkEmail;
