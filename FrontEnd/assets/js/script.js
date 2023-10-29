
const filterButtons = document.querySelectorAll("#filter-buttons button");
const gallery = document.getElementById("gallery");
let datas = [];

// Chargez les données initiales ici
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(function (data) {
        datas = data;
        //recupere la liste des categories
        let categories = [];
        createFilter("Tous");
        data.forEach(work => {
            if (!categories.includes(work.category.name)) {
                categories.push(work.category.name);
                createFilter(work.category.name);
            }
        });
        updateGallery('Tous'); // Mettez à jour la galerie avec 'Tous' par défaut
    });





// Associez un gestionnaire d'événements à chaque bouton de filtre
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filterValue = button.getAttribute('data-filter');
        updateGallery(filterValue); // Mettez à jour la galerie avec la catégorie du bouton cliqué
    });
});


//cree les boutons
function createFilter(categorie) {
    let button = document.createElement("button");
    button.setAttribute("data-filter", categorie);
    button.classList.add("objects");
    button.textContent = categorie;
    document.querySelector("#filter-buttons").appendChild(button);
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");
      updateGallery(filterValue); // Mettez à jour la galerie avec la catégorie du bouton cliqué
    });
}
function updateGallery(activeCategory) {
gallery.innerHTML = "";

datas.forEach((work) => {
if (activeCategory === "Tous" || work.category.name === activeCategory) {
  const figure = document.createElement("figure");
  figure.setAttribute("data-category", work.category.name);
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  img.setAttribute("data-category", work.category.name);
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}
});
}



/*window.onload = function() {
    const loginLogoutLink = document.getElementById('login-logout-link');

    if (loginLogoutLink) {
        if (isUserLoggedIn()) {
            loginLogoutLink.textContent = 'Logout';
            loginLogoutLink.href = 'login.html'; // Lien de déconnexion
        } else {
            loginLogoutLink.textContent = 'Login';
            loginLogoutLink.href = 'login.html'; // Lien de connexion
        }
    }
}*/