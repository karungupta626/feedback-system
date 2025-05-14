import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  feedbackID: String,
  userID: String,
  rating: Number,
  comment: String,
  category: String,
  tags: [String],
  sentiment: String,
  submittedAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
