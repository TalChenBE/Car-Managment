require('console-stamp')(console, {
  format: ':date(yyyy/mm/dd HH:MM:ss.l) :label',
});

const dbs = require('../database/mongodb');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const login = async (req, res) => {
  const { authenticated } = req.session;
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: 'You must provide a user credentials',
    });
  }

  if (!authenticated) {
    const isExist = await dbs.usersCollection.findOne({
      email: email,
    });

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: `User doesn't exist`,
      });
    }
    const result = bcrypt.compareSync(password, isExist.password);
    if (result) {
      req.session.authenticated = true;
      res.send('Successfully authenticated');
    } else res.send('Password incorrect');
  } else {
    res.send('Already authenticated');
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.send('Successfully logged out');
  });
};

const forgetPassword = async (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(404).json({
      success: false,
      message: 'You must provide a user credentials',
    });
  }

  const isExist = await dbs.usersCollection.findOne({
    email: email,
  });

  if (!isExist) {
    return res.status(404).json({
      success: false,
      message: `User doesn't exist`,
    });
  }


};

const signup = async (req, res) => {
  const user = req.body;

  if (!user || Object.keys(user).length === 0) {
    return res.status(404).json({
      success: false,
      message: 'You must provide a user',
    });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  const isExist = await dbs.usersCollection.findOne({
    email: user.email,
  });

  if (isExist) {
    return res.status(404).json({
      success: false,
      message: 'User already exist',
    });
  }

  dbs.usersCollection
    .insertOne(user)
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: 'A new user has been signed up',
        result,
      });
    })
    .catch((e) => {
      return res.status(400).json({
        success: false,
        message: `Couldn't sign up new user`,
        user: user,
        e,
      });
    });
};

module.exports = {
  signup,
  login,
  logout,
  forgetPassword,
};
