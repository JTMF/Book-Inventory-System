const Transaction = require("../models/transactionModel");

// Get transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
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

// Update transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  const userRole = req.user.role;
  const { type, item_name, qty, from_location, to_location, date, notes } = req.body;

  if (!type || !item_name || !qty) {
    return res.status(400).json({ error: "Type, book name, and quantity are required" });
  }

  try {
    // Supervisors can update any transaction, others can only update their own
    const query = userRole === "supervisor" ? { _id: id } : { _id: id, user_id };
    const transaction = await Transaction.findOneAndUpdate(
      query,
      {
        type,
        item_name,
        qty,
        from_location: from_location || "",
        to_location: to_location || "",
        date: date || new Date(),
        notes: notes || "",
      },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  const userRole = req.user.role;

  console.log(`Delete attempt - ID: ${id}, User: ${user_id}, Role: ${userRole}`);

  try {
    // Supervisors can delete any transaction, others can only delete their own
    const query = userRole === "supervisor" ? { _id: id } : { _id: id, user_id };
    console.log("Query:", query);
    const transaction = await Transaction.findOneAndDelete(query);
    if (!transaction) {
      console.log("Transaction not found with query:", query);
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Delete error:", error);
    res.status(400).json({ error: "Failed to delete transaction" });
  }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };
