const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // Предполагается, что у вас есть модель User

const router = express.Router();


// router.post('/login', async(req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Получение пользователя из базы данных по email
//         const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (user.rows.length === 0) {
//             // Пользователь с указанным email не найден
//             return res.status(401).json({ message: 'Authentication failed' });
//         }

//         const storedPassword = user.rows[0].password;

//         // Сравнение хэшированного пароля из базы данных с введенным паролем
//         const isPasswordValid = await bcrypt.compare(password, storedPassword);

//         if (!isPasswordValid) {
//             // Пароль неверный
//             return res.status(401).json({ message: 'Authentication failed' });
//         }

//         // Аутентификация успешна
//         res.json({ message: 'Authentication successful' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
module.exports = router;