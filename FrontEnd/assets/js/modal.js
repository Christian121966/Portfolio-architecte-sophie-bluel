document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded.');

  let token = localStorage.getItem("token");

  const openModalIcon = document.querySelector('#openModalIcon');
  openModalIcon.addEventListener('click', openModal);
  const modifierText = document.querySelector('.modifier'); // Utilisez ".modifier"
  modifierText.addEventListener('click', openModal);

  const modalCloseButton = document.createElement('div');
  modalCloseButton.className = 'modal-close';
  const closeIcon = document.createElement('i');
  closeIcon.className = 'fa-solid fa-xmark';
  closeIcon.addEventListener('click', fermerModal);
  modalCloseButton.appendChild(closeIcon);
  
  
  function fermerModal() {
    const modalGallery = document.getElementById('modal-gallery');
    modalGallery.classList.add('invisible');
  }
  

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

  

  const modalPhotoContainer = document.createElement('div');
  modalPhotoContainer.className = 'modal-photo';

  const modalAddPhotoButton = document.createElement('input');
  modalAddPhotoButton.type = 'submit';
  modalAddPhotoButton.value = 'Ajouter une photo';
  modalAddPhotoButton.className = 'btnajout';

  const hrElement = document.createElement('hr');
  hrElement.className = 'style-hr trait';

  



  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalCloseButton);
  modalContent.appendChild(modalPhotoContainer);
  modalContent.appendChild(modalAddPhotoButton);
  modalContent.appendChild(hrElement);

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
  const filterButtons = document.querySelector('#filter-buttons');
  editionMode.classList.add('hidden');

  if (isUserLoggedIn) {
    modeEditionIcon.style.display = 'block';
    openModalIcon.style.display = 'block';
    pElement.style.display = 'block';
    editionMode.style.display = 'display';
    filterButtons.style.display = 'block';
  } else {
    modeEditionIcon.style.display = 'none';
    openModalIcon.style.display = 'none';
    pElement.style.display = 'none';
    editionMode.style.display = 'none';
    filterButtons.style.display = 'none'; 
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


const modalContentAddPhoto = document.createElement('div');
modalContentAddPhoto.className = 'modalAddPhotoContainer';


const modalAddPhotoButton = document.createElement('input');
modalAddPhotoButton.type = 'submit';
modalAddPhotoButton.value = 'Ajouter une photo';
modalAddPhotoButton.className = 'btnajout';

const dynamicId = 'btnAjouterPhoto_' + Date.now();
modalAddPhotoButton.id = dynamicId;

const modalAddPhotoContainer = document.getElementById('modalAddPhoto');
modalAddPhotoContainer.appendChild(modalAddPhotoButton);

const btnAjouterPhoto = document.getElementById(dynamicId);

btnAjouterPhoto.addEventListener('click', function() {
  modalAddPhotoContainer.style.display = 'block';

  const modalGallery = document.getElementById('modal-gallery');
  if (modalGallery) {
    modalGallery.style.display = 'none';
  }
});



const modalContentAddPhotoHTML = `
<div id="modalAddPhoto"> 
			<div class="modalAddPhotoContainer">
				<div class="arrow-left">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
					<path d="M0.439478 8.94458C-0.146493 9.53055 -0.146493 10.4822 0.439478 11.0681L7.9399 18.5686C8.52587 19.1545 9.47748 19.1545 10.0635 18.5686C10.6494 17.9826 10.6494 17.031 10.0635 16.445L5.11786 11.5041H19.4999C20.3297 11.5041 21 10.8338 21 10.004C21 9.17428 20.3297 8.50393 19.4999 8.50393H5.12255L10.0588 3.56303C10.6447 2.97706 10.6447 2.02545 10.0588 1.43948C9.47279 0.853507 8.52118 0.853507 7.93521 1.43948L0.43479 8.9399L0.439478 8.94458Z" fill="black"/>
				</svg>
				</div>
				<div class="modalAddPhotoClose">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
				</div>
				<p>Ajout photo</p>
				<div class="modalAddPhotoAjouterPhotoContainer">
					<div class="modalAddPhotoAjouterPhoto">
						<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="picture-svgrepo-com 1">
							<path id="Vector" d="M63.5517 15.8879C64.7228 15.8879 65.681 16.8461 65.681 18.0172V60.5768L65.0156 59.7118L46.9165 36.2894C46.3176 35.5042 45.3727 35.0517 44.3879 35.0517C43.4031 35.0517 42.4715 35.5042 41.8594 36.2894L30.8136 50.5824L26.7546 44.8998C26.1557 44.0614 25.1975 43.569 24.1595 43.569C23.1214 43.569 22.1632 44.0614 21.5644 44.9131L10.9178 59.8183L10.319 60.6434V60.6034V18.0172C10.319 16.8461 11.2772 15.8879 12.4483 15.8879H63.5517ZM12.4483 9.5C7.75048 9.5 3.93103 13.3195 3.93103 18.0172V60.6034C3.93103 65.3012 7.75048 69.1207 12.4483 69.1207H63.5517C68.2495 69.1207 72.069 65.3012 72.069 60.6034V18.0172C72.069 13.3195 68.2495 9.5 63.5517 9.5H12.4483ZM23.0948 35.0517C23.9337 35.0517 24.7644 34.8865 25.5394 34.5655C26.3144 34.2444 27.0186 33.7739 27.6118 33.1807C28.2049 32.5876 28.6755 31.8834 28.9965 31.1083C29.3175 30.3333 29.4828 29.5027 29.4828 28.6638C29.4828 27.8249 29.3175 26.9943 28.9965 26.2192C28.6755 25.4442 28.2049 24.74 27.6118 24.1468C27.0186 23.5537 26.3144 23.0831 25.5394 22.7621C24.7644 22.4411 23.9337 22.2759 23.0948 22.2759C22.2559 22.2759 21.4253 22.4411 20.6503 22.7621C19.8752 23.0831 19.171 23.5537 18.5779 24.1468C17.9847 24.74 17.5142 25.4442 17.1931 26.2192C16.8721 26.9943 16.7069 27.8249 16.7069 28.6638C16.7069 29.5027 16.8721 30.3333 17.1931 31.1083C17.5142 31.8834 17.9847 32.5876 18.5779 33.1807C19.171 33.7739 19.8752 34.2444 20.6503 34.5655C21.4253 34.8865 22.2559 35.0517 23.0948 35.0517Z" fill="#B9C5CC"/>
							</g>
						</svg>
					</div>
					<div class="ajouter-plus">
					<h4>+ Ajouter photo</h4> 
					</div>
				</div>
				<form action=""> 
					<label class="titre">
						<h5>Titre</h5>
						<input type="text" id="Titre-photo" name="Titre" class="input-titre-photo" />
					</label>
					<label class="categorie">
						<h6>Catégorie</h6>
						<div class="dropdown">
							<select name="categorie" id="categorie-photo" class="select-categorie">
								<option value="#"></option>
								<option value="option1">Objets</option>
								<option value="option2">Appartements</option>
								<option value="option2">Hôtels & restaurants</option>
							</select>
						</div>
					</label>
				</form>
				<hr class="styled-hr">
				<button type="submit" class="AddPhoto">
					<span>Valider</span>
				</button>
			</div>
		</div>
`

modalAddPhotoButton.addEventListener('click', function() {
  modalContentAddPhoto.innerHTML = modalContentAddPhotoHTML;
})


function fermerModal() {
  var modal = document.getElementById('modalAddPhoto');
  modal.style.display = 'none';
}
 