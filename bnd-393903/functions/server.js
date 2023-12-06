const express = require('express');
const cors = require('cors');
const { byName, byYear } = require('us-baby-names-2');
const app = express();

 
app.use(cors({ origin: true }))
   .use(express.json())
   .use(express.urlencoded({ extended: false }))
   .use("/bna", require('./router'))
   .get('*', (_, res) => res.status(404)
                            .json({ success: false, data: "Not found"}))

module.exports = app;
