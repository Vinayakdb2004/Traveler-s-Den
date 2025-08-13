// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Traveler = require('./models/Traveler');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/travelersden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.post('/checkin', async (req, res) => {
  try {
    const traveler = new Traveler(req.body);
    await traveler.save();
    res.status(200).json({ message: "Check-in successful!" });
  } catch (error) {
    console.error("Error saving traveler:", error);
    res.status(500).json({ message: "Error processing check-in" });
  }
});

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
