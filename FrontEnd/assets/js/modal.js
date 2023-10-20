function openModal() {
    const modal = document.createElement('section');
    modal.id = 'modal-gallery';
    modal.classList.add('modal', 'modal-visible');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalClose = document.createElement('div');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    // Créez le reste du contenu du modal ici
    const modalTitle = document.createElement('p');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Galerie Photo';

    const modalPhoto = document.createElement('div');
    modalPhoto.classList.add('modal-photo');

    // Utilisation de fetch pour récupérer les images
    fetchImages()
        .then((images) => {
            images.forEach((image) => {
                const modalPhotoItem = document.createElement('div');
                modalPhotoItem.classList.add('modal-photo-item');

                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;

                const trashIcon = document.createElement('i');
                trashIcon.classList.add('fa-regular', 'fa-trash-can');

                modalPhotoItem.appendChild(img);
                modalPhotoItem.appendChild(trashIcon);
                modalPhoto.appendChild(modalPhotoItem);
            });
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des images:', error);
        });

    const modalAjout = document.createElement('div');
    modalAjout.classList.add('modal-ajout');
    modalAjout.innerHTML = '<input class="btnajout" type="submit" value="Ajouter une Photo" />';

    modalContainer.appendChild(modalClose);
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(modalPhoto);
    modalContainer.appendChild(modalAjout);

    modal.appendChild(modalContainer);

    document.body.appendChild(modal);

    const closeIcon = modal.querySelector('.fa-solid.fa-xmark');
    closeIcon.addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.querySelector('#modal-gallery');
    if (modal) {
        modal.remove();
    }
}

// Exemple d'ajout d'un gestionnaire d'événements pour ouvrir le modal en réponse à un clic
const openModalIcon = document.querySelector('.fa-regular.fa-pen-to-square');
openModalIcon.addEventListener('click', openModal);

// Fonction pour récupérer les images avec fetch
async function fetchImages() {
    try {
        const response = await fetch('./Backendend/images/images.json');
        if (!response.ok) {
            throw new Error('La récupération des images a échoué');
        }
        const data = await response.json();
        return data.images;
    } catch (error) {
        throw error;
    }
}
console.log("Clic sur l'icône de modal");
openModal();

