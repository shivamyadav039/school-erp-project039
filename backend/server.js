// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const teacherRoutes = require('./routes/teacherRoutes');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: "GET,POST,PUT,DELETE",
//   allowedHeaders: "Content-Type, Authorization"
// }));


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

// app.options("*", cors());


// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// 🚨 Allow ALL origins temporarily (for debugging)
app.use(cors());

app.use(express.json());

// ✋ Ensure OPTIONS preflight handled
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 🔗 Mongo connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// 📌 Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// 🚀 Server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
