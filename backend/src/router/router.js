const router = require('express').Router();
const {Op} = require('sequelize');
const path = require('path');
const {User} = require('../models.js');
const apiRouter = require('./api.js');
const {getHash} = require('../utils.js');
const {isValidEmail, b64EncodeUnicode, isCorrectToken} = require("../utils");


const htmlPath = path.resolve(path.resolve(__dirname, '../static/index.html'));

router.use('/api', apiRouter);

router.get('/login', async (req, res, next) => {
  const {token} = req.query;
  if(typeof token !== 'string'){
    return next();
  }
  const isCorrect = await isCorrectToken(token);

  if (isCorrect) {
    res.statusCode = 200;
    res.json({token: token});
    return;
  }

  res.statusCode = 401;
  res.end();
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  if (!isValidEmail(email) || !password) {
    res.statusCode = 400;
    res.end(`email or password is incorrect`);
    return;
  }

  const user = await User.findOne({
    where: {
      [Op.and]: [
        {email: email},
        {password: getHash(password)}
      ]
    }
  });

  if (user && !user.isBanned) {
    res.statusCode = 200;
    res.json({token: b64EncodeUnicode(email)});
    user.lastVisit = new Date().toISOString();
    await user.save();
    return;
  }

  res.statusCode = 400;
  res.end('email or password is incorrect');
});

router.post('/register', async (req, res) => {
  const {email, name, password} = req.body;

  if (!password || !isValidEmail(email) || !name) {
    res.statusCode = 400;
    res.end(`name / password or email is incorrect`);
    return;
  }

  const user = await User.findOne({
    where: {
      [Op.or]: [
        {name: name},
        {email: email}
      ]
    }
  });

  if (user) {
    res.statusCode = 400;
    res.end(`user with email ${email} OR name ${name} already exists.`);
    return;
  }

  const newUser = await User.create({name, email, password: getHash(password), lastVisit: new Date().toISOString()})
  res.statusCode = 200;

  res.json({token: b64EncodeUnicode(newUser.email)});
});

router.get('*', async (req, res) => {
  res.sendFile(htmlPath);
});


module.exports = router
