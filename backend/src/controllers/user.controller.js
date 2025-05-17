import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (
    [userName, email, password].some(
      (value) => !value || typeof value !== "string" || value.trim() === "",
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    const accessToken = await user.generateAccessToken();

    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    res.cookie("accessToken", accessToken, cookieOptions);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User registration failed " + error.message });
  }
};

const loginUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!password || typeof password !== "string" || password.trim() === "")
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });

  const isValidUserName =
    userName && typeof userName === "string" && userName.trim() !== "";

  const isValidEmail =
    email && typeof email === "string" && email.trim() !== "";

  if (!isValidUserName && !isValidEmail)
    return res
      .status(400)
      .json({ success: false, message: "Username or Email is required" });

  try {
    const user = await User.findOne({ $or: [{ userName }, { email }] }).select(
      "+password",
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });

    const accessToken = await user.generateAccessToken();

    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    res.cookie("accessToken", accessToken, cookieOptions);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User login failed " + error.message });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (
    [oldPassword, newPassword].some(
      (value) => !value || typeof value !== "string" || value.trim() === "",
    )
  )
    return res
      .status(400)
      .json({ success: false, message: "Fill all required fields" });

  try {
    const user = await User.findById(req.user?._id).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid token, please login again" });

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid current password" });

    user.password = newPassword;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" + error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true },
    );

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" + error.message,
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const filePath = req.file?.path;

    if (!filePath)
      return res
        .status(400)
        .json({ success: false, message: "File is required" });

    const avatar = await uploadToCloudinary(filePath);

    if (!avatar)
      return res
        .status(400)
        .json({ success: false, message: "Upload to cloudinary failed" });

    const userId = req.user?._id

    const prevAvatarId = await User.findById(userId).select("+avatarPublicId");

    if (prevAvatarId?.avatarPublicId) {
      await cloudinary.uploader.destroy(prevAvatarId.avatarPublicId);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          avatar: avatar.secure_url,
          avatarPublicId: avatar.public_id,
        },
      },
      { new: true },
    ).select("+avatarPublicId");

    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" + error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id)

    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" + error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  changePassword,
  logoutUser,
  uploadProfilePicture,
  getCurrentUser,
};
