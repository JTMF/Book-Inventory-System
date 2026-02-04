const express = require("express")
const { 
    signupUser, 
    loginUser,
    getAllUsers,
    searchUsers,
    updateUserRole,
    deleteUser
} = require("../controllers/userController")
const requireSupervisor = require("../middleware/requireSupervisor")
const router = express.Router()

router.post("/signup", signupUser)
router.post("/login", loginUser)

router.get("/all", requireSupervisor, getAllUsers)
router.get("/search", requireSupervisor, searchUsers)
router.put("/:userId", requireSupervisor, updateUserRole)
router.delete("/:userId", requireSupervisor, deleteUser)

module.exports = router
