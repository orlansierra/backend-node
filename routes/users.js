const db = require('../db');

const usersRouter = require('express').Router();
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

usersRouter.post('/', async (request, response) => {
  try {
    //obtener el email del body
    const { email } = request.body;
    //validar que el email sea valido
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: 'El email es invàlido' });
    }

    //crear usuario en la base de datos

    const statement = db.prepare('INSERT INTO users (email) VALUES (?)');
    statement.run(email);
    return response.status(200).json({ message: 'Usuario Creado' });
  } catch (error) {
    console.log(error);
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return response.status(400).json({ error: 'el email ya fue creado' });
    }
    return response.sendStatus(400);
  }
});

module.exports = usersRouter;
