const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contactos');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

// Rutas backend
app.get('/', async (request, response) => {
  return response.status(200).json({ hola: 'mundo' });
});

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

module.exports = app;
