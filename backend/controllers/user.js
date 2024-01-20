const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

const getUsers = async () => User.find();

const getUser = async (id) =>
  User.findById(id).populate({
    path: 'orderedHotels',
    populate: ['hotel', 'client'],
  });

const getRoles = async () => [
  { id: ROLES.ADMIN, name: 'Admin' },
  { id: ROLES.MODERATOR, name: 'Moderator' },
  { id: ROLES.USER, name: 'User' },
];

const register = async (login, password) => {
  if (!password) {
    throw new Error('Password is empty');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: passwordHash,
  });

  const token = generate({ id: user.id });

  return { user, token };
};

const login = async (login, password) => {
  const user = await User.findOne({ login })
  .populate({
    path: 'orderedHotels',
    populate: ['hotel', 'client'],
  });

  if (!user) {
    throw new Error('Login not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user.id });

  return {
    user,
    token,
  };
};

module.exports = {
  register,
  login,
  getRoles,
  getUsers,
  getUser,
};
