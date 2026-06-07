import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName,
      password,
    } = req.body;

    // Validation

    if (
      !username ||
      !email ||
      !fullName ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user

    const existingUser = await User.findOne({
      $or: [
        { username },
        { email },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Username or Email already exists",
      });
    }

    // Create user

    const user = await User.create({
      username,
      email,
      fullName,
      password,
      avatar:username.charAt(0).toUpperCase(),
    });

    const createdUser =
      await User.findById(
        user._id
      ).select("-password -refreshToken");

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      user: createdUser,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid =
      await user.isPasswordCorrect(
        password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const accessToken =
      user.generateAccessToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password -refreshToken");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, username } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        username,
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};