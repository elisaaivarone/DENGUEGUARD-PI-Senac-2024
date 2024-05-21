
  document.getElementById('newAccount').addEventListener('click', function() {
    window.location.href = '/src/views/register.html';
  });

  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
        const data = await response.json();
        alert(`Bem-vindo, ${data.username}`);
        window.location.href = 'index.html';
    } else {
        alert('Login falhou. Por favor, verifique suas credenciais.');
    }
  });