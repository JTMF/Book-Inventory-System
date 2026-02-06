const StockTake = require("../models/stockTakeModel");

const getStockTakes = async (req, res) => {
  try {
    const stockTakes = await StockTake.find()
      .populate("user_id", "email")
      .sort({ createdAt: -1 });
    
    // Add createdBy field for compatibility with frontend
    const enrichedStockTakes = stockTakes.map(s => ({
      ...s.toObject(),
      createdBy: s.user_id?.email || "Unknown"
    }));
    
    res.status(200).json(enrichedStockTakes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock takes" });
  }
};

const createStockTake = async (req, res) => {
  const { item_name, qty, location, notes } = req.body;
  const user_id = req.user._id;

  if (!item_name || !qty) {
    return res.status(400).json({ error: "Book name and quantity are required" });
  }

  try {
    const stockTake = await StockTake.create({
      item_name,
      qty,
      location: location || "",
      notes: notes || "",
      user_id,
    });

    res.status(201).json(stockTake);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStockTake = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  const userRole = req.user.role;

  console.log(`Delete attempt - ID: ${id}, User: ${user_id}, Role: ${userRole}`);

  try {
    const query = userRole === "supervisor" ? { _id: id } : { _id: id, user_id };
    console.log("Query:", query);
    const stockTake = await StockTake.findOneAndDelete(query);
    if (!stockTake) {
      console.log("Stock take not found with query:", query);
      return res.status(404).json({ error: "Stock take not found" });
    }
    res.status(200).json(stockTake);
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).json({ error: "Failed to delete stock take" });
  }
};

const updateStockTake = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  const userRole = req.user.role;
  const { item_name, qty, location, notes } = req.body;

  if (!item_name || !qty) {
    return res.status(400).json({ error: "Book name and quantity are required" });
  }

  try {
    // Supervisors can update any stock take, others can only update their own
    const query = userRole === "supervisor" ? { _id: id } : { _id: id, user_id };
    const stockTake = await StockTake.findOneAndUpdate(
      query,
      { item_name, qty, location: location || "", notes: notes || "" },
      { new: true }
    );

    if (!stockTake) return res.status(404).json({ error: "Stock take not found" });

    res.status(200).json(stockTake);
  } catch (error) {
    res.status(400).json({ error: "Failed to update stock take" });
  }
};

module.exports = { getStockTakes, createStockTake, updateStockTake, deleteStockTake };
