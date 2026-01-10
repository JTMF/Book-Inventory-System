const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_id: { type: Number, unique: true },
  item_name: { type: String, required: true },
  sku: { type: String }
});

itemSchema.pre("save", async function(next) {
  if (this.isNew) {
    let randomId;
    let exists = true;

    while (exists) {
      randomId = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      exists = await mongoose.models.Item.findOne({ item_id: randomId });
    }

    this.item_id = randomId;
  }
  next();
});

module.exports = mongoose.model("Item", itemSchema);
