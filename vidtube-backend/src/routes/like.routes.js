import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  toggleVideoLike,
  toggleCommentLike,
  getLikedVideos,
} from '../controllers/like.controller.js';

const router = Router();

// ============================================
// PROTECTED ROUTES
// ============================================

router.route('/toggle/v/:videoId').post(verifyJWT, toggleVideoLike);
router.route('/toggle/c/:commentId').post(verifyJWT, toggleCommentLike);
router.route('/videos').get(verifyJWT, getLikedVideos);

export default router;
