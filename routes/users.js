const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
  return response.status(200).json({ hola: 'mundo' });
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  console.log(body);
  return response.status(200).json({ body });
});

module.exports = usersRouter;
