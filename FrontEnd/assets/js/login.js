document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('#login-form');
    const errorMessage = document.querySelector('#message-error');
    const buttonConnect = document.querySelector('.button-connect');

    const loginUrl = "https://localhost:5678/api/users/login";

    const login = async (email, password) => {
        try {
            const Response = await fetch(loginUrl, {
                method : "POST" ,
                headers: {
                    "content-type": "application/json" ,
                },
                body: JSON.stringify({
                    email: encodeURIComponent(email),
                    password: encodeURIComponent(password),
                }),
            });
            if (Response.status === 200) {
                const ResponseJson = await Response.json();
                const token = ResponseJson.token;
                localStorage.setItem("token" , token);
                window.location.href = "./index.html";
            } else {
                errorMessage.textContent = "Email ou mot de passe incorrect";
                buttonConnect.classList.add("animationbtn");
            }
        } catch (error) {
            logger.error(error);
        }
    }

    buttonConnect.addEventListener('click', async (e) => {
        e.preventDefault();
        logger.debug('click');
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        if (validateEmail(email) && validatePassword(password)) {
            try {
                const response = await login(email, password);
                if (response && response.token) {
                    const token = response.token;
                    localStorage.setItem("token", token);
                    window.location.replace("./index.html");
                } else {
                    errorMessage.textContent = "Email ou mot de passe incorrect";
                    buttonConnect.classList.add("animationbtn");
                }
            } catch(error) {
                if (error instanceof NetworkError) {
                    logger.error('Network error occurred');
                } else if (error instanceof ApiError) {
                    logger.error('API error occured');
                } else {
                    logger.error('An error occured');
                }
            }
        } else {
            errorMessage.textContent = "Invalid email or password";
            buttonConnect.classList.add("animationbtn");
        }
    });
})


buttonConnect.addEventListener('click', async (e) => {
    e.preventDefault();
    logger.debug('click');
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    if (validateEmail(email) && validatePassword(password)) {
        try {
            const response = await login(email, password);
                if (response && response.token) {
                    const token = response.token;
                    localStorage.setItem("token", token);
                    window.location.replace("./index.html");
                    logger.info(token);
                } else {
                    errorMessage.textContent = "Email ou mot de passe incorrect";
                    buttonConnect.classList.add("animationbtn");
                }
            } catch(error) {
                if (error instanceof NetworkError) {
                    logger.error('Network error occurred');
                } else if (error instanceof ApiError) {
                    logger.error('API error occured');
                } else {
                    logger.error('An error occured');
                }
            }
            
    } else {
        errorMessage.textContent = "Invalid email or password";
        buttonConnect.classList.add("animationbtn");
    }
});


function validateEmail(email) {
    return true; //true si l'email est valide
}

function validatePassword(password) {
    return true; //true si le password est valide
}