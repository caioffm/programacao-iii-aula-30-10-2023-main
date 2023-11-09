document.getElementById('cadastro-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const documentValue = document.getElementById('document').value; 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Montar o objeto de dados do usuário
    const userData = {
        name: name,
        lastName: lastName,
        document: documentValue, 
        email: email,
        password: password
    };

    // Enviar os dados para o servidor
    fetch(' http://localhost:8080/clients', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Falha no cadastro: ' + response.statusText);
        }
    })
    .then(data => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
    })
    .catch(error => {
        alert(error.message);
    });
});
