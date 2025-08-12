import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import User from '../../http/models/userModel.js';
import Lesson from '../../http/models/lessonModel.js';
import ExamScore from '../../http/models/examScoreModel.js';
import School from '../../http/models/schoolModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';
import queueJob from '../../http/utils/queueJob.js';

const getAllUsers = async (_, { input }, { accessToken }) => {
  //Verify the user, take user ID and user role
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  //Assign the inputs to a variable for better use
  const criteria = input || {};

  if (role === 'teacher') {
    //Set the queries user role to student
    criteria.role = 'student';

    //Find the classes of the teacher
    const lessons = await Lesson.find({ teacher }, 'class');
    const classIds = lessons.map(el => el.class.toString());

    //Throw an error if the teacher classes does not match the input class ID
    if (criteria?.classId && !classIds.includes(incriteriaput.classId))
      throw new GraphQLError('You are not the teacher of this class.', { extensions: { code: 403 } });

    //Assign the teacher class IDs to the queried class
    if (!criteria.classId) criteria.classId = { $in: classIds };
  }

  if (criteria.classId) {
    //Add the classId as a nested field to the studentClass
    criteria['studentClass.classId'] = criteria.classId;

    //Remove the main classId field from criteria
    delete criteria.classId;
  }

  //Find users with the criteria
  const users = await User.find(criteria);
  if (!users.length) throw new GraphQLError('No users found with the criteria.', { extensions: { code: 404 } });

  return users;
};

const getUser = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const user = await User.findById(_id);
  if (!user) throw new GraphQLError('No user found with this ID.', { extensions: { code: 404 } });

  return user._doc;
};

const getMe = async (_, __, { accessToken }) => verifyToken(accessToken);

const updateUser = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');
  const { _id } = input;
  delete input._id;

  const user = await User.findByIdAndUpdate(_id, input, { new: true, runValidators: true });
  if (!user) throw new GraphQLError('There is no user with this ID.', { extensions: { code: 404 } });

  return user._doc;
};

const updateMe = async (_, { input }, { accessToken }) => {
  const { _id } = await verifyToken(accessToken);

  const user = await User.findByIdAndUpdate(_id, input, { new: true, runValidators: true });

  return user._doc;
};

const deleteUsers = async (_, { _ids }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const { deletedCount } = await User.deleteMany({ _id: { $in: _ids } });
  if (!deletedCount) throw new GraphQLError('No users found with the specified IDs.', { extensions: { code: 404 } });

  return `${deletedCount} user(s) have been deleted successfully.`;
};

const determineStudentsClass = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');
  const { students } = input;
  delete input.students;

  const determinedClass = await User.updateMany(
    { _id: { $in: students } },
    { studentClass: input },
    { runValidators: true },
  );
  if (!determinedClass.matchedCount)
    throw new GraphQLError('No students found with the specified IDs.', { extensions: { code: 404 } });

  return `${determinedClass.modifiedCount} student(s) have been added to the class ${input.classAlias}.`;
};

const calculateReportCard = async (_, { input }, { accessToken }) => {
  //Restrict access to manager only
  await verifyToken(accessToken, 'manager');

  //Create suitable search criteria with conditional properties
  const criteria = {
    role: 'student',
    ...(input.students && { _id: { $in: input?.students } }),
    ...(input.classId && { 'studentClass.classId': input?.classId }),
    ...(input.classGrade && { 'studentClass.classGrade': input?.classGrade }),
  };

  //Find students with the criteria
  const students = await User.find(criteria);

  //Throw an error in case of matching none
  if (!students.length) throw new GraphQLError('No students found with this criteria.', { extensions: { code: 404 } });

  //Store students IDs into an array
  const studentIDs = students?.map(el => el.id);

  //A function to be called with the queue containing transactions
  const calculateTransaction = async function (studentId) {
    //Starting a session
    const session = await mongoose.startSession();

    //Starting the transaction
    await session.withTransaction(async () => {
      //Finding exam scores with students IDs and populating exams
      const examScores = await ExamScore.find({ studentId }, 'score exam').populate({
        path: 'exam',
        select: 'semester type lessonTitle',
      });

      //Restructure exam data for student report card
      const formattedExamScores = examScores.map(({ score, exam }) => {
        return { semester: exam.semester, type: exam.type, lessonTitle: exam.lessonTitle, score };
      });

      //Update user with restructred data
      await User.findByIdAndUpdate(studentId, { studentReport: formattedExamScores }, { runValidators: true });

      return;
    });
  };

  //Running the queue with students
  queueJob('Report Card', studentIDs, calculateTransaction);

  //Return a string with the number of students
  return `${students.length} student(s) have been queued for calculating report card.`;
};

const school = async parent => School.findById(parent.school);

export const userQuery = { getAllUsers, getUser, getMe };

export const userMutation = { updateUser, updateMe, deleteUsers, determineStudentsClass, calculateReportCard };

export const userPopulation = { school };
