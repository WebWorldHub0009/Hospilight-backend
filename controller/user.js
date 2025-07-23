const userCollection=require("../models/userModel")
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
require('dotenv').config();

const RegisterUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Fields are required" });
  }

  const ExistingUser = await userCollection.findOne({ email });
  if (ExistingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    let hashpassword = bcrypt.hashSync(password, salt);
    const newUser = await userCollection.create({
      name,
      email,
      password: hashpassword,
      isAdmin: isAdmin || false,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};






const LoginUser = async (req, res) => {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Fields are required" });
        }

        const Finduser = await userCollection.findOne({ email });
        if (!Finduser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(password, Finduser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Add role in the token payload
     const token = jwt.sign(
  {
    _id: Finduser._id,
    email: Finduser.email,
    isAdmin: Finduser.isAdmin,
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

        res.status(200).json({
            message: "Login successful",
            token,
            userId: Finduser._id,
           isAdmin: Finduser.isAdmin,// ✅ Optional: send back role to frontend
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports={
    RegisterUser,
    LoginUser
}