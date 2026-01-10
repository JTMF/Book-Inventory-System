const express = require("express")
const { 
    signupUser, 
    loginUser,
    getAllUsers,
    searchUsers,
    updateUserRole,
    deleteUser
} = require("../controllers/userController")
const requireAdmin = require("../middleware/requireAdmin")
const router = express.Router()

router.post("/signup", signupUser)
router.post("/login", loginUser)

// Admin routes
router.get("/all", requireAdmin, getAllUsers)
router.get("/search", requireAdmin, searchUsers)
router.put("/:userId", requireAdmin, updateUserRole)
router.delete("/:userId", requireAdmin, deleteUser)

module.exports = router
