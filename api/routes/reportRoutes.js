import express from 'express';
import {categoryCount, dailyFeedback, topUsers, tagFrequency} from '../controllers/reportController.js';

const router = express.Router();

router.get('/category-count', categoryCount);
router.get('/daily-feedback', dailyFeedback);
router.get('/top-users', topUsers);
router.get('/tag-frequency', tagFrequency);

export default router;
