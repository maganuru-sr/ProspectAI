import Prospect from "../models/Prospect.js";
import Lead from "../models/Lead.js";
import Deal from "../models/Deal.js";
import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProspects = await Prospect.countDocuments({
  owner: req.user.id,
});

const totalLeads = await Lead.countDocuments({
  owner: req.user.id,
});

const totalDeals = await Deal.countDocuments({
  owner: req.user.id,
});

const totalTasks = await Task.countDocuments({
  owner: req.user.id,
});

const deals = await Deal.find({
  owner: req.user.id,
});

    let revenue = 0;

    deals.forEach((deal) => {
      const amount = Number(
        deal.value.replace(/[₹,]/g, "")
      );

      revenue += isNaN(amount) ? 0 : amount;
    });

    res.json({
      totalProspects,
      totalLeads,
      totalDeals,
      totalTasks,
      revenue,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};