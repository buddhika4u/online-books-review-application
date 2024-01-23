const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Task 6: Register New user
const registerUser = async ({ username, password }) => {
  try {
    const user = new User({ username, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// const registerUser = async ({ username, password }) => {
//     try {
//       // Check if the username is already taken
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         throw new Error('Username is already taken');
//       }

//       // Hash the password before saving it to the database
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create a new user
//       const newUser = new User({
//         username,
//         password: hashedPassword,
//         reviews: [],
//       });

//       // Save the user to the database
//       await newUser.save();

//       return newUser;
//     } catch (error) {
//       throw error;
//     }
//   };

// // Register a new user
// const registerUser = async ({ username, password }) => {
//     const user = new User({ username, password });
//     await user.save();
//     return user;
//   };

// const loginUser = async (loginData) => {
//   // Implement logic to authenticate and login a user
// };

module.exports = {
  generateToken,
  verifyToken,
  registerUser,
  // loginUser,
};
