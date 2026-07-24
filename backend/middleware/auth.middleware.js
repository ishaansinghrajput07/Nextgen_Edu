import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";
import Counsellor from "../models/Counsellor.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    let user = await Auth.findById(decoded.id);

    if (!user) {
      user = await Counsellor.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    console.log("========== AUTH ==========");
    console.log("User:", req.user.name);
    console.log("Role:", req.user.role);
    console.log("==========================");

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export const authorize =
  (...roles) =>
  (req, res, next) => {

    console.log("Allowed Roles:", roles);
    console.log("Current Role:", req.user.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }

    next();
  };