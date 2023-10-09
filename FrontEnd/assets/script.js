const categories = new Set();

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll("#filter-buttons button");


    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.getAttribute('data-filter');
            const galleryImages = document.querySelectorAll(".gallery figure");
            galleryImages.forEach(image => {
                const imageFilters = image.getAttribute("data-filter").split(" ");
                const isActive = filterValue === "Tous" || imageFilters.includes(filterValue);
                image.classList.toggle("inactive", !isActive);
            });
        });
    });
});





// rajout du click sur le logo pour revenir à la page d'accueil
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    console.log('Logo cliqué'); // Ajoutez cette ligne pour le débogage
    window.location.href = './index.html';
});

function createWorks(work) {
    let figure = document.createElement("figure");
    figure.dataset.filter = work.category.id;
    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    let figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    document.querySelector("#gallery").appendChild(figure);
}

function createWorks() {
    const parentElement = document.querySelector(".galerie"); // Sélectionnez l'élément parent
    if (parentElement) {
        const newElement = document.createElement("div"); // Créez un nouvel élément
        // Effectuez d'autres opérations sur le nouvel élément
        parentElement.appendChild(newElement); // Ajoutez le nouvel élément à l'élément parent
    }
}


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.json()) // Utiliser response.json() pour obtenir les données JSON
    .then(travaux => {
        // Supprimer les travaux existants

        function supprimerTravauxExistants() {
            const galerie = document.querySelector("#gallery");
            while (galerie.firstChild) {
                galerie.removeChild(galerie.firstChild);
            }
        }
        
        supprimerTravauxExistants();
        function supprimerTravauxExistants() {
            const element = document.querySelector(".gallery"); // Sélectionnez l'élément que vous souhaitez supprimer
            if (element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            }
        }
        
        

        // Ajouter les nouveaux travaux à la galerie
        travaux.forEach(work => {
            createWorks(work);
            categories.add(work.category.name);
        });

        // Afficher les nouveaux travaux dans la console du navigateur
        console.log(travaux);
    })
    .catch(error => console.error('Erreur :', error));
  


    