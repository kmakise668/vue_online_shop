const express = require('express')
const productsRouter = require('./routes/products.routes')
const db = require('./db')
const multer = require('multer');
const path = require('path');

const PORT = process.env.PORT || 3002

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = 'image-' + uniqueSuffix + fileExtension;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3050');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', productsRouter)

app.post('/api/upload', upload.single('image'), async function(req, res, next) {
    try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        const imagePath = '/images/' + uploadedFile.filename;
        const query = 'INSERT INTO products (image_path) VALUES ($1)';
        const values = [imagePath];
        await db.query(query, values);
        res.status(200).json({ message: 'File uploaded successfully', imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`))