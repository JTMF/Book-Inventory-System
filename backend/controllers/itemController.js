const Item = require("../models/itemModel");

const createItem = async (req, res) => {
  const { item_name, sku } = req.body;

  if (!item_name) return res.status(400).json({ error: "Item name required" });

  try {
    const item = await Item.create({ item_name, sku });
    res.status(201).json(item); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getItems = async (req, res) => {
  const items = await Item.find({});
  res.status(200).json(items);
};

module.exports = { createItem, getItems };
