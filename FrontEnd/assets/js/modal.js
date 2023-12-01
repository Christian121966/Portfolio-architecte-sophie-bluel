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

//Affichage de l'image téléchargée.

const fileInput = document.getElementById("fileInput");
const imageContainer = document.getElementById("imageContainer");

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const customFileUpload = document.querySelector(".custom-file-upload");
  customFileUpload.style.opacity = "0";

  reader.onload = function (e) {
    const imageUrl = e.target.result;
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imageElement);
  };

  reader.readAsDataURL(file);
});

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

function transfertImageToModal() {
  const imageElement = document.querySelector("#imageContainer img");
  const modalPhotoContainer = document.querySelector(".modal-photo");

  if (imageElement && modalPhotoContainer) {
    const clonedImage = imageElement.cloneNode(true);
    clonedImage.style.width = "79px";
    clonedImage.style.height = "105px";
    clonedImage.style.position = "reltive";
    clonedImage.style.display = "inline-block";
    clonedImage.style.margin = "5px";

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-regular fa-trash-can";
    trashIcon.style.position = "absolute";
    trashIcon.style.background = "black";
    trashIcon.style.color = "white";
    trashIcon.style.cursor = "pointer";
    trashIcon.style.fontFamily = "FontAwesome";
    trashIcon.style.fontSize = "11px";
    trashIcon.style.top = "6px";
    trashIcon.style.right = "5px";
    trashIcon.style.zIndex = "1";
    trashIcon.style.width = "17px";
    trashIcon.style.height = "17px";
    //trashIcon.style.flexShrink = "0";
    trashIcon.style.borderRadius = "1px";
    trashIcon.style.display = "flex";
    trashIcon.style.flexDirection = "column";
    trashIcon.style.justifyContent = "center";
    trashIcon.style.alignItems = "center";

    clonedImage.appendChild(trashIcon);
    modalPhotoContainer.appendChild(clonedImage);
  console.log("image bien tranférée.");

   document.querySelector("#imageContainer").innerHTML = "";

   const customFileUpload = document.querySelector(".custom-file-upload");
  customFileUpload.style.opacity = "1";
  }
}


fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imageElement);
  };
  reader.readAsDataURL(file);
});

// Ajout de la fonction pour le clic sur le bouton "Valider"
document.querySelector(".AddPhoto").addEventListener("click", function() {
  transfertImageToModal();
});