const functions = require('firebase-functions');
const server = require('./server');
const bna393903 = functions.runWith({ memory: "2GB", timeoutSeconds: 60 })
                     .https
                     .onRequest(server);

module.exports = { bna393903 };
