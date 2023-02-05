const { response } = require("express");


const Pool = require("pg").Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dashboard',
  password: 'password123',
  port: 5432,
});
const getCarts = (request, response) => {
  pool.query('SELECT * FROM carts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCartById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM carts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCart = (request, response) => {
    const { products_json, user_id } = request.body;
    pool.query('INSERT INTO carts (products, user_id) VALUES ($1, $2)', [products_json, user_id], (error, results) => {
        if (error) {
            throw error
        }
        
        response.status(201).send(`Cart created`)
    })
}

const updateCart = (request, response) => {
  const id = parseInt(request.params.id)
  const { status } = request.body

  pool.query(
    'UPDATE carts SET status = $1 WHERE id = $2',
    [status, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Order modified with ID: ${id}`)
    }
  )
}

const deleteCart = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM carts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Cart deleted with ID: ${id}`)
  })
}

module.exports = {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
}