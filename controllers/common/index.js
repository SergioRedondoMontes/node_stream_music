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
    if (!user) res.sendStatus(404);
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) res.sendStatus(404);
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.cookie("authorization-stream-music", accessToken);
    if (!user.resetPassword) {
      res.status(200).send({ email: user.email, JWT: accessToken });
    } else {
      res.status(200).send({ email: user.email, JWT: accessToken });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.signup = async (req, res, next) => {
  console.log("body", req.body);
  const { name, surname, email, password, role } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role: role || "user",
      resetPassword: false,
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.cookie("authorization-stream-music", accessToken);
    res.status(200).send({ email: newUser.email, JWT: accessToken });
    // res.redirect("/");
  } catch (error) {
    res.send(error.message);
    // res.render("common/signup", {
    //   alert: "email-exists",
    //   user: { username, name, surname, email, role },
    // });
  }
};
