const bcrypt = require("bcryptjs");
const lzString = require("lz-string")


const fs = require('fs');

const Pool = require("pg").Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dashboard',
  password: 'password123',
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProducts = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
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

const getProductById = async (productId, request, response) => {
  const id = parseInt(productId.productId);
  
  const text = `SELECT * FROM products WHERE id = $1`;
  const values = [id];
  return (await pool.query(text, values)).rows;
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

const getProduct = (request, response) => {
  //const {user, pwd} = request.body;
  const title = request.body.title;
  const category = request.body.category;

  let product_obj;

  return pool.query('SELECT title, category FROM products WHERE title = $1 AND category = $2', [title, category], (error, results) => {
    if (error) {
      throw error
    }
    product_obj = results.rows
    
    if(product_obj) {
        response.status(200);
    }
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

const createProduct = (product) => {
  const title = product.titolo;
  const category = product.categoria;
  const description = product.descrizione;
  const price = product.prezzo;
  const image = product.image;
  image.mv('./upload/' + image.name);
  
  /**
   * Funzione che serve per ottenere l'estensione di un file
   * @param str 
   * @returns 
   */
  function getImageExtension(str) {
    return str.split('.')[1];
  }

  setTimeout(() => {
    const extension = getImageExtension(image.name);
    //const prefix = "data:image/"+extension+";base64,"
    let imageAsBase64 = fs.readFileSync('./upload/' + image.name, 'base64');
    // Prima di salvare l'immagine la comprimo
    imageAsBase64 = lzString.compressToBase64(imageAsBase64);
    
    /*
    console.log("COMPRESSED:",imageAsBase64.length)
    console.log("DECOMPRESSED:",lzString.decompressFromBase64(imageAsBase64).length)
    */

    // Controllo che i dati ricevuti non siano vuoti
    if ((title == undefined || title == null || title == '')
      || (category == undefined || category == null || category == '')
      || (description == undefined || description == null || description == '')
      || (price == undefined || price == null || category == '')) {
      return 1;
    }

    pool.query('INSERT INTO products (title, category, description, price, img, img_ext) VALUES ($1, $2, $3, $4, $5, $6)', [title, category, description, price, imageAsBase64, extension], (error, results) => {
      if (error) {
        throw error
      }
    })
    fs.unlinkSync('./upload/' + image.name)
  }, 1500);
  
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

const updateProduct = (request, response) => {
  const id = parseInt(request.params.productId)
  const { title, category, description, price } = request.body


  pool.query(
    'UPDATE products SET title = $1, category = $2, description = $3, price = $4 WHERE id = $5',
    [title, category, description, price, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Product modified with ID: ${id}`)
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
  getProducts,
  getUser,
  getProduct,
  getUserById,
  getProductById,
  createUser,
  createProduct,
  updateUser,
  updateProduct,
  deleteUser,
}