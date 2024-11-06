const jwt = require("jsonwebtoken");

// Example user object
const user = {
  id: 1,
  name: "John Doe",
  role: "admin",
};

// Generate JWT token
const token = jwt.sign(user, process.env.SECRET_KEY);

console.log("JWT token:", token);
