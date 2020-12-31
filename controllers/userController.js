const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1 - create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword'
      ),
      400
    );
  // 2 - filtered out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3 - update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(500).jason({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(500).jason({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  res.status(500).jason({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  res.status(500).jason({
    status: 'error',
    message: 'This route is not yet defined!',
  });
});
