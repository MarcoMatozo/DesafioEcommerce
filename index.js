const express = require('express');
const { createPayment } = require('./paymentController');

const app = express();
app.use(express.json());

app.post('/pagamento', createPayment);

app.listen(3000, () => {
  console.log('Serviço de Pagamento rodando na porta 3000');
});
