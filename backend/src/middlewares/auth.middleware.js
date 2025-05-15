import JWT from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

  if (!token) return res.status(401).json({ success: false, message: "Unauthorized token"})

  try {
    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?.userId)

    if (!user) return res.status(401).json({success: false, message: "Invalid token"})

    req.user = user

    next()
    
  } catch (error) {
    return res.status(401).json({success: false, message: error.message})
  }
}

export { verifyJWT }