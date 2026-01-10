const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["inbound", "outbound", "movement"], required: true },
    item_name: { type: String, required: true }, // free-text book name
    qty: { type: Number, required: true },
    from_location: { type: String },
    to_location: { type: String },
    date: { type: Date, default: Date.now },
    notes: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
