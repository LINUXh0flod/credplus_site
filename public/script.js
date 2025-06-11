// Máscara de cartão
document.getElementById('card-number').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '').slice(0, 16);
  e.target.value = value.replace(/(.{4})/g, '$1 ').trim();
});

// Máscara de validade
document.getElementById('validade').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (value.length >= 3) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  e.target.value = value;
});

// Máscara de CVV
document.getElementById('cvv').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// Envio de dados
document.getElementById('card-form').addEventListener('submit', function (e) {
  e.preventDefault();

  fetch('/enviar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'card-number': document.getElementById('card-number').value,
      'validade': document.getElementById('validade').value,
      'cvv': document.getElementById('cvv').value,
    })
  })
  .then(response => {
    if (!response.ok) throw new Error('Erro ao enviar os dados');
    return response.json();
  })
  .then(data => {
    alert('Dados enviados com sucesso!');
    window.location.href = 'sucesso.html';
  })
  .catch(error => {
    alert('Erro: ' + error.message);
  });
});