const db_products = require('../config/db');

// Obtener los productos
const getProducts = async (req, res) => {
  let { search = '', page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
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

  queryText += ` ORDER BY created_date DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;

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
    console.error('Error en conexión o consulta:', error.message);
    res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
};


// Obtener producto por id
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


module.exports = { getProducts, getProductById};
