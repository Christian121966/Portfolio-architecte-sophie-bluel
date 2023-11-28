if (!file) {
    alert("aucun fichier sélectionné");
    // Aucun fichier sélectionné
    console.log("Aucun fichier sélectionné.");
  } else if (file.size > 4 * 1024 * 1024) {
    alert("fichier trop volumineux, la taille maximale autorisée est 4mo");
    // Fichier trop volumineux
    console.log("Fichier trop volumineux. La taille maximale autorisée est de 4 Mo.");
  } else {
    alert("erreur inattendue lors du traitement du fichier");
    // Autre erreur inattendue
    console.log("Erreur inattendue lors du traitement du fichier.");
  }