const StockTake = require("../models/stockTakeModel")

const addStockTake = async (req, res) => {
    const { item_id, location_id, counted_qty } = req.body
    try {
        const record = await StockTake.create({ item_id, location_id, counted_qty, user_id: req.user._id })
        res.status(200).json(record)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getStockTakes = async (req, res) => {
    const records = await StockTake.find({}).populate("item_id location_id user_id")
    res.status(200).json(records)
}

module.exports = { addStockTake, getStockTakes }
