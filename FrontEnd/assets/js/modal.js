document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded.');
  const openModalIcon = document.querySelector('#openModalIcon');
  const modifierText = document.querySelector('.modifier'); // Utilisez ".modifier" au lieu de ".modal1"

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
  modalCloseButton.appendChild(closeIcon);

  const modalPhotoContainer = document.createElement('div');
  modalPhotoContainer.className = 'modal-photo';

  const modalAddPhotoButton = document.createElement('input');
  modalAddPhotoButton.type = 'submit';
  modalAddPhotoButton.value = 'Ajouter une photo';
  modalAddPhotoButton.className = 'btnajout';

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

  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  openModalIcon.addEventListener('click', openModal);
  modifierText.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click', closeModal);
});

