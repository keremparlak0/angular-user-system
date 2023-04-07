const {  Pool } = require('pg')


const pool = new Pool({
    host: 'localhost',
    port: 9999,
    database: 'angular',
    user: 'postgres',
    password: 'password',
})

// pool
//     .query('select * from users')
//     .then(res => console.log(res.rows))

module.exports = pool