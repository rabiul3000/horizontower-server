const verifyUser = async (req, res, next) => {
  
  const email = req.query.email;
  const user = req.user;

  if (user.email !== email) {
    return res.status(403).json({ message: "Forbidden: Invalid user" });
  }

  next();
};
module.exports = verifyUser;