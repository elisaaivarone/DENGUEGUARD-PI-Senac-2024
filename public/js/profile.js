document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Você precisa estar logado para acessar o perfil.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/profile/${userId}`);
        if (!response.ok) {
            throw new Error('Erro ao obter dados do perfil');
        }
        const userProfile = await response.json();
        document.getElementById('profile-info').innerHTML = `
            <p><strong>Nome de Usuário:</strong> ${userProfile.username}</p>
            <p><strong>E-mail:</strong> ${userProfile.email}</p>
            <p><strong>Endereço:</strong> ${userProfile.address}</p>
        `;
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao carregar perfil. Tente novamente mais tarde.');
    }
});