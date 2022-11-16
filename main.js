const mysql = require("mysql2");
require('dotenv').config();

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('hej')
})

app.listen(3000)

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.MYSQL_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('connected');
    } else {
        console.log(err);
        console.log('connection Failed');
    }
});



app.get('/users', (req, res) => {
    const query = "SELECT * FROM cafe_database.users WHERE userID > 5;";
    mysqlConnection.query(
        query,

        (err, results, fields) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        }
    );
})
