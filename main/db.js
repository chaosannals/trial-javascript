import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin'
});
connection.connect();

connection.end();