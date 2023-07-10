// const db = require('../db')

// class UsersController {
//     async createUsers(req, res) {
//         const { name, password, email } = req.body
//         const addUsers = await db.query(`INSERT INTO users (name, password, email) values ($1, $2, $3) RETURNING *`, [name, password, email])
//         res.json(addUsers.rows[0])
//     }
//     async getUsers(req, res) {
//         const users = await db.query('SELECT * FROM users')
//         res.json(users.rows)
//     }
//     async getOneUsers(req, res) {
//         const id = req.params.id
//         const user = await db.query('SELECT * FROM users where id = $1', [id])
//         res.json(user.rows[0])
//     }
//     async updateUsers(req, res) {
//         const { id, name, password, email } = req.body
//         const user = await db.query('UPDATE users set name = $2, password = $3, email = $4  where id = $1 RETURNING *', [id, name, password, email])
//         res.json(user.rows[0])
//     }
//     async deleteUsers(req, res) {
//         const id = req.params.id
//         const user = await db.query('DELETE  FROM users where id = $1', [id])
//         res.json(user.rows[0])
//     }
// }


// module.exports = new UsersController()



const bcrypt = require('bcrypt');
const db = require('../db');

class UsersController {
    async createUsers(req, res) {
        const { name, password, email } = req.body;

        try {
            const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.query(
                'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *', [name, hashedPassword, email]
            );

            res.json({ message: 'Registration successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM users');
        res.json(users.rows);
    }

    async getOneUsers(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }

    async updateUsers(req, res) {
        const { id, name, password, email } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await db.query(
                'UPDATE users SET name = $2, password = $3, email = $4 WHERE id = $1 RETURNING *', [id, name, hashedPassword, email]
            );
            res.json(user.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUsers(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UsersController();