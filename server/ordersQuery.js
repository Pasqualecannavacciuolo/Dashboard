const { response } = require("express");


const Pool = require("pg").Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dashboard',
  password: 'password123',
  port: 5432,
});
const getOrders = (request, response) => {
  pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrderById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createOrder = (request, response) => {
  const stato = "ordinato"

  pool.query('INSERT INTO orders (status) VALUES ($1)', [stato], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Order added with ID: ${results.insertId}`)
  })
}

const updateOrder = (request, response) => {
  const id = parseInt(request.params.id)
  const { status } = request.body

  pool.query(
    'UPDATE orders SET status = $1 WHERE id = $2',
    [status, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Order modified with ID: ${id}`)
    }
  )
}

const deleteOrder = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Order deleted with ID: ${id}`)
  })
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
}