exports.checkLoggedIn = function (req, res, next) {
  try {
    const user = res.locals.loggedInUser;
    if (!user) res.redirect("/");
    req.user = user;
    next();
  } catch (error) {
    res.redirect("/");
  }
};

exports.checkAuthAdmin = function (req, res, next) {
  if (req.user) {
    if (req.user.role === "admin") {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};

exports.checkAuthSinger = function (req, res, next) {
  if (req.user) {
    if (req.user.role === "singer") {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};
