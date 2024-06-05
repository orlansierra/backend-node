const db = require('../db');

const contactsRouter = require('express').Router();
const REGEX_NAME = /^[A-Z][a-z]*[ ][A-Z][a-z]*$/;
const REGEX_NUMBER = /^[0](212|412|414|424|416|426)[0-9]{7}$/;

contactsRouter.post('/', async (request, response) => {
  try {
    //obtener el email del body
    const { name, phone } = request.body;
    console.log(name, phone);

    //validar el nombre y el telefono
    if (!REGEX_NAME.test(name)) {
      return response.status(400).json({ error: 'el nombre es invalido' });
    } else if (!REGEX_NUMBER.test(phone)) {
      return response.status(400).json({ error: 'el numero es invalido' });
    }

    //crear el usuario en la base de datos
    const statement = db.prepare(
      `INSERT INTO contacts (name, phone, user_id) VALUES (?, ?, ?) RETURNING *
    `,
    );
    const newUser = statement.get(name, phone, Number(request.query.userId));

    //para comparar que el gamil ya existe
    return response.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return response.status(400).json({ error: 'el numero ya existe' });
    }
    //esto se coloca cuando aparece un error desconocido
    return response.sendStatus(400);
  }
});

//Elimina un contacto por su id
contactsRouter.get('/', async (request, response) => {
  try {
    //obtener el id del body
    const id = statement.get(Number(request.query.userId));
    console.log(id);
    //crear el usuario en la base de datos
    const statement = db.prepare(
      `DELETE FROM contacts WHERE user_id = 1 RETURNING *
    `,
    );
    return response.status(200).json({ message: 'Contacto eliminado exitosamente' });
  } catch (error) {
    console.log(error);
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return response.status(400).json({ error: 'el contacto ya fue elimando' });
    }
    //esto se coloca cuando aparece un error desconocido
    return response.sendStatus(400);
  }
});
module.exports = contactsRouter;
