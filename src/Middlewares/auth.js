const adminAuth = (req, res, next) => {
  console.log("admin auth");
  const token = "xyz";

  const isAdminAuth = token === "xyz";
  if (isAdminAuth) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
const userAuth = (req, res, next) => {
  console.log("user auth");
  const token = "xyzqq";

  const isUserAuth = token === "xyzq";
  if (isUserAuth) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
