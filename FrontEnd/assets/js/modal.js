document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");

  let token = localStorage.getItem("token");

  const openModalIcon = document.querySelector("#openModalIcon");
  openModalIcon.addEventListener("click", openModal);
  const modifierText = document.querySelector(".modifier");
  modifierText.addEventListener("click", openModal);
  //const modeEditionText = document.querySelector(".mode edition");
  //modeEditionText.addEventListener("click", openModal);

  const modalCloseButton = document.createElement("div");
  modalCloseButton.className = "modal-close";
  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";
  closeIcon.addEventListener("click", fermerModal);
  modalCloseButton.appendChild(closeIcon);

  function fermerModal() {
    const modalGallery = document.getElementById("modal-gallery");
    modalGallery.classList.add("invisible");
  }

  const modeEditionIcon = document.querySelector(".far.fa-pen-to-square");
  modeEditionIcon.addEventListener("click", openModal);

  const modal = document.createElement("div");
  modal.id = "modal-gallery";
  modal.className = "modal invisible";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-container";

  const modalTitle = document.createElement("p");
  modalTitle.className = "modal-title";
  modalTitle.textContent = "Galerie photo";

  const modalPhotoContainer = document.createElement("div");
  modalPhotoContainer.className = "modal-photo";

  const modalAddPhotoButton = document.createElement("input");
  modalAddPhotoButton.type = "submit";
  modalAddPhotoButton.value = "Ajouter une photo";
  modalAddPhotoButton.className = "btnajout";
  modalAddPhotoButton.setAttribute("data-modal-id", "modalAddPhoto");
  modalAddPhotoButton.addEventListener("click", openModalAddPhoto);

  const hrElement = document.createElement("hr");
  hrElement.className = "style-hr trait";

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalCloseButton);
  modalContent.appendChild(modalPhotoContainer);
  modalContent.appendChild(hrElement);
  modalContent.appendChild(modalAddPhotoButton);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  function openModal(event) {
    if (!modal) {
      console.error("modal is not defined.");
      return;
    }

    var modalPhotoContainer = modal.querySelector(".modal-photo");

    if (modalPhotoContainer) {
      modalPhotoContainer.innerHTML = "";
    }
    modal.classList.remove("invisible");

    fetch("http://localhost:5678/api/works")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("Nombre de photos récupérées :", data.length);
        var modalPhotoContainer = modal.querySelector(".modal-photo");
        console.log("modalPhotoContainer:", modalPhotoContainer);
        data.forEach(function (photo) {
          var photoElement = document.createElement("div");
          photoElement.className = "modal-photo-item";

          var trashIcon = document.createElement("i");
          trashIcon.className = "fa-regular fa-trash-can";
          trashIcon.addEventListener("click", function () {
            //appel à l'API
            deletePhoto(photo.id);

            function deletePhoto(photoId) {
              fetch(`http://localhost:5678/api/works/${photoId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  console.log("data:", data);
                  photoElement.remove();
                })
                .catch(function (error) {
                  console.log(
                    "Une erreur s'est produite lors de la suppression de la photo :",
                    error
                  );
                });
            }
          });

          var imgElement = document.createElement("img");
          imgElement.src = photo.imageUrl;

          photoElement.appendChild(trashIcon);
          photoElement.appendChild(imgElement);

          modalPhotoContainer.appendChild(photoElement);
        });
      })
      .catch(function (error) {
        console.log(
          "Une erreur s'est produite lors de la récupération de photos depuis le backend :",
          error
        );
      });
  }
  function closeModal() {
    modal.classList.add("invisible");
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  //Suppression des photos dans le modal.

  // Initialisation de l'état de connexion pour l'ouverture du modal après connexion.

  let isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Fonction pour mettre à jour le texte du bouton "Login"/"Logout"
  function updateLoginButtonText() {
    const loginLink = document.getElementById("loginLink");
    if (isUserLoggedIn) {
      loginLink.textContent = "logout";
    } else {
      loginLink.textContent = "login";
    }
  }

  // Fonction pour mettre à jour la visibilité des éléments en fonction de l'état de connexion
  function updateUIVisibility() {
    const modeEditionIcon = document.querySelector(".far.fa-pen-to-square");
    const openModalIcon = document.querySelector("#openModalIcon");
    const pElement = document.querySelector(".modifier");
    const editionMode = document.querySelector(".edition-mode");
    const filterButtons = document.querySelector("#filter-buttons");
    editionMode.classList.add("hidden");

    if (isUserLoggedIn) {
      modeEditionIcon.style.display = "block";
      openModalIcon.style.display = "block";
      pElement.style.display = "block";
      editionMode.style.display = "display";
      filterButtons.style.display = "none";
    } else {
      modeEditionIcon.style.display = "none";
      openModalIcon.style.display = "none";
      pElement.style.display = "none";
      editionMode.style.display = "none";
      filterButtons.style.display = "block";
    }
  }

  // Gestionnaire d'événement pour le bouton "Login"
  const loginLink = document.getElementById("loginLink");
  loginLink.addEventListener("click", (e) => {
    if (isUserLoggedIn) {
      e.preventDefault();
      isUserLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
      updateLoginButtonText();
      updateUIVisibility();
    } else {
      window.location.href = "login.html";
    }
  });

  // Appel des fonctions pour les initialiser
  updateLoginButtonText();
  updateUIVisibility();
});

//Modal-add-photo

const modalAddPhotoButton = document.createElement("input");
modalAddPhotoButton.type = "submit";
modalAddPhotoButton.value = "Ajouter une photo";
modalAddPhotoButton.className = "btnajout";
modalAddPhotoButton.setAttribute("data-modal-id", "modalAddPhoto");
modalAddPhotoButton.addEventListener("click", openModalAddPhoto);

function openModalAddPhoto() {
  const modalGallery = document.getElementById("modal-gallery");
  modalGallery.classList.add("invisible");

  const modalAddPhoto = document.getElementById("modalAddPhoto");
  modalAddPhoto.style.display = "flex";
}

//Gestion 'arrow-left'

function retourModalGallery() {
  const modalGallery = document.getElementById("modal-gallery");
  if (modalGallery) {
    modalGallery.classList.remove("invisible");
    modalGallery.scrollIntoView({ behavior: "smooth" });
  }
  const modalAddPhoto = document.getElementById("modalAddPhoto");
  if (modalAddPhoto) {
    modalAddPhoto.style.display = "none";
  }
}

document.querySelector(".arrow-left").addEventListener("click", () => {
  retourModalGallery();
});

const modal = document.createElement("div");
modal.id = "modal-gallery";
modal.className = "modal invisible";



//Transfert de l'image téléchargée vers modal-photo

const fileInput = document.getElementById("fileInput");
const imageContainer = document.getElementById("imageContainer");

let selectedImage = null;

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  //const customFileUpload = document.querySelector(".custom-file-upload");
  //customFileUpload.style.opacity = "0";

  reader.onload = function (e) {
    const imageUrl = e.target.result;
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;

    /*Définir l'image sélectionnée.*/
    selectedImage = imageElement;

    // Ajouter l'image à un conteneur dans votre application
    imageContainer.appendChild(imageElement);

    const modalPhotoItemNew = document.createElement("div");
    modalPhotoItemNew.className = "modal-photo-item-new";
    const svg = document.createElement("svg");
    svg.setAttribute("class", "iconeTelechargee");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    svg.setAttribute("viewBox", "0 0 50 50");
    svg.style.fill = "#FFFFFF";

    const path = document.createElement("path");
    path.setAttribute("d", "M 21 0 C 19.355469 0 ..."); // Ajoutez le chemin complet ici

    svg.appendChild(path);

    modalPhotoItemNew.appendChild(svg);
    modalPhotoItemNew.appendChild(imageElement);
    imageContainer.appendChild(modalPhotoItemNew);

    //Stockage de l'image téléchargée dans le stockage local
    localStorage.setItem('uploadedImage', imageUrl);
    
  };

  reader.readAsDataURL(file);
});


  

const validerButton = document.querySelector(".AddPhoto");
validerButton.addEventListener("click", function () {
  if (selectedImage) {
    const clonedImageModal = selectedImage.cloneNode(true);
    const modalPhotoContainer = document.querySelector(".modal-photo");
    modalPhotoContainer.appendChild(clonedImageModal);

    const clonedImageGallery = selectedImage.cloneNode(true);
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.appendChild(clonedImageGallery);

    imageContainer.innerHTML = "";
    selectedImage = null;
  }


  // Mettre à jour le nombre de photos récupérées
  fetch("http://localhost:5678/api/works")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Nombre de photos récupérées :", data.length + 1);
      // Mettre à jour l'affichage du nombre de photos récupérées
      //const numberOfPhotos = data.length + 1;
      //const numberOfPhotosDisplay = document.getElementById("numberOfPhotosDisplay");
      //numberOfPhotosDisplay.textContent = `Nombre de photos récupérées : ${numberOfPhotos}`;
    });
});


//Création de la même structure <div> pour l'image téléchargée.
function moveImageToModalPhoto() {
  const modalPhotoItemNew = document.querySelector(".modal-photo-item-new");
  const modalPhotoContainer = document.querySelector(".modal-photo");
  
  if (modalPhotoItemNew && modalPhotoContainer) {
    const clonedModalPhotoItem = modalPhotoItemNew.cloneNode(true);
    modalPhotoContainer.appendChild(clonedModalPhotoItem);
    modalPhotoItemNew.remove();
  }
}

// Appel de la fonction pour déplacer l'image vers "modal-photo"
moveImageToModalPhoto();





//Fermeture de modalAddPhoto
function fermerModal() {
  var modal = document.getElementById("modalAddPhoto");
  modal.style.display = "none";
}

const modalAddPhoto = document.getElementById("modalAddPhoto");

window.addEventListener("click", function (event) {
  if (event.target === modalAddPhoto) {
    fermerModal();
  }
});

