document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded.');

  let token = localStorage.getItem("token");

  const openModalIcon = document.querySelector('#openModalIcon');
  openModalIcon.addEventListener('click', openModal);
  const modifierText = document.querySelector('.modifier'); // Utilisez ".modifier"
  modifierText.addEventListener('click', openModal);

  const modeEditionIcon = document.querySelector('.far.fa-pen-to-square');
  modeEditionIcon.addEventListener('click', openModal);
  
  const modal = document.createElement('div');
  modal.id = 'modal-gallery';
  modal.className = 'modal invisible';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-container';

  const modalTitle = document.createElement('p');
  modalTitle.className = 'modal-title';
  modalTitle.textContent = 'Galerie photo';

  const modalCloseButton = document.createElement('div');
  modalCloseButton.className = 'modal-close';
  const closeIcon = document.createElement('i');
  closeIcon.className = 'fa-solid fa-xmark';
  closeIcon.addEventListener('click', closeModal);
  modalCloseButton.appendChild(closeIcon);

  const modalPhotoContainer = document.createElement('div');
  modalPhotoContainer.className = 'modal-photo';

  const modalAddPhotoButton = document.createElement('input');
  modalAddPhotoButton.type = 'submit';
  modalAddPhotoButton.value = 'Ajouter une photo';
  modalAddPhotoButton.className = 'btnajout';

  modalAddPhotoButton.addEventListener('click', openModalAddPhoto);



  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalCloseButton);
  modalContent.appendChild(modalPhotoContainer);
  modalContent.appendChild(modalAddPhotoButton);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  function openModal(event) {
    if (!modal) {
      console.error('modal is not defined.');
      return
    }

    var modalPhotoContainer = modal.querySelector('.modal-photo');

    if (modalPhotoContainer) {
      modalPhotoContainer.innerHTML = '';
    }
    modal.classList.remove('invisible');

    fetch("http://localhost:5678/api/works")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("Nombre de photos récupérées :", data.length);
        var modalPhotoContainer =  modal.querySelector('.modal-photo');
        console.log('modalPhotoContainer:', modalPhotoContainer);
        data.forEach(function(photo) {
          var photoElement = document.createElement('div');
          photoElement.className = 'modal-photo-item';

          var trashIcon = document.createElement('i');
          trashIcon.className = 'fa-regular fa-trash-can';
          trashIcon.addEventListener('click', function() {
            deletePhoto(photo.id);
            photoElement.remove();
          });
            
          var imgElement = document.createElement('img');
          imgElement.src = photo.imageUrl;

          photoElement.appendChild(trashIcon);
          photoElement.appendChild(imgElement);

          modalPhotoContainer.appendChild(photoElement);
        });
      })
      .catch(function(error) {
        console.log('Une erreur s\'est produite lors de la récupération de photos depuis le backend :', error);
      });
  }
  function closeModal() {
    modal.classList.add('invisible');
  }

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  


  //Suppression des photos dans le modal.
  




// Initialisation de l'état de connexion pour l'ouverture du modal après connexion.

let isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Fonction pour mettre à jour le texte du bouton "Login"/"Logout"
function updateLoginButtonText() {
  const loginLink = document.getElementById('loginLink');
  if (isUserLoggedIn) {
    loginLink.textContent = 'Logout';
  } else {
    loginLink.textContent = 'Login';
  }
}

// Fonction pour mettre à jour la visibilité des éléments en fonction de l'état de connexion
function updateUIVisibility() {
  const modeEditionIcon = document.querySelector('.far.fa-pen-to-square');
  const openModalIcon = document.querySelector('#openModalIcon');
  const pElement = document.querySelector('.modifier');
  const editionMode = document.querySelector('.edition-mode');
  editionMode.classList.add('hidden');

  if (isUserLoggedIn) {
    modeEditionIcon.style.display = 'block';
    openModalIcon.style.display = 'block';
    pElement.style.display = 'block';
    editionMode.style.display = 'display';
  } else {
    modeEditionIcon.style.display = 'none';
    openModalIcon.style.display = 'none';
    pElement.style.display = 'none';
    editionMode.style.display = 'none'; 
  }
}

// Gestionnaire d'événement pour le bouton "Login"
const loginLink = document.getElementById('loginLink');
loginLink.addEventListener('click', (e) => {
  if (isUserLoggedIn) {
    e.preventDefault();
    isUserLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    updateLoginButtonText();
    updateUIVisibility();
  } else {
    window.location.href = 'login.html';
  }

});

// Appel des fonctions pour les initialiser
updateLoginButtonText();
updateUIVisibility();
})


//Modal-add-photo

const modalAddPhoto = document.createElement('div');
modalAddPhoto.id = 'modal-add-photo'; // Nouvel identifiant
modalAddPhoto.className = 'modal';
document.body.appendChild(modalAddPhoto);

const modalContentAddPhoto = document.createElement('div');
modalContentAddPhoto.className = 'modal-container';

const modalTitleAddPhoto = document.createElement('p');
modalTitleAddPhoto.className = 'modal-title';
modalTitleAddPhoto.textContent = 'Ajout photo';


modalContentAddPhoto.appendChild(modalTitleAddPhoto);
modalAddPhoto.appendChild(modalContentAddPhoto);

const closeIcon = document.createElement('i');
closeIcon.className = 'fas fa-xmark';


const modalAddPhotoDiv = document.createElement('div');
modalAddPhotoDiv.id = 'modalAddPhotoDiv';
modalAddPhotoDiv.className = 'modalAddPhotoDiv';

document.body.appendChild(modalAddPhotoDiv);
modalAddPhotoDiv.appendChild(closeIcon);

// ... Ajoutez d'autres éléments pour le contenu du deuxième modal





function openModalAddPhoto() {
  const modalAddPhoto = document.getElementById('modal-add-photo');
  console.log('ouverture deuxième modal');
  if (modalAddPhoto) {
    modalAddPhoto.classList.add('hidden');

    const modalAddPhotoDiv = document.getElementById('modalAddPhotoDiv');
    if (modalAddPhotoDiv) {
      modalAddPhotoDiv.classList.remove('modalAddPhotoDiv');
    }
  }
}


const closeAddPhotoButton = document.createElement('div');
closeAddPhotoButton.id = 'closeAddPhotoButton';
closeAddPhotoButton.className = 'closeAddPhotoButton';
document.body.appendChild(closeAddPhotoButton);


function closeAddPhotoModal() {
  const modalAddPhoto = document.getElementById('modal-add-photo');
  if (modalAddPhoto) {
    modalAddPhoto.classList.add('hidden');
  }
}

closeIcon.addEventListener('click', closeAddPhotoModal)



closeAddPhotoButton.addEventListener('click', closeAddPhotoModal);







