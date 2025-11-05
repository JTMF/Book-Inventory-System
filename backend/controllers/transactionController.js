const Transaction = require("../models/transactionModel")

const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({ user_id: req.user._id })
        .populate("item_id from_location to_location")
        .sort({ date: -1 })
    res.status(200).json(transactions)
}

const createTransaction = async (req, res) => {
    const { type, item_id, qty, from_location, to_location, notes } = req.body
    try {
        const transaction = await Transaction.create({ type, item_id, qty, from_location, to_location, notes, user_id: req.user._id })
        res.status(200).json(transaction)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params
    const transaction = await Transaction.findByIdAndDelete(id)
    if (!transaction) return res.status(404).json({ error: "No such transaction" })
    res.status(200).json(transaction)
}

module.exports = { getTransactions, createTransaction, deleteTransaction }
