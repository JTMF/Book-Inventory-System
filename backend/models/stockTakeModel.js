const mongoose = require("mongoose")
const stockTakeSchema = new mongoose.Schema({
    item_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Item", 
        required: true 
    },
    location_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Location", 
        required: true 
    },
    counted_qty: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
})

module.exports = mongoose.model("StockTake", stockTakeSchema)
