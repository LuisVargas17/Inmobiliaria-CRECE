// utils/apiHandler.js
const nc = require('next-connect');

function createHandler() {
  return nc({
    attachParams: true,
    onError: (err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ error: 'Ruta no encontrada' });
    }
  });
}

module.exports = createHandler;