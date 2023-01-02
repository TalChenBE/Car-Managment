const express = require('express');
const dashboard = require('../modules/dashboard/dashboardService');
const userAuth = require('../modules/UserService/userService.service');

const router = express.Router();

const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};

router.post('/treatment/create', dashboard.addTreatment);

router.get('/treatments', protect, dashboard.getAllTreatments);
router.delete('/treatments', protect, dashboard.deleteTreatment);
router.put('/treatments', protect, dashboard.editTreatment);

router.get('/logout', protect, userAuth.logout);
router.get('/login', userAuth.login);
router.get('/forget_password', userAuth.forgetPassword);

router.post('/signup', userAuth.signup);

module.exports = router;
