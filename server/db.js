const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    passowrd: 'root',
    host: "localhost",
    port: 5432,
    database: "node_postgres",
    password: '2525'
})


module.exports = pool