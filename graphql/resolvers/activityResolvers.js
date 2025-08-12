import { GraphQLError } from 'graphql';
import Activity from '../../http/models/activityModel.js';
import Lesson from '../../http/models/lessonModel.js';
import User from '../../http/models/userModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';
import dateRange from '../../http/utils/dateRange.js';

const getAllActivities = async (_, { input }, { accessToken }) => {
  //Verify user and get user role and ID
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher', 'student');

  //Add teacher ID on the query input
  if (role === 'teacher') input.teacher = teacher;

  //Restructure date range in case of existing on query input
  if (input.dateRange) {
    input.createdAt = dateRange(input.dateRange);
    delete input.dateRange;
  }

  //Find activities with the query input
  const activities = await Activity.find(input);

  //Throw an error if no activities found
  if (!activities.length) throw new GraphQLError('No activity found with the criteria.', { extensions: { code: 404 } });

  return activities;
};

const getMyActivity = async (_, { input }, { accessToken }) => {
  //Verify student and get student ID and class
  const {
    _id: studentId,
    studentClass: { classId },
  } = await verifyToken(accessToken, 'student');

  //Add the class ID on the query input
  input.class = classId;

  //Restructure date range in case of existing on query input
  if (input.dateRange) {
    input.createdAt = dateRange(input.dateRange);
    delete input.dateRange;
  }

  //Filter for activities which include the student
  const studentActivity = ['absences', 'points', 'penalties'].map(field => {
    const obj = {};
    obj[field] = { $elemMatch: { studentId } };
    return obj;
  });

  //Find all activities with the options
  const activities = await Activity.find({ ...input, $or: studentActivity });

  //Filter-out other students activity documents
  for (const activity of activities) {
    ['absences', 'points', 'penalties'].forEach(
      field => (activity[field] = activity[field]?.find(el => el.studentId.toString() === studentId.toString())),
    );
  }

  return activities;
};

const getActivity = async (_, { _id }, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  const criteria = { _id, ...(role === 'teacher' && { teacher }) };

  const activity = await Activity.findOne(criteria);
  if (!activity) throw new GraphQLError('No activity found with this ID', { extensions: { code: 404 } });

  return activity._doc;
};

const addUpdateActivity = async (_, { input }, { accessToken }) => {
  //Verify user and get user role and ID
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  //Find the lesson, verify the ownership for teacher
  const lesson = await Lesson.findOne(
    { _id: input.lessonId, ...(role === 'teacher' && { teacher }) },
    'class title teacher',
  );

  //Throw an error if no lesson found
  if (!lesson) throw new GraphQLError('No lesson found with this ID for you.', { extensions: { code: 404 } });

  //Add lesson info on the input
  input.lessonTitle = lesson.title;
  input.class = lesson.class;
  input.teacher = lesson.teacher;

  //Grab and delete activity ID from the input
  const { _id } = input;
  delete input._id;

  //Update the activity in case that activity ID exists
  let activity;
  if (_id) {
    activity = await Activity.findByIdAndUpdate(_id, input, { new: true, runValidators: true });

    //Create an activity in case that activity ID lacks
  } else {
    activity = await Activity.create(input);
  }

  return activity._doc;
};

const deleteActivity = async (_, { _id }, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  const criteria = { _id, ...(role === 'teacher' && { teacher }) };

  const activity = await Activity.findOneAndDelete(criteria);
  if (!activity) throw new GraphQLError('No activity found with this ID', { extensions: { code: 404 } });

  return `Activity for ${activity.lessonTitle} lesson has been deleted successfully.`;
};

const teacher = async parent => User.findById(parent.teacher);

export const activityQuery = { getAllActivities, getMyActivity, getActivity };

export const activityMutation = { addUpdateActivity, deleteActivity };

export const activityPopulation = { teacher };
