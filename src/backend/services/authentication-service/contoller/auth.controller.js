const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup Controller
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists by username or email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Login Controller (No JWT)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Instead of generating a token, just respond with success
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Logout Controller (No real JWT or session to destroy)
exports.logout = (req, res) => {
  // Typically, you'd invalidate a session or token. 
  // Since we aren't using JWT here, just respond success.
  return res.status(200).json({ message: 'Logged out successfully' });
};
