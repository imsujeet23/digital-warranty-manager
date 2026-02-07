const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: {
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Register error:", err);
    if (err?.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already registered" });
    }
    if (err?.name === "SequelizeValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err?.message || "Registration failed" });
  }
};
