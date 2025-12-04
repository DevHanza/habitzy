import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.js";
import { isProduction } from "../utils/envCheck.js";
import { sendEmail } from "../utils/sendEmail.js";
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
      const payload = verifyToken(oldRefreshToken);

      // Is Refresh token expired?
      const now = Math.floor(new Date() / 1000);
      const expiresAt = payload?.exp;
      const isRefreshTokenExpired = expiresAt < now;

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
    if (err.message === "jwt must be provided") {
      res.status(400).json({ message: "Invalid refresh token." });
    }

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

// LOGOUT (ALL DEVICES)
export async function logoutAll(req, res) {
  try {
    //
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No token found." });

    const payload = verifyToken(token);

    // 48-Hour Logout Security

    const now = new Date();
    const issuedAt = new Date(payload?.iat * 1000);
    const twoDaysAfterLoggedIn = new Date();
    twoDaysAfterLoggedIn.setDate(issuedAt.getDate() + 2);

    const isTwoDaysAfter = now > twoDaysAfterLoggedIn;

    if (!isTwoDaysAfter) {
      return res.status(401).json({
        message: "You must wait 48 hours before signing out of all devices.",
      });
    }

    //

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    user.refreshTokens = [];
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: isProduction, // set to false for local envs
    });

    res.json({ message: "Logged out from all devices." });

    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// FORGOT PASSWORD
export async function forgotPassword(req, res) {
  try {
    //

    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required." });
    }

    const device = req.headers["user-agent"];
    if (!device) {
      return res
        .status(404)
        .json({ message: "A device identifier is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "We couldn't find your account." });
    }

    // Remove Expired Tokens

    user.verifyCodes = user.verifyCodes.filter((vc) => {
      const now = new Date();
      const expireDate = new Date(vc.expiresAt);
      return expireDate > now;
    });

    // Generate a random 5-digit number
    const maxDigit = 10000;
    const minDigit = 99999;
    const digit =
      Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;

    // Hashing the generated verify code
    const hash = bcrypt.hashSync(digit.toString(), 5);

    // Send the email to the user

    const emailMessage = `

    Hi ${user.name},

    We received a request to reset the password for your account.

    Your verify code is:

    <h2>${digit}</h2>

    Please enter this code on the password reset screen to verify your identity and continue the process.
    For security reasons, please do not share this code with anyone.

    This code is valid for 10 minutes.

    If you did not request a password reset, please ignore this email. 
    Your password will remain unchanged.

    Thank you,
    ${process.env.APP_NAME}.
    `;

    await sendEmail(email, `Your Verify Code: ${digit}`, emailMessage);

    // Save the hashed verify code in the DB
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.verifyCodes.push({
      code: hash,
      device,
      expiresAt,
    });

    await user.save();

    // return res.json(digit);
    return res.json({
      code: hash,
    });
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}

// VERIFY CODE
export async function verifyCode(req, res) {
  try {
    //
    const { code, email } = req.body;

    if (!code) {
      res.status(404).json("Verification Code Required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "We couldn't find your account." });
    }

    const device = req.headers["user-agent"];
    if (!device) {
      return res
        .status(404)
        .json({ message: "A device identifier is required." });
    }
    //  #
    const verifyCodes = user.verifyCodes;
    let verifiedCode;

    // Get the valid verify code ,if exists.
    for (const vc of verifyCodes) {
      const isValidCode = await bcrypt.compare(code, vc.code);

      if (isValidCode) {
        verifiedCode = vc;
        break;
      }
    }

    if (!verifiedCode) {
      return res.status(498).json({ message: "Invalid Code." });
    }

    // Check: Is verify code expired?
    const now = new Date();
    const expiresAt = new Date(verifiedCode.expiresAt);
    const isCodeExpired = expiresAt < now;

    if (isCodeExpired) {
      return res.status(498).json({ message: "Your Verify Code is expired." });
    }
    // #

    // Block when a user tries to verify on a device different from the one that requested it.
    if (device !== verifiedCode.device) {
      return res
        .status(401)
        .json({ message: "Verification Failed: Device Mismatch." });
    }

    // // Delete the Verified code from the DB
    // user.verifyCodes = user.verifyCodes.filter((vc) => {
    //   return vc !== verifiedCode;
    // });

    await user.save();

    res.json({
      message: `Success! Your password for ${email} is now updated.`,
      hashedCode: verifiedCode.code,
    });
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
