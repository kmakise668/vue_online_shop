const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');


class UsersController {
    async createUsers(req, res) {
        const { name, password, email, role } = req.body;

        try {
            const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.query(
                'INSERT INTO users (name, password, email, role) VALUES ($1, $2, $3,  $4) RETURNING *', [name, hashedPassword, email, role]
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
        const { id, name, password, email, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await db.query(
                'UPDATE users SET name = $2, password = $3, email = $4 role = $5 WHERE id = $1 RETURNING *', [id, name, hashedPassword, email, role]
            );
            res.json(user.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async loginUser(req, res) {
        const { email, password, role } = req.body;

        try {
            // Получение пользователя из базы данных по email
            const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            if (user.rows.length === 0) {
                // Пользователь с указанным email не найден
                return res.status(401).json({ message: 'Authentication failed' });
            }

            const storedPassword = user.rows[0].password;

            // Сравнение хэшированного пароля из базы данных с введенным паролем
            const isPasswordValid = await bcrypt.compare(password, storedPassword);

            if (!isPasswordValid) {
                // Пароль неверный
                return res.status(401).json({ message: 'Authentication failed' });
            }

            // Аутентификация успешна, создаем токен и отправляем его клиенту
            const token = jwt.sign({ email: user.rows[0].email }, 'your-secret-key', { expiresIn: '1h' });
            const role = user.rows[0].role; // Получение роли пользователя из базы данных
            res.json({ message: 'Authentication successful', token, role });
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