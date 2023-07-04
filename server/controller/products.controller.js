const db = require('../db')

class ProductsController {
    async createProducts(req, res) {
        const { name, article, price, available, category } = req.body
        const addProduct = await db.query(`INSERT INTO products (name, article, price, available, category ) values ($1, $2, $3, $4, $5) RETURNING *`, [name, article, price, available, category])
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
        const { id, name, article, price, available, category } = req.body
        const product = await db.query('UPDATE products set name = $1, article = $2 where id = $3 RETURNING *', [name, id, article, price, available, category])
        res.json(product.rows[0])
    }
    async deleteProducts(req, res) {
        const id = req.params.id
        const product = await db.query('DELETE  FROM products where id = $1', [id])
        res.json(product.rows[0])
    }
}


module.exports = new ProductsController()