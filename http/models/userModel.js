import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide your name.'],
    validate: {
      validator: function (val) {
        return val.split(' ').length >= 2;
      },
      message: 'Please provide your full name.',
    },
  },
  father: {
    type: String,
    trim: true,
    required: [true, 'Please provide your father name.'],
  },
  idCard: {
    type: String,
    required: [true, 'Please provide your ID card number.'],
    unique: [true, 'This ID card number already exists.'],
  },
  birthdate: Date,
  role: {
    type: String,
    enum: {
      values: ['student', 'teacher', 'manager', 'admin'],
      message: 'User role must be either student, teacher, manager or admin.',
    },
    default: 'student',
    lowercase: true,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  phone: {
    type: String,
    minlength: [10, 'A phone number cannot be less than 10 characters.'],
    maxlength: [10, 'A phone number cannot be more than 10 characters.'],
    required: [true, 'Please provide your phone number.'],
    unique: [true, 'This phone number already exists.'],
    set: function (val) {
      return val.replace(/^(?:\+98|98|0)/, '');
    },
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Please provide your school ID.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'Password cannot be less than 8 characters.'],
    maxlength: [32, 'Password cannot be more than 32 characters.'],
    validate: {
      validator: function (val) {
        return !/(\$|\.)/g.test(val);
      },
      message: '$ and dot signs are not allowed to use in a password.',
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Your passwords do not match.',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
  studentClass: {
    classId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
    },
    classGrade: Number,
    classAlias: String,
  },
  studentReport: [
    {
      semester: {
        type: Number,
        enum: {
          values: [1, 2],
          message: 'Semester number must be either 1 or 2.',
        },
      },
      type: {
        type: String,
        enum: {
          values: ['midterm', 'final'],
          message: 'Exam type must be either midterm or final.',
        },
      },
      lessonId: {
        type: mongoose.Schema.ObjectId,
        ref: 'School',
      },
      score: {
        type: Number,
        default: 0,
        min: 0,
        max: 20,
      },
    },
  ],
});

//Hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_COST);
  this.passwordConfirm = undefined;
  next();
});

//Set password change time
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//Filter-out deactivated users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//Verify password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Check changed password
userSchema.methods.passwordChangedAfter = function (issueTime) {
  return issueTime < this.passwordChangedAt?.getTime() / 1000;
};

//Create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordResetExpires = Date.now() + process.env.PASSWORD_RESET_EXPIRES_MIN * 60 * 1000;

  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
