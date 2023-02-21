require("dotenv").config();

/*const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);*/
const db = require("./queries");
const table_orders = require("./ordersQuery");
const table_carts = require("./cartsQuery");


const Pool = require("pg").Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dashboard',
  password: 'password123',
  port: 5432,
})


const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const corsOptions = {
    origin: ['http://127.0.0.1:4001','http://localhost:3000','http://localhost:4001', 'https://dashboard-one-black.vercel.app'],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(fileupload());


app.post("/register", cors(corsOptions), async (req, res) => {
    try {
        // Ottengo i dati dal form
        const { user, pwd } = req.body;

        // Cripto la password
        const encrypted_password = await bcrypt.hash(pwd, 10);
        if (!(user && pwd)) {
            res.status(400).send("Username e password non presenti nella REQUEST");
        }

        // Aggiungo l'utente al Database
        const user_obj = { user, encrypted_password };
        let result = db.createUser(user_obj);

        // Tutto è andato bene passo i dati nella RESPONSE
        if (result == undefined) {
            res.status(201).json({ user, encrypted_password })
        }

        // C'è stato qualche problema nell'inserimento nel Database
        if (result == 1) {
            res.status(409);
        }

        /*
        // Aggiungo l'utente al Database
        const user_obj = { user, encrypted_password };

        // Creazione usando supabase
        const { error } = await supabase
        .from('accounts')
        .insert(user_obj);

        // Se non ci sono errori aggiungi al DB
        if(!error) {
            res.status(201).json({ user, encrypted_password })
        } else if(error) {
            res.status(409);
        }*/
    
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", cors(corsOptions), async (req, res) => {

    // Ottengo i dati dal form
    const { user, pwd } = req.body;

    
    // SQL query to fetch user details
    const query = `SELECT * FROM accounts WHERE username = '${user}'`;
    
    // execute query
    pool.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            // Verifico che la password inserita sia quella corretta
            bcrypt.compare(pwd, results.rows[0].pwd, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                // Il login ha avuto SUCCESSO
                if (isMatch) {
                    // Creo JWT payload
                    const payload = {
                        //id: results.rows[0].id,
                        username: results.rows[0].username
                    };
                    // Creo il token
                    jwt.sign(payload,
                        process.env.TOKEN_KEY,
                        { expiresIn: "3h" },
                        (err, token) => {
                            if (err) {
                                throw err;
                              }
                              res.status(201).json({
                                success: true,
                                token: `${token}`
                              });
                        })
                }else {
                    // Il login è FALLITO
                    res.status(401).json({ error: 'Invalid credentials' });
                  }
            });
        }
    });
    /*
    const { data, error } = await supabase
    .from('accounts')
    .select()
    .eq('user', user)

    let encrypted_password = '';
    data.map(fields => encrypted_password = fields.encrypted_password);

    if(!error) {
        bcrypt.compare(pwd, encrypted_password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            // Il login ha avuto SUCCESSO
            if (isMatch) {
                // Creo JWT payload
                const payload = {
                    //id: results.rows[0].id,
                    username: user
                };
                // Creo il token
                jwt.sign(payload,
                    process.env.TOKEN_KEY,
                    { expiresIn: "3h" },
                    (err, token) => {
                        if (err) {
                            throw err;
                          }
                          res.status(201).json({
                            success: true,
                            token: `${token}`
                          });
                    })
            }else {
                // Il login è FALLITO
                res.status(401).json({ error: 'Invalid credentials' });
              }
        });
    } else if(error){
        // Il login è FALLITO
        res.status(401).json({ error: 'Invalid credentials' });
    }
    */
});

app.post("/product/create", cors(corsOptions), async (req, res) => {
    try {

        // Ottengo i dati dal form
        const { titolo, categoria, descrizione, prezzo } = req.body;
        const image = req.files.file;

        // Aggiungo l'utente al Database
        const product_obj = { titolo, categoria, descrizione, prezzo, image };
        let result = db.createProduct(product_obj);

        // Tutto è andato bene passo i dati nella RESPONSE
        if (result == undefined) {
            res.status(201).json({ titolo, categoria, descrizione, prezzo, image })
        }

        // C'è stato qualche problema nell'inserimento nel Database
        if (result == 1) {
            res.status(409);
        }
    
    } catch (err) {
        console.log(err);
    }
});

app.put('/product/:productId',cors(corsOptions), db.updateProduct);

app.get('/products', db.getProducts)

app.get("/product/:productId", cors(corsOptions), async(req, res) => {
        const productId = req.params;
        
        let result = await db.getProductById(productId);
        //console.log("Result: ",result);
        
        // Tutto è andato bene passo i dati nella RESPONSE
        if (result) {
            res.status(201).json(result);
        }

        // C'è stato qualche problema nell'inserimento nel Database
        if (!result) {
            res.status(409);
        }
    
    
});


/**
 * Endpoint per gli ordini
 */
app.get('/orders', cors(corsOptions),table_orders.getOrders)
app.get('/order/:id', cors(corsOptions), table_orders.getOrderById)
app.post('/order', cors(corsOptions), table_orders.createOrder)
app.put('/order/:id', cors(corsOptions), table_orders.updateOrder)
app.delete('/order/:id', cors(corsOptions), table_orders.deleteOrder)

/**
 * Endpoint per i carrelli
 */
app.get('/carts', cors(corsOptions),table_carts.getCarts)
app.get('/cart/:id', cors(corsOptions), table_carts.getCartById)
app.post('/cart', cors(corsOptions), table_carts.createCart)
app.put('/cart/:id', cors(corsOptions), table_carts.updateCart)
app.delete('/cart/:id', cors(corsOptions), table_carts.deleteCart)


module.exports = app;