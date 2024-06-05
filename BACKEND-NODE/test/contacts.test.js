const supertest = require('supertest');
const app = require('../app');
const { describe, test, expect, beforeAll } = require('@jest/globals');
const db = require('../db');
const api = supertest(app);
let user;

describe('ruta contacts', () => {
  describe('crear contactos', () => {
    beforeAll(() => {
      const statementDeleteUsers = db.prepare('DELETE FROM users');
      statementDeleteUsers.run();
      
      const statementCreateUser = db.prepare(
        `INSERT INTO users (email) VALUES (?) RETURNING *
      `,
      );
      user = statementCreateUser.get('maryan@gmail.com');
    });
    test('crea un contacto cuando todo es correcto', async () => {
      const response = await api
        .post('/api/contacts')
        .query({ userId: user.user_id})
        .send({ name: 'Nazareth Torres', phone: '04123452685' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({
         contact_id: 1,
         name: 'Nazareth Torres',
         phone: '04123452685',
         user_id: 1
        });
    });
    test('devuelve un error cuando el numero ya existe', async () => {
        const response = await api
          .post('/api/contacts')
          .query({ userId: user.user_id})
          .send({name: 'Maryander Torres', phone: '04123452685' })
          .expect(400)
          .expect('Content-Type', /json/);
        expect(response.body).toStrictEqual({ error: 'el numero ya existe' });
      });
      test('devuelve un error cuando el nombre es invalido', async () => {
        const response = await api
          .post('/api/contacts')
          .send({name: 'ryander rres', phone: '04123452685' })
          .expect(400)
          .expect('Content-Type', /json/);
        expect(response.body).toStrictEqual({ error: 'el nombre es invalido' });
      });
      test('devuelve un error cuando el numero es invalido', async () => {
        const response = await api
          .post('/api/contacts')
          .send({name: 'Nazareth Torres', phone: '041234999952685' })
          .expect(400)
          .expect('Content-Type', /json/);
        expect(response.body).toStrictEqual({ error: 'el numero es invalido' });
      });
  });
});
