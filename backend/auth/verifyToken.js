import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decoded || !decoded.id || !decoded.role) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId) || await Doctor.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "You're not authorized" });
    }

    next();
  } catch (error) {
    console.error("Role check error:", error);
    return res.status(500).json({ success: false, message: "Server error in role check" });
  }
};
