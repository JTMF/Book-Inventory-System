const mongoose = require("mongoose");

const stockTakeSchema = new mongoose.Schema(
  {
    item_name: {          // free-text book name
      type: String,
      required: true,
      trim: true,
    },
    qty: {                // quantity counted
      type: Number,
      required: true,
    },
    location: {           // location name
      type: String,
      default: "",
    },
    notes: {              // optional notes
      type: String,
      default: "",
    },
    user_id: {            // reference to the user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockTake", stockTakeSchema);
