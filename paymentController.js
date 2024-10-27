const pool = require('./db');
const { processPayment } = require('./paymentService');

async function createPayment(req, res) {
  const { amount } = req.body;

  const result = await pool.query("INSERT INTO transactions(amount, status) VALUES($1, $2) RETURNING *", [amount, 'pendente']);
  const transaction = result.rows[0];

  processPayment(transaction.id);
  
  res.status(201).json(transaction);
}

module.exports = { createPayment };
