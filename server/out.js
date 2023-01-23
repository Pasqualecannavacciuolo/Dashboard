(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // app.js
  var require_app = __commonJS({
    "app.js"(exports, module) {
      __require("dotenv").config();
      var { createClient } = __require("@supabase/supabase-js");
      var supabaseUrl = process.env.SUPABASE_URL;
      var supabaseKey = process.env.SUPABASE_KEY;
      var supabase = createClient(supabaseUrl, supabaseKey);
      var express = __require("express");
      var cors = __require("cors");
      var bcrypt = __require("bcryptjs");
      var jwt = __require("jsonwebtoken");
      var app = express();
      var corsOptions = {
        origin: ["http://localhost:3000", "https://dashboard-one-black.vercel.app"],
        optionsSuccessStatus: 200,
        credentials: true
      };
      app.use(cors(corsOptions));
      app.use(express.json());
      app.post("/register", cors(corsOptions), async (req, res) => {
        try {
          const { user, pwd } = req.body;
          const encrypted_password = await bcrypt.hash(pwd, 10);
          if (!(user && pwd)) {
            res.status(400).send("Username e password non presenti nella REQUEST");
          }
          const user_obj = { user, encrypted_password };
          const { error } = await supabase.from("accounts").insert(user_obj);
          if (!error) {
            res.status(201).json({ user, encrypted_password });
          } else if (error) {
            res.status(409);
          }
        } catch (err) {
          console.log(err);
        }
      });
      app.post("/login", cors(corsOptions), async (req, res) => {
        const { user, pwd } = req.body;
        const { data, error } = await supabase.from("accounts").select().eq("user", user);
        let encrypted_password = "";
        data.map((fields) => encrypted_password = fields.encrypted_password);
        if (!error) {
          bcrypt.compare(pwd, encrypted_password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              const payload = {
                //id: results.rows[0].id,
                username: user
              };
              jwt.sign(
                payload,
                process.env.TOKEN_KEY,
                { expiresIn: "3h" },
                (err2, token) => {
                  if (err2) {
                    throw err2;
                  }
                  res.status(201).json({
                    success: true,
                    token: `${token}`
                  });
                }
              );
            } else {
              res.status(401).json({ error: "Invalid credentials" });
            }
          });
        } else if (error) {
          res.status(401).json({ error: "Invalid credentials" });
        }
      });
      module.exports = app;
    }
  });
  require_app();
})();
