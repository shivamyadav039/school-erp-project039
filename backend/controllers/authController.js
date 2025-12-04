const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  console.log("📩 Incoming Login Request:", { email, password, role });

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with this email");
      return res.status(400).json({ msg: 'Invalid Credentials (email)' });
    }

    console.log("✅ User found in DB:", { email: user.email, role: user.role });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ msg: 'Invalid Credentials (password)' });
    }

    if (user.role !== role) {
      console.log(`❌ Role mismatch. DB has "${user.role}", frontend sent "${role}"`);
      return res.status(400).json({ msg: 'Invalid Credentials (role)' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        console.log("✅ Login Success. Role:", user.role);
        res.json({ token, role: user.role });
      }
    );
  } catch (err) {
    console.error("🔥 Server Error:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};