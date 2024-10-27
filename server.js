const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
require('dotenv').config();
const cookiesParser = require('cookie-parser');

const app = express();
// middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// api endpoints
app.use('/api', require('./routes'));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});
