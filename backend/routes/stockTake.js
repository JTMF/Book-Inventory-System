const express = require("express");
const {
  getStockTakes,
  createStockTake,
  updateStockTake,
  deleteStockTake,
} = require("../controllers/stockTakeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getStockTakes);
router.post("/", createStockTake);
router.put("/:id", updateStockTake);   // NEW: update endpoint
router.delete("/:id", deleteStockTake);

module.exports = router;
