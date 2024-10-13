
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const path = require('path');
// const authRoutes = require('./routes/authRoutes');
// const app = express();

// dotenv.config();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend/public')));

// // Use the auth routes
// app.use('/api', authRoutes);

// // Database connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Serve HTML files directly
// app.get('/register.html', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/views/register.html'));
// });

// app.get('/login.html', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/views/login.html'));
// });

// app.get('/welcome.html', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/views/welcome.html'));
// });

// // Root route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/views/register.html'));
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use the auth routes
app.use('/api', authRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve HTML files directly
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/register.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/login.html'));
});

app.get('/welcome.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/welcome.html'));
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/register.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
