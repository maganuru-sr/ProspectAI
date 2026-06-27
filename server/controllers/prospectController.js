import Prospect from "../models/Prospect.js";

// Get all prospects
export const getProspects = async (req, res) => {
  try {
    const prospects = await Prospect.find({
  owner: req.user.id,
}).sort({
  createdAt: -1,
});

    res.json(prospects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Prospect
export const addProspect = async (req, res) => {
  try {

    const prospect = await Prospect.create({
  ...req.body,
  owner: req.user.id,
});

    res.status(201).json(prospect);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};