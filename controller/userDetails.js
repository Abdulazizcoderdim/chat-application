const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

async function userDetails(req, res) {
  try {
    const token = req.cookies.token || '';

    const user = await getUserDetailsFromToken(token);

    return res.status(200).json({ message: 'User details', data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: error.message || error });
  }
}

module.exports = userDetails;
