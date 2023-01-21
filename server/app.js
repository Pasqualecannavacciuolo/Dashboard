require("dotenv").config();

const db = require("./queries");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}

const Pool = require("pg").Pool
const pool = new Pool({
  user: 'pasquale',
  host: 'localhost',
  database: 'dashboard',
  password: 'password123',
  port: 5432,
})

app.use(cors(corsOptions))
app.use(express.json());

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
                        { expiresIn: "1m" },
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
});


module.exports = app;