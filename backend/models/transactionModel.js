const mongoose = require("mongoose")
const transactionSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ["inbound", "outbound", "movement"], 
        required: true 
    },
    item_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Item", 
        required: true 
    },
    qty: { 
        type: Number, 
        required: true 
    },
    from_location: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Location" 
    },
    to_location: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Location" 
    },
    notes: { 
        type: String 
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

module.exports = mongoose.model("Transaction", transactionSchema)
