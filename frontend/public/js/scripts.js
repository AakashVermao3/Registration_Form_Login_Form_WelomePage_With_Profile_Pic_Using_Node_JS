const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();
const path = require('path');
require('dotenv').config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
