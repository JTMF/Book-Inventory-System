const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (user) => {
    return jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "3d" })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user)
        res.status(200).json({ email: user.email, token, role: user.role, _id: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { email, password, role } = req.body
    try {
        const user = await User.signup(email, password, role)
        const token = createToken(user)
        res.status(200).json({ email: user.email, token, role: user.role, _id: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all users (supervisor only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Search users (supervisor only)
const searchUsers = async (req, res) => {
    try {
        const { query } = req.query
        let filter = {}
        
        if (query) {
            filter = {
                $or: [
                    { email: { $regex: query, $options: "i" } },
                    { name: { $regex: query, $options: "i" } }
                ]
            }
        }
        
        const users = await User.find(filter).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update user role (supervisor only)
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body
        
        if (!role) {
            return res.status(400).json({ error: "Role is required" })
        }
        
        if (!["operator", "supervisor"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" })
        }
        
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password")
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete user (supervisor only)
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        
        await User.findByIdAndDelete(userId)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser, getAllUsers, searchUsers, updateUserRole, deleteUser }
