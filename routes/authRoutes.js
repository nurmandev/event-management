const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUsers,
  getUserById,
} = require("../controllers/authController");

// Register a new user
router.post("/register", register);

// Authenticate user and get token
router.post("/login", login);

router.get("/", getUsers);

router.get("/:id", getUserById);

module.exports = router;
