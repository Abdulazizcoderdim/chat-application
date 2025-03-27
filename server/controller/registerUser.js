const UserModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: 'Email already exists', error: true });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashPassword,
    };

    const user = await UserModel.create(payload);

    await user.save();

    return res.status(201).json({
      message: 'You have successfully registered',
      data: user,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
}

module.exports = registerUser;
