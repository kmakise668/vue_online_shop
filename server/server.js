const express = require('express')
const productsRouter = require('./routes/products.routes')
const db = require('./db')

const PORT = process.env.PORT || 3056



const app = express()
app.get('/products', async(req, res) => {
    try {
        const products = await db.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2505'); // Установите значение домена вашего клиента
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/api', productsRouter)

app.listen(PORT, () => console.log(`server started on post ${PORT}`))



// const express = require('express');
// const cors = require('cors'); // Добавьте эту строку
// const productsRouter = require('./routes/products.routes');
// const db = require('./db');

// const PORT = process.env.PORT || 3056;

// const app = express();
// app.use(cors()); // Добавьте эту строку перед определением маршрутов
// app.get('/products', async(req, res) => {
//     // Оставьте ваш обработчик запроса без изменений
// });

// // Далее идут остальные настройки и маршруты

// app.listen(PORT, () => console.log(`server started on port ${PORT}`));