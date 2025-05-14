import Feedback from '../models/feedbackModel.js';

const handleResponse = (res, promise) => {
  promise
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
};

export const categoryCount = (req, res) => {
  handleResponse(res, Feedback.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]));
};

export const dailyFeedback = (req, res) => {
  const today = new Date();
  const pastWeek = new Date(today);
  pastWeek.setDate(today.getDate() - 6);

  const matchStage = {
    submittedAt: {
      $gte: new Date(pastWeek.setHours(0, 0, 0, 0)),
      $lte: new Date(today.setHours(23, 59, 59, 999)),
    }
  };

  const pipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" } },
        count: { $sum: 1 },
      }
    },
    { $sort: { _id: 1 } }
  ];

  handleResponse(res, Feedback.aggregate(pipeline));
};

export const topUsers = (req, res) => {
  handleResponse(res, Feedback.aggregate([
    { $group: { _id: "$userID", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]));
};

export const tagFrequency = (req, res) => {
  handleResponse(res, Feedback.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]));
};
