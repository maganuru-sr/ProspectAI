import Deal from "../models/Deal.js";

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({
  owner: req.user.id,
}).sort({
  createdAt: -1,
});
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addDeal = async (req, res) => {
  try {
    const deal = await Deal.create({
  ...req.body,
  owner: req.user.id,
});
    res.status(201).json(deal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};