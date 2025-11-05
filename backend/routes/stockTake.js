const express = require("express")
const { 
    addStockTake, 
    getStockTakes 
} = require("../controllers/stockTakeController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
router.get("/", getStockTakes)
router.post("/", addStockTake)

module.exports = router
