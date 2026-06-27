import Lead from "../models/Lead.js";

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({
  owner: req.user.id,
}).sort({
  createdAt: -1,
});

    res.json(leads);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Lead
export const addLead = async (req, res) => {
  try {

    const lead = await Lead.create({
  ...req.body,
  owner: req.user.id,
});

    res.status(201).json(lead);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};