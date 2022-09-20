const apiRouter = require('express').Router();
const {User} = require('../models.js');
const {isCorrectToken} = require("../utils");

apiRouter.use( async (req, res, next) => {
  const token = req.headers['x-token'];
  const isCorrect = await isCorrectToken(token);

  if(isCorrect) {
    return next();
  }

  res.statusCode = 401;
  res.end();
})

apiRouter.get('/users', async (req, res, next) => {
  const users = await User.findAll();
  res.statusCode = 200;
  res.end(JSON.stringify(users));
});
apiRouter.patch('/users', async (req, res, next) => {
  const {isBlock, usersId} = req.body;
  await User.update({
    isBanned: Boolean(isBlock),
  }, {
    where: {
      id: [...usersId]
    }
  });
  res.statusCode = 200;
  res.end();
});
apiRouter.delete('/users', async (req, res, next) => {
  const {usersId} = req.body;
  await User.destroy({
    where: {
      id: [...usersId]
    }
  });
  res.statusCode = 200;
  res.end();
});


module.exports = apiRouter;
