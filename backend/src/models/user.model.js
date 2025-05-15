import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/dwlfhknvs/image/upload/v1746986216/Profile_avatar_placeholder_large_atf6sj.png",
  },
  avatarPublicId: {
    type: String,
    select: false,
  },
  vault: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vault"
    }
  ],
  isVerified: {
    type: Boolean,
    default: false,
    select: false,
  },
  refreshToken: {
    type: String,
  }
}, {timestamps: true})

userSchema.pre("save", async function(){
  if(!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
  return JWT.sign({
    userId: this._id,
    email: this.email,
    userName: this.userName,
  }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = async function(){
  return JWT.sign({
    userId: this._id,
    email: this.email,
  }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema)