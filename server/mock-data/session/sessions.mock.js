const _ = require('lodash');
// const sessionStruct = require('./session.struct').struct;
// const mapObjectToStruct = require('../../utils/common').mapObjectToStruct;
const { getRandomInt, createErrorObject } = require('../../utils/common');

const SECOND = 1000; // 1 second
const MINUTE = SECOND * 60; // 1 minute
const HOUR = MINUTE * 60; // 1 hour
// const DAY = HOUR * 24; // 1 day
const TIMEOUT = HOUR;
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const USERS = {
  0: {
    username: 'admin',
    password: 'propel',
    role: ROLES.ADMIN,
  },
  1: {
    username: 'user',
    password: 'propel',
    role: ROLES.USER,
  },
};

const sessions = {};
const tokenTimeouts = {};

function logIn({ username, password }) {
  const user = USERS[_.find(Object.keys(USERS), (key) => USERS[key].username === username)];
  if (user && user.password === password) {
    const token = String(getRandomInt(0, 1000000));
    const session = {
      username: user.username,
      role: user.role,
      token,
    };

    sessions[token] = session;

    tokenTimeouts[token] = setTimeout(() => {
      delete sessions[token];
    }, TIMEOUT);
    return session;
  }

  return false;
}

function refreshToken(token) {
  clearTimeout(tokenTimeouts[token]);
  tokenTimeouts[token] = setTimeout(() => {
    delete sessions[token];
  }, TIMEOUT);
}

function logOut(token) {
  delete sessions[token];
}

function checkLogin(token, res, handler) {
  const isLoggedUser = !!sessions[token];
  if (!isLoggedUser) {
    return res.status(401).json(createErrorObject('You are not logged in!'));
  }

  refreshToken(token);
  handler();
}

const mod = {
  sessions,
  logIn,
  logOut,
  refreshToken,
  checkLogin,
};

module.exports = () => mod;
