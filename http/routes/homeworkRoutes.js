import express from 'express';
import homeworkController from '../controllers/homeworkController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.getAccessToken);

router
  .route('/student/:_id')
  .get(homeworkController.getHomeworkStudent)
  .post(homeworkController.uploadImages, homeworkController.processStudentImages, homeworkController.submitHomework);
router.route('/student').get(homeworkController.getAllHomeworksStudent);

router
  .route('/:_id')
  .get(homeworkController.getHomework)
  .patch(homeworkController.uploadImages, homeworkController.processTeacherImages, homeworkController.updateHomework)
  .delete(homeworkController.deleteHomework);

router
  .route('/')
  .get(homeworkController.getAllHomeworks)
  .post(homeworkController.uploadImages, homeworkController.processTeacherImages, homeworkController.addHomework);

export default router;
