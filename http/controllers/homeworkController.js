import sharp from 'sharp';
import Lesson from '../models/lessonModel.js';
import Homework from '../models/homeworkModel.js';
import HomeworkSubmit from '../models/homeworkSubmitModel.js';
import AppError from '../utils/appError.js';
import multerUpload from '../utils/multerUpload.js';
import { verifyToken } from '../utils/accessToken.js';

const uploadImages = multerUpload.array('images', 10);

const processTeacherImages = async (req, res, next) => {
  //Get the ID and role to find out a teacher user
  const { _id: teacher, role } = await verifyToken(req.accessToken, 'manager', 'teacher');

  //Get lesson ID from request body, exists only when creating a homework
  const { lessonId } = req.body;

  //Check lesson ownership for teachers, in case of creating a homework
  if (role === 'teacher' && lessonId) {
    //Find lesson with lesson ID and teacher ID
    const lesson = await Lesson.findOne({ _id: lessonId, teacher }, 'title class');

    //Throw an error if there is no lesson found for the teacher
    if (!lesson) return next(new AppError('This lesson does not belong to you.', 403));

    //Add the lesson title and class ID on the request body, used for creating new homework
    req.body.lessonTitle = lesson.title;
    req.body.class = lesson.class;
  }

  //Add the teacher ID on the request body, user for both creating and updating homework
  req.body.teacher = teacher;

  //Empty array to store images names
  req.body.images = [];

  //Processing images within the loop
  for (const image of req.files) {
    const filename = `t-${lessonId}-${Date.now()}.jpeg`;
    req.body.images.push(filename);
    await sharp(image.buffer).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`images/teacher/${filename}`);
  }

  return next();
};

const processStudentImages = async (req, res, next) => {
  //Get the student ID and name along with class ID
  const {
    _id: studentId,
    firstname: studentFirstname,
    lastname: studentLastname,
    studentClass: { classId },
  } = await verifyToken(req.accessToken, 'student');

  //Check homework ownership for student
  const homework = await Homework.findOne({ _id: req.params._id, class: classId }, 'deadline');
  if (!homework) return next(new AppError('There is no homework with this ID.', 404));

  //Check deadline of the homework
  if (homework.deadline.getTime() < Date.now()) return next(new AppError('Homework deadline is over.', 403));

  //Include all the data into request body
  req.body = { ...req.body, studentId, studentFirstname, studentLastname, homework: homework._id };

  //Empty array to store images names
  req.body.images = [];

  //Processing images within the loop
  for (const image of req.files) {
    const filename = `s-${homework._id}-${Date.now()}.jpeg`;
    req.body.images.push(filename);
    await sharp(image.buffer).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`images/student/${filename}`);
  }

  return next();
};

const getAllHomeworks = async (req, res, next) => {
  const { _id: teacher, role } = await verifyToken(req.accessToken, 'manager', 'teacher');

  let criteria = {};
  if (role === 'teacher') {
    criteria = { teacher };
  }

  const homeworks = await Homework.find(criteria);

  res.status(200).json({
    status: 'success',
    data: { homeworks },
  });
};

const getAllHomeworksStudent = async (req, res, next) => {
  const {
    studentClass: { classId },
  } = await verifyToken(req.accessToken, 'student');

  const homeworks = await Homework.find({ class: classId });
  if (!homeworks.length) return next(new AppError('There is no homework for you yet.', 404));

  res.status(200).json({
    status: 'success',
    data: { homeworks },
  });
};

const getHomework = async (req, res, next) => {
  const { _id: teacher, role } = await verifyToken(req.accessToken, 'manager', 'teacher');

  if (!req.params?._id) return next(new AppError('Please provide the homework ID.', 400));

  if (role === 'teacher') req.params.teacher = teacher;

  const homework = await Homework.findOne(req.params).populate('submitted');
  if (!homework) return next(new AppError('No homework found with this ID.', 404));

  res.status(200).json({
    status: 'success',
    data: { homework },
  });
};

const getHomeworkStudent = async (req, res, next) => {
  const {
    _id: studentId,
    studentClass: { classId },
  } = await verifyToken(req.accessToken, 'student');

  const { _id } = req.params;
  if (!_id) return next(new AppError('Please provide the homework ID.', 400));

  const homework = await Homework.findOne({ _id, class: classId });
  if (!homework) return next(new AppError('No homework found with this ID.', 404));
  const homeworkSubmit = await HomeworkSubmit.findOne({ homework: _id, studentId });

  res.status(200).json({
    status: 'success',
    data: {
      homework,
      homeworkSubmit,
    },
  });
};

const addHomework = async (req, res, next) => {
  const homework = await Homework.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { homework },
  });
};

const updateHomework = async (req, res, next) => {
  if (req.body.class || req.body.lessonId) return next(new AppError('You cannot modify class or lesson ID.', 403));

  const { _id } = req.params;
  if (!_id) return next(new AppError('Please provide the homework ID.', 400));

  const homework = await Homework.findOneAndUpdate({ _id, teacher: req.body.teacher }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!homework) return next(new AppError('No homework found with the criteria.', 404));

  res.status(200).json({
    status: 'success',
    data: { homework },
  });
};

const deleteHomework = async (req, res, next) => {
  const { _id: teacher, role } = await verifyToken(req.accessToken, 'manager', 'teacher');

  if (!req.params?._id) return next(new AppError('Please provide the homework ID.', 400));

  if (role === 'teacher') req.params.teacher = teacher;

  const homework = await Homework.findOneAndDelete(req.params);
  if (!homework) return next(new AppError('No homework found with the criteria.', 404));

  res.status(200).json({
    status: 'success',
    data: { homework },
    message: `A homework for ${homework.lessonTitle} lesson has been deleted successfully.`,
  });
};

const submitScores = async (req, res, next) => {
  const { _id: teacher, role } = await verifyToken(req.accessToken, 'manager', 'teacher');

  const { _id } = req.params;
  if (!_id) return next(new AppError('Please provide the homework ID.', 400));

  if (role === 'teacher') {
    const homework = await Homework.findOne({ _id, teacher }, '_id');
    if (!homework) return next(new AppError('No homework found with this ID.', 404));
  }

  const scorePromises = req.body.scores?.map(async ({ score, studentId }) => {
    return await HomeworkSubmit.findOneAndUpdate(
      { homework: _id, studentId },
      { score },
      { new: true, runValidators: true },
    );
  });

  const homeworkSubmits = await Promise.all(scorePromises);

  res.status(200).json({
    status: 'success',
    data: { homeworkSubmits },
  });
};

const submitHomework = async (req, res, next) => {
  const homeworkSubmit = await HomeworkSubmit.findOneAndUpdate(
    { homework: req.body.homework, studentId: req.body.studentId },
    req.body,
    { upsert: true, new: true, runValidators: true },
  );

  res.status(201).json({
    status: 'success',
    data: { homeworkSubmit },
  });
};

export default {
  uploadImages,
  processTeacherImages,
  processStudentImages,
  getAllHomeworks,
  getAllHomeworksStudent,
  getHomework,
  getHomeworkStudent,
  addHomework,
  updateHomework,
  deleteHomework,
  submitScores,
  submitHomework,
};
