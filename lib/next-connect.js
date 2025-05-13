// lib/next-connect.js
const nc = require('next-connect').default;

module.exports = nc({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end(err.toString());
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Página no encontrada');
  }
});

