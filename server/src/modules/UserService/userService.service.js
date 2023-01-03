require('console-stamp')(console, {
  format: ':date(yyyy/mm/dd HH:MM:ss.l) :label',
});

const dbs = require('../database/mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { subtle } = require('crypto');

const saltRounds = 10;

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a user credentials',
    });
  }

  const foundUser = await dbs.usersCollection.findOne({
    email: email,
  });

  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: `User doesn't exist`,
    });
  }
  const result = bcrypt.compareSync(password, foundUser.password);
  if (result) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    //Expire in one day in ms
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: 'Successfully authenticated',
      accessToken,
    });
  } else res.status(401).send('Password incorrect');
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  const foundUser = await dbs.usersCollection.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(204).json({
      success: true,
      message: 'Successfully logged out',
    });
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(204).json({
    success: true,
    message: 'Successfully logged out',
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
    return res.status(400).json({
      success: false,
      message: 'You must provide a user',
    });
  }

  const isExist = await dbs.usersCollection.findOne({
    email: user.email,
  });

  if (isExist) {
    return res.status(409).json({
      success: false,
      message: 'User already exist',
    })
  }
  const hashedPwd = await bcrypt.hash(user.password, 10);
  user.password = hashedPwd;

  dbs.usersCollection
    .insertOne(user)
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: `A new user ${user.email} has been signed up`,
        result,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        success: false,
        message: `Couldn't sign up new user`,
        user: user,
        e,
      });
    });
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await dbs.usersCollection.findOne({ refreshToken });
  if (!foundUser) {
    return res.status(403).json({
      success: false,
      message: `User doesn't exist`,
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) {
      return res.status(403).json({
        success: false,
        message: `User doesn't exist`,
      });
    }
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    );
    res.json({ accessToken });
  });
};

module.exports = {
  signup,
  login,
  logout,
  forgetPassword,
  refreshToken,
};
