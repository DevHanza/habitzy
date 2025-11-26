import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  isTokenExpired,
} from "../utils/jwt.js";
import { isProduction } from "../utils/envCheck.js";

const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

// REGISTER
export async function registerUser(req, res) {
  try {
    //
    const userData = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const exitingUser = await User.findOne({ email: req.body.email });

    if (exitingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hash = bcrypt.hashSync(userData.password, 10);
    userData.password = hash;

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json(newUser);
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// LOGIN
export async function loginUser(req, res) {
  try {
    //
    const oldRefreshToken = req.cookies.refreshToken;

    if (oldRefreshToken) {
      // Is Refresh token Valid?
      try {
        const isRefreshTokenValid = verifyToken(oldRefreshToken);
      } catch (error) {
        return res.status(409).json({
          message: "Your refresh token is invalid.",
        });
      }

      // Is Refresh token expired?
      const isRefreshTokenExpired = isTokenExpired(oldRefreshToken);

      if (oldRefreshToken && !isRefreshTokenExpired) {
        return res.status(409).json({
          message: "You are already logged in.",
        });
      }
    }

    const { email, password } = req.body;

    // Check: user is already registered?
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "We couldn't find your account." });
    }

    // Check: Password is correct?
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const device = req.headers["user-agent"];

    // Check: Device is available?
    if (!device) {
      return res
        .status(404)
        .json({ message: "A device identifier is required." });
    }

    // Delete expired refresh tokens from the DB
    user.refreshTokens = user.refreshTokens.filter(
      (token) => token.expiresAt > new Date()
    );

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, device);

    // Add JWT Tokens to Database & Send to User

    const sevenDaysFromNow = new Date(Date.now() + WEEK_IN_MS);

    user.refreshTokens.push({
      token: refreshToken,
      device,
      expiresAt: sevenDaysFromNow,
    });

    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: isProduction, // set to false for local dev without HTTPS
      maxAge: WEEK_IN_MS,
    });

    res.json({ accessToken });

    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// REFRESH YOUR ACCESS TOKEN
export async function refreshToken(req, res) {
  try {
    //
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token found." });

    const payload = verifyToken(token);

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const storedToken = user.refreshTokens.find(
      (tokenItem) => tokenItem.token === token
    );
    if (!storedToken) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Send New token to the client
    const newAccessToken = generateAccessToken(user._id);
    res.json({ accessToken: newAccessToken });

    //
  } catch (err) {
    //
    if (err.message === "jwt must be provided") {
      res.status(400).json({ message: "Invalid refresh token." });
    }

    res.status(400).json({ message: err.message });
    //
  }
}

// LOGOUT (CURRENT DEVICE)
export async function logout(req, res) {
  try {
    //
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token found." });

    const payload = verifyToken(token);

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    user.refreshTokens = user.refreshTokens.filter(
      (tokenItem) => tokenItem.token !== token
    );

    await user.save();
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: isProduction, // set to false for local envs
    });

    res.json({ message: "Logged out successful." });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

export async function getUserByID(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    //
    res.status(200).json(user);
    //
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const newUserData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      res.status(404).json({ message: "User not found." });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
