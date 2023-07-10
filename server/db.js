const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "node_postgres",
    password: '2525'
})


// module.exports = pool

module.exports = {
    query: (text, params) => pool.query(text, params)
};