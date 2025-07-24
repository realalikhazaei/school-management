import { GraphQLError } from 'graphql';
import LessonList from '../../http/models/lessonListModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getLessonList = async (_, args, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const lessonList = await LessonList.find(args);

  return lessonList;
};

const addLessonList = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  //FIXME ACID transaction needed
  let lessonList;
  try {
    lessonList = await LessonList.create(input);
  } catch ({ code, keyValue: { title, grade } }) {
    if (code === 11000)
      throw new GraphQLError(`${title} lesson for grade ${grade} is already defined.`, { extensions: { code: 400 } });
  }

  return lessonList;
};

const updateLessonList = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  //FIXME ACID transaction needed
  const query = input.map(
    async ({ _id, title, grade }) =>
      await LessonList.findByIdAndUpdate(_id, { title, grade }, { new: true, runValidators: true }),
  );

  const res = await Promise.all(query);

  return res;
};

export const lessonListQuery = { getLessonList };

export const lessonListMutation = { addLessonList, updateLessonList };
