const roleBasedAuth = (role) => {
  return (req, res, next) => {
    if (req.user.role.includes(role)) return next();

    res.status(203).send("Access Denied");
  };
};

export default roleBasedAuth;
