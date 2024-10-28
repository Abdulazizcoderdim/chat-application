async function logout(req, res) {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: error.message || error });
  }
}
