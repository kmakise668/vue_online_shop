const express = require('express')
const productsRouter = require('./routes/products.routes')
const db = require('./db')

const PORT = process.env.PORT || 3001


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // Генерируем уникальное имя файла
    }
});

const upload = multer({ storage: storage });



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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3050');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', productsRouter)



app.post('/api/upload', upload.single('image'), async function(req, res, next) {
    // Доступ к загруженному файлу через req.file
    const uploadedFile = req.file;

    // Выполнение SQL-запроса для сохранения пути к файлу в базе данных
    const imagePath = '/images/' + uploadedFile.filename;
    const query = 'INSERT INTO node_postgres (image_path) VALUES ($1)';
    const values = [imagePath];

    try {
        const client = await pool.connect();
        await client.query(query, values);
        client.release();

        // Отправка ответа клиенту
        res.status(200).json({ message: 'Файл успешно загружен', imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.listen(PORT, () => console.log(`server started on post ${PORT}`))


// const express = require('express');
// const productsRouter = require('./routes/products.routes');
// const db = require('./db');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3050');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public/images');
//     },
//     filename: function(req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = path.extname(file.originalname);
//         const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
//         cb(null, fileName);
//     },
// });

// const upload = multer({ storage: storage });

// app.post('/api/products', upload.single('image'), async(req, res) => {
//     const { name, article, price, available, category } = req.body;
//     const imagePath = '/images/' + req.file.filename;

//     try {
//         // Выполните SQL-запрос для сохранения данных в базе данных
//         const query = 'INSERT INTO products (name, image,  price, article, available, category) VALUES ($1, $2, $3, $4, $5, $6)';
//         const values = [name, imagePath, price, article, available, category];
//         await db.query(query, values);

//         // Отправка ответа клиенту
//         res.status(200).json({ message: 'Product added successfully', imagePath });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));