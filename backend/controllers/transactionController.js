const Transaction = require("../models/transactionModel");

// Get transactions
const getTransactions = async (req, res) => {
  const user_id = req.user._id;
  try {
    const transactions = await Transaction.find({ user_id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Create transaction
const createTransaction = async (req, res) => {
  const { type, item_name, qty, from_location, to_location, date, notes } = req.body;
  const user_id = req.user._id;

  if (!type || !item_name || !qty) {
    return res.status(400).json({ error: "Type, book name, and quantity are required" });
  }

  try {
    const transaction = await Transaction.create({
      type,
      item_name,
      qty,
      from_location: from_location || "",
      to_location: to_location || "",
      date: date || new Date(),
      notes: notes || "",
      user_id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user_id });
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete transaction" });
  }
};

module.exports = { getTransactions, createTransaction, deleteTransaction };
