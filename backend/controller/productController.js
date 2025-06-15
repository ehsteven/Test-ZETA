const db_products = require('../config/db');

// Obtener los productos
const getProducts = async (req, res) => {
  let { search = '', page = 1, limit = 10 } = req.query;

  page = parseInt(page, 6);
  limit = parseInt(limit, 6);
  const offset = (page - 1) * limit;

  let queryText = "SELECT * FROM products";
  let countQueryText = "SELECT COUNT(*) FROM products";
  const queryParams = [];

  if (search) {
    queryText += ` WHERE name ILIKE $1 OR category ILIKE $1`;
    countQueryText += ` WHERE name ILIKE $1 OR category ILIKE $1`;
    queryParams.push(`%${search}%`);
  }

  queryParams.push(limit, offset);
  const limitIndex = queryParams.length - 1;
  const offsetIndex = queryParams.length;

  queryText += ` ORDER BY category ASC, name ASC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;

  try {
    const productsResult = await db_products.query(queryText, queryParams);
    const totalResult = await db_products.query(countQueryText, search ? [queryParams[0]] : []);

    const totalProducts = parseInt(totalResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products: productsResult.rows,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.error('Error with conection or request:', error.message);
    res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
};

// Get products by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await db_products.query("SELECT * FROM products WHERE id = $1", [id]);
        if (product.rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.json(product.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error del servidor" });
    }
};


// Only admin
// Create product
const createProduct = async (req, res) => {
    const { name, description, price, image_url, category, stock } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'El nombre y el precio son obligatorios.' });
    }
    try {
        const newProduct = await db_products.query(
            "INSERT INTO products (name, description, price, image_url, category, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, description, price, image_url, category, stock]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// Update
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image_url, category, stock } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'El nombre y el precio son obligatorios.' });
        }

        const updatedProduct = await db_products.query(
            "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, category = $5, stock = $6 WHERE id = $7 RETURNING *",
            [name, description, price, image_url, category, stock, id]
        );

        if (updatedProduct.rows.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.json(updatedProduct.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// Delete
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOp = await db_products.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

        if(deleteOp.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error del servidor" });
    }
};

module.exports = { getProducts, createProduct, getProductById, updateProduct, deleteProduct };

