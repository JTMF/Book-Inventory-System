const express = require("express")
const { 
    getTransactions, 
    createTransaction, 
    deleteTransaction 
} = require("../controllers/transactionController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
router.get("/", getTransactions)
router.post("/", createTransaction)
router.delete("/:id", deleteTransaction)

module.exports = router