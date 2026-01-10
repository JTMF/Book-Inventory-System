const StockTake = require("../models/stockTakeModel");

const getStockTakes = async (req, res) => {
  const user_id = req.user._id;
  try {
    const stockTakes = await StockTake.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(stockTakes);
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

  try {
    const stockTake = await StockTake.findOneAndDelete({ _id: id, user_id });
    if (!stockTake) return res.status(404).json({ error: "Stock take not found" });
    res.status(200).json(stockTake);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete stock take" });
  }
};

const updateStockTake = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  const { item_name, qty, location, notes } = req.body;

  if (!item_name || !qty) {
    return res.status(400).json({ error: "Book name and quantity are required" });
  }

  try {
    const stockTake = await StockTake.findOneAndUpdate(
      { _id: id, user_id },
      { item_name, qty, location: location || "", notes: notes || "" },
      { new: true } // return the updated document
    );

    if (!stockTake) return res.status(404).json({ error: "Stock take not found" });

    res.status(200).json(stockTake);
  } catch (error) {
    res.status(400).json({ error: "Failed to update stock take" });
  }
};

module.exports = { getStockTakes, createStockTake, updateStockTake, deleteStockTake };
