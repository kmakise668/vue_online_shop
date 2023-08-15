const express = require('express')
const productsRouter = require('./routes/products.routes')
const usersRouter = require('./routes/users.routes')
const session = require('express-session');
const sessionSecret = 'your-session-secret'; // Замените на свой секретный ключ
// const cookieParser = require('cookie-parser');
const db = require('./db')
const authMiddleware = require('./authMiddleware');
const PORT = process.env.PORT || 8080


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

const cors = require('cors')
const app = express()
// app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: 'secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Установите secure: true для HTTPS
// }));

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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1212');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter);
// Применяем middleware к маршрутам, требующим авторизации

app.get('/dashboard', authMiddleware, (req, res) => {
    // Остальной код для обработки страницы dashboard
  });
  
  app.get('/admin', authMiddleware, (req, res) => {
    // Остальной код для обработки страницы admin
    
  });

  

  app.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token not found' });
    }

    try {
        const user = await verifyRefreshToken(refreshToken); // Проверяем Refresh Token

        if (!user) {
            return res.status(401).json({ message: 'Invalid Refresh Token' });
        }

        const accessToken = jwt.sign({ email: user.email, role: user.role }, 'your-secret-key', { expiresIn: '1m' }); // Создаем новый Access Token
        
        console.log('Access Token expired, refreshing...'); // Выводим в консоль при истечении Access Token
        console.log('Access Token refreshed'); // Выводим в консоль после обновления Access Token

        res.json({ accessToken }); // Отправляем новый Access Token в ответ
    } catch (error) {
        console.error('Error while refreshing token:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


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
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');
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