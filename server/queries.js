const bcrypt = require("bcryptjs");

const Pool = require("pg").Pool
const pool = new Pool({
  user: 'postgres',
  host: '172.17.0.2',
  database: 'postgres',
  password: 'password123',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUser = (request, response) => {
  //const {user, pwd} = request.body;
  const user = request.body.user;
  const pwd = request.body.pwd;

  let user_obj;

  return pool.query('SELECT username, pwd FROM accounts WHERE username = $1', [user], (error, results) => {
    if (error) {
      throw error
    }
    user_obj = results.rows
    bcrypt.compare(pwd, user_obj[0].pwd, (err, res) => {
      if(res == true) {
        response.status(200);
      }
    });
  });
  
}

const createUser = (user) => {
  const username = user.user;
  const encrypted_pwd = user.encrypted_password;

  // Controllo che i dati ricevuti non siano vuoti
  if((username == undefined || username == null || username == '') || (encrypted_pwd == undefined || encrypted_pwd == null || encrypted_pwd == '')) {
    return 1;
  }

  pool.query('INSERT INTO accounts (username, pwd) VALUES ($1, $2)', [username, encrypted_pwd], (error, results) => {
    if (error) {
      throw error
    }
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}