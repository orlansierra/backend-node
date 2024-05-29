const supertest = require('supertest');
const app = require('../app');
const { test } = require('@jest/globals');
const api = supertest(app);

describe('ruta home', () => {
  test('devuelve respuesta en json con un hola mundo', async () => {
    const response = await api.get('/').expect(200).expect('Content-type', /json/);
    expect(response.body).toStrictEqual({ hola: 'mundo' });
  });
});
