require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://dashboard-one-black.vercel.app'],
    optionsSuccessStatus: 200,
    credentials: true
}

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

        // Creazione usando supabase
        const { error } = await supabase
        .from('accounts')
        .insert(user_obj);

        // Se non ci sono errori aggiungi al DB
        if(!error) {
            res.status(201).json({ user, encrypted_password })
        } else if(error) {
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
    //const query = `SELECT * FROM accounts WHERE username = '${user}'`;
    
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
});


module.exports = app;