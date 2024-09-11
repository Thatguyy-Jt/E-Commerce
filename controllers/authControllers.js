const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { validateUser } = require("../validators");



exports.register = async (req, res) => {
  const { firstName, lastName, password, confirmPassword, email, phone, role } = req.body;

  if (password !== confirmPassword) {
     return res.json({ message: "Password do not match" }).status(400)
  }
  const { error } = validateUser(req.user);
  if( error) return res.status(400).json({ message: error.details[0].message }) 
  try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json("User already exists!..")
      }

      user = new User({ firstName, lastName, password, confirmPassword, email, phone, role});
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
      await user.save()

       const token = user.generateAuthToken()
       res.header("auth-token", token).json(user)
      //  res.json(user)

  } catch (error) {
      console.log({ message: error.message });
  }
}


exports.login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid username" })
    }

    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) {
     return res.status(400).json({ message: "Invalid password" })
    }

    const token = user.generateAuthToken()
    res.header("auth-token", token).json({ token })
  } catch (error) {
    console.log({message: error.message });
    
  }
}