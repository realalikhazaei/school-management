import Lesson from '../../http/models/lessonModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const addLessons = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const lessons = await Lesson.create(input);

  return lessons;
};

export const lessonMutation = { addLessons };
