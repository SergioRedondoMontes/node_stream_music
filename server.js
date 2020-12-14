const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const routes = require("./routes");
const cors = require("cors");

const User = require("./models/User");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the Database successfully");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  // CHECK EXISTS ACCESS TOKEN IN HEADERS
  try {
    if (req.headers["x-access-token"]) {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } else {
      // CHECK EXISTS ACCESS TOKEN IN COOKIE
      if (req.cookies["authorization-stream-music"]) {
        const accessToken = req.cookies["authorization-stream-music"];
        const { userId, exp } = await jwt.verify(
          accessToken,
          process.env.JWT_SECRET
        );
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
          return res.status(401).json({
            error: "JWT token has expired, please login to obtain a new one",
          });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
      } else {
        next();
      }
    }
  } catch (err) {
    res.send(err.message);
  }
});
app.use(
  cors({
    origin: "http://192.168.64.3:30946",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use("/", routes);

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
