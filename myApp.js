let express = require('express');
let app = express();

require('dotenv').config();

app.listen(3000);

app.get("", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
});
