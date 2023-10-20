window.onload = function() {
    const loginForm = document.querySelector('#login-form');
    const errorMessage = document.querySelector('#message-error');
    const buttonConnect = document.querySelector('.button-connect');
    buttonConnect.addEventListener('click', async (e) => {
        console.log("Début de l'écouteur de clic");
        e.preventDefault();
        console.log('click'); // Utilisation de console au lieu de logger


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: loginForm.username.value,
          password: loginForm.password.value,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5678/api/users/login", requestOptions)
            .then(response => {
                if (response.status === 404 || response.status === 401) {
                    errorMessage.textContent = "Invalid username or password";
                    buttonConnect.classList.add("animationbtn");
                } else {
                    return response.json();
                }
            })
            .then(result => {

                localStorage.setItem('token', result.token);
                window.location.href = "./index.html";
                //ok
                //sauvgarder le token ==== result.token
                //local storage ==>
                //changer la page
                // redirection en js
                console.log(result)
            })
        .catch(error => console.log('error', error));

    });

   
}
