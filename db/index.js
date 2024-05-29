const Database = require('better-sqlite3');
const db = new Database('contactos.db', { verbose: console.log });

module.exports = db;
