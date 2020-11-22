const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      role: { $in: ["user", "singer"] },
    });
    if (!user) res.send(404);
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) res.send(404);
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.cookie("authorization-stream-music", accessToken);
    if (!user.resetPassword) {
      res.send(200);
    } else {
      res.send(200);
    }
  } catch (error) {
    res.send(error.message);
  }
};
