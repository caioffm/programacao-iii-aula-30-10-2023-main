document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/clients/login?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password), {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Falha no login: ' + response.statusText);
        }
    })
    .then(data => {
        alert(data);
        window.location.href = 'cadastro.html';    })
    .catch(error => {
        alert(error.message);
    });
});
