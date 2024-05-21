document.getElementById('newLogin').addEventListener('click', function() {
    window.location.href = '/src/views/login.html';
  });

  
  document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
  
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, address })
    });
  
    if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    } else {
        alert('Erro ao realizar cadastro. Por favor, tente novamente.');
    }
  });