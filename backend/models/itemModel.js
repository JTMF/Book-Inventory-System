const mongoose = require("mongoose")
const itemSchema = new mongoose.Schema({
    item_name: { 
        type: String, 
        required: true 
    },
    sku: { 
        type: String 
    }
})

module.exports = mongoose.model("Item", itemSchema)
