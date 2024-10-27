async function userDetails(req, res) {
  try {
    const token = req.cookies.token || '';
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: error.message || error });
  }
}
