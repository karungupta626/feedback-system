import express from 'express';
import {submitFeedback, getAllFeedback} from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/submit', submitFeedback);
router.get('/', getAllFeedback);

export default router;
