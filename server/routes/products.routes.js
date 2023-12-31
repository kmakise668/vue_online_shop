// const Router = require('express')
// const router = new Router()
// const productsController = require('../controller/products.controller')


// router.post('/products', productsController.createProducts)
// router.get('/products', productsController.getProducts)
// router.get('/products/:id', productsController.getOneProducts)
// router.put('/products', productsController.updateProducts)
// router.delete('/products/:id', productsController.deleteProducts)


const express = require('express');
const router = express.Router();
const productsController = require('../controller/products.controller');

router.post('/', productsController.createProducts);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getOneProducts);
router.put('/', productsController.updateProducts);
router.delete('/:id', productsController.deleteProducts);

module.exports = router;



// router.post('/register', async(req, res) => {
//     const { name, password, email } = req.body;

//     try {
//         // Проверка наличия пользователя с указанным email в базе данных
//         const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

//         if (existingUser.rows.length > 0) {
//             // Пользователь с таким email уже существует
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Хеширование пароля
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Сохранение пользователя в базе данных
//         const newUser = await db.query(
//             'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *', [name, hashedPassword, email]
//         );

//         res.json({ message: 'Registration successful' }); // Добавлено сообщение о успешной регистрации
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



// router.post('/login', async(req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Получение пользователя из базы данных по email
//         const user = await User.findOne({ email });

//         if (!user) {
//             // Пользователь с указанным email не найден
//             return res.status(401).json({ message: 'Authentication failed' });
//         }

//         const storedPassword = user.password;

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