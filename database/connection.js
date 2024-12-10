const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB.PASS,
    db_name: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db', err);
        
    } else {
        console.log('DB is connected');
        
    }
})

module.exports = connection