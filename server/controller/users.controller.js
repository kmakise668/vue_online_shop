const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

// const session = require('express-session'); // Подключаем express-session



async function findUserByEmail(email) {
    try {
        console.log('Finding user by email:', email);
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('Found user:', user.rows[0]);
        return user.rows[0];
    } catch (error) {
        console.error('Error while finding user by email:', error);
        return res.status(500).json({ message: 'Internal server error' });
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
        console.log('Generating tokens for user:', user);
        const accessToken = jwt.sign({ email: user.email, role: user.role, id: user.id }, 'your-secret-key', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email: user.email }, 'your-refresh-secret-key', { expiresIn: '7d' });

        const existingRefreshToken = await db.query('SELECT * FROM refresh_tokens WHERE id = $1', [user.id]);
        if (existingRefreshToken.rows.length > 0) {
            // Если запись с таким user.id уже существует, обновите refreshToken вместо вставки новой записи
            const updateRefreshTokenQuery = 'UPDATE refresh_tokens SET token = $2 WHERE id = $1';
            await db.query(updateRefreshTokenQuery, [user.id, refreshToken]);
        } else {
            // Если записи с user.id нет, вставьте новую запись
            const saveRefreshTokenQuery = 'INSERT INTO refresh_tokens (id, token) VALUES ($1, $2)';
            await db.query(saveRefreshTokenQuery, [user.id, refreshToken]);
        }

        console.log('Generated tokens:', { accessToken, refreshToken });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error while generating tokens:', error);
        throw error;
    }
}

class UsersController {

    async createUsers(req, res) {
        const { name, password, email, role } = req.body;

        try {
            const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: 'Пользователь с такой почтой уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.query(
                'INSERT INTO users (name, password, email, role) VALUES ($1, $2, $3,  $4) RETURNING *', [name, hashedPassword, email, role]
            );


            // Генерация токенов
            const tokens = await generateTokens(newUser.rows[0]);

            const expirationTime = new Date().getTime() + 60000;
            // Отправляем куки на клиентскую сторону
            res.cookie('accessToken', tokens.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                expires: new Date(expirationTime) // Устанавливаем время истечения куки
            });
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });

            // Возвращаем данные о успешной регистрации и авторизации
            res.json({
                message: 'Registration and login successful',
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            });


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
                'UPDATE users SET name = $2, password = $3, email = $4, role = $5 WHERE id = $1 RETURNING *', [id, name, hashedPassword, email, role]
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
            console.log('Logging in with email:', email);
            const user = await findUserByEmail(email);

            if (!user) {
                console.log('User not found:', email);
                return res.status(401).json({ message: 'User not found' });
            }

            const isPasswordValid = await verifyPassword(password, user.password);

            if (!isPasswordValid) {
                console.log('Invalid password for user:', email);
                return res.status(401).json({ message: 'Invalid password' });
            }

            const tokens = await generateTokens(user);
            console.log('Generated tokens:', tokens);
            console.log('Access Token Expiration:', jwt.decode(tokens.accessToken).exp)

            req.session.user = {
                id: user.id,
                email: user.email,
                role: user.role,
            };

            req.session.userId = user.id;
            req.session.refreshToken = tokens.refreshToken;

            console.log('Logged in successfully:', email);
            return res.status(200).json({ accessToken: tokens.accessToken });
        } catch (error) {
            console.error('Login error:', error);
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

// module.exports = { UsersController, sessionMiddleware };