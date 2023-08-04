const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');




async function findUserByEmail(email) {
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return user.rows[0]; // Возвращаем пользователя, если найден
    } catch (error) {
        throw error;
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid; // Возвращаем true, если пароль верный, иначе false
    } catch (error) {
        throw error;
    }
}

async function generateTokens(user) {
    try {
        const accessToken = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email: user.email }, 'your-refresh-secret-key', { expiresIn: '7d' });

        // Сохраняем refreshToken в базе данных
        const saveRefreshTokenQuery = 'INSERT INTO refresh_tokens (id, token) VALUES ($1, $2)';
        await db.query(saveRefreshTokenQuery, [user.id, refreshToken]);

        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
}


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

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await findUserByEmail(email);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await verifyPassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const tokens = await generateTokens(user); // Добавлено await здесь

            // Создание сессии на сервере
            req.session.userId = user.id;
            req.session.refreshToken = tokens.refreshToken;

            return res.status(200).json({ accessToken: tokens.accessToken });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteUsers(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UsersController();