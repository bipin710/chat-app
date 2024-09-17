import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const jwtSecret = "your_jwt_secret";

export const signup = async (req, res) => {
    const { username, email, phoneNumber, password, confirmPassword, gender } = req.body;

    try {
        let validUser = await User.findOne({ email });

        if (validUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match",
            });
        }

        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        const boyprofilepic = `https://avatar.iran.liara.run/public/38?username=${username}`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyprofilepic : girlprofilepic,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
