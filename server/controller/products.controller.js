const bcrypt = require('bcrypt');
const db = require('../db');

class ProductsController {
    async createProducts(req, res) {
        const { name, article, price, available, image, category, description } = req.body
        const addProduct = await db.query(`INSERT INTO products (name,image,  price, article, available, category, description ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, image, price, article, available, category, description])
        res.json(addProduct.rows[0])
    }
    async getProducts(req, res) {
        const products = await db.query('SELECT * FROM products')
        res.json(products.rows)
    }
    async getOneProducts(req, res) {
        const id = req.params.id
        const product = await db.query('SELECT * FROM products where id = $1', [id])
        res.json(product.rows[0])
    }
    async updateProducts(req, res) {
        const { id, name, image, price, article, available, category, description } = req.body
        const product = await db.query('UPDATE products set name = $2, image = $3, price = $4,  article = $5, available = $6, category = $7   description = $8 where id = $1 RETURNING *', [id, name, image, price, article, available, category, description])
        res.json(product.rows[0])
    }
    async deleteProducts(req, res) {
        const id = req.params.id
        const product = await db.query('DELETE  FROM products where id = $1', [id])
        res.json(product.rows[0])
    }
}


module.exports = new ProductsController()