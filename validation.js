// Elements du formulaire
const form = document.getElementById("form");
const genre = document.getElementById("genre");
const dateDeNaissance = document.getElementById("date-de-naissance");
const valeurDuVehicule = document.getElementById("valeur-du-vehicule");
const dateFabricationDuVehicule = document.getElementById("date-fabrication-du-vehicule");
const kilometresParAn = document.getElementById("kilometres-par-an");
const cameraDeRecul = document.getElementById("camera-de-recul");
const reclamations = document.getElementById("reclamations");

// Elements de l'affichage
const prixAnnuelle = document.getElementById('prixAnnuelle');
const prixMensuelle = document.getElementById('prixMensuelle');

const estValideForm = () => {
  // Récupération des valeurs du formulaire
  const genreValeur = genre.value.trim().toLowerCase();
  const dateDeNaissanceValeur = dateDeNaissance.value.trim();
  const vehiculeValeur = valeurDuVehicule.value.trim();
  const dateFabricationDuVehiculeValeur = dateFabricationDuVehicule.value.trim();
  const kilometresParAnValeur = kilometresParAn.value.trim();
  const cameraDeReculValeur = cameraDeRecul.value.trim().toLowerCase();
  const reclamationsValeur = reclamations.value.trim().toLowerCase();

  // Fonctions de validation
  validerGenre();
  validerDateDeNaissance();
  validerVehiculeValeur();
  validerDateFabricationDuVehicule();
  validerKilometresParAn();
  validerCameraDeRecul();
  validerReclamations();

  return (
    // Validation des valeurs
    estValideGenre(genreValeur) &&
    estValideDate(dateDeNaissanceValeur) &&
    estValideNombre(vehiculeValeur) &&
    estValideDate(dateFabricationDuVehiculeValeur) &&
    estValideNombre(kilometresParAnValeur) &&
    estValideReponse(cameraDeReculValeur) &&
    estValideReponse(reclamationsValeur) &&
    !estValideAssurance()
  );
};

// Message de controle d'erreurs
const afficheErreur = (element, message) => {
  const controle = element.parentElement;
  const affichageErreur = controle.querySelector(".erreur");

  affichageErreur.innerText = message;
  controle.classList.add("erreur");
  controle.classList.remove("succes");
};

// Message de controle de succes
const afficheSucces = (element) => {
  const controle = element.parentElement;
  const affichageErreur = controle.querySelector(".erreur");

  affichageErreur.innerText = "";
  controle.classList.add("succes");
  controle.classList.remove("erreur");
};

// Reinitialiser les erreurs dans le form
function reinitialiserErreurs() {
  const valeurs = [genre, dateDeNaissance, valeurDuVehicule, dateFabricationDuVehicule, kilometresParAn, cameraDeRecul, reclamations];


  for (let i = 0; i < valeurs.length; i++) {
    const valeur = valeurs[i];
    const valeurIndicateur = valeur.parentElement;
    valeurIndicateur.classList.remove("erreur", "succes");
    const affichageErreur = valeurIndicateur.querySelector(".erreur");
    if (affichageErreur) affichageErreur.innerText = "";
  }

  prixAnnuelle.textContent = '';
  prixMensuelle.textContent = '';
}

// Soumission du Form
form.addEventListener("submit", (evenement) => {
  evenement.preventDefault();

  if (estValideForm()) {
    const genreValeur = genre.value.trim().toLowerCase();
    const dateDeNaissanceValeur = dateDeNaissance.value.trim();
    const vehiculeValeur = parseInt(valeurDuVehicule.value.trim(), 10);
    const dateFabricationDuVehiculeValeur = dateFabricationDuVehicule.value.trim();
    const kilometresParAnValeur = parseInt(kilometresParAn.value.trim(), 10);
    const cameraDeReculValeur = cameraDeRecul.value.trim().toLowerCase();
    let nombreReclamations = parseInt(quantiteReclamations.value.trim(), 10);

    // Default nombreReclamations = NaN -> 0
    if (isNaN(nombreReclamations)) {
      nombreReclamations = 0;
    }

    const age = calculerAge(dateDeNaissanceValeur);
    const vehicleAge = calculerAge(dateFabricationDuVehiculeValeur);
    const montantBase = calculerMontantBase(genreValeur, age, vehiculeValeur);
    const assuranceAnnuelle = calculerAssuranceAnuelle();
    const assuranceMensuelle = calculerAssuranceMensuelle();
    const PrixTotalReclamations = CalculerPrixTotalReclamations();

    // Afficher toutes les valeurs dans la console javascript
    console.log("Genre:", genreValeur);
    console.log("Date de naissance:", dateDeNaissanceValeur);
    console.log("Valeur du véhicule:", vehiculeValeur);
    console.log("Date de fabrication:", dateFabricationDuVehiculeValeur);
    console.log("Age du véhicule:", vehicleAge);
    console.log("Kilomètres par an:", kilometresParAnValeur);
    console.log("Caméra de recul:", cameraDeReculValeur);
    console.log("Nombre Réclamations", nombreReclamations);
    console.log("Prix Total Réclamations:", PrixTotalReclamations)
    console.log("Age:", age);
    console.log("Montant de base de l'assurance:", montantBase);
    console.log("Assurance annuelle:", assuranceAnnuelle);
    console.log("Assurance mensuelle:", assuranceMensuelle);

    // Mettre à jour les informations dans les spans HTML (prixAnnuelle/prixMensuelle)
    prixAnnuelle.textContent = assuranceAnnuelle.toFixed(3);
    prixMensuelle.textContent = assuranceMensuelle.toFixed(3);

    alert("Formulaire soumis avec succès");
  }
});

// Bouton reset le Form
const boutonReset = document.createElement('button');
boutonReset.textContent = 'Reset';
boutonReset.type = 'reset';
form.appendChild(boutonReset);

// Validation au fur et à mesure de la saisie de valeurs
genre.addEventListener("input", () => {
  validerGenre();
});

dateDeNaissance.addEventListener("input", () => {
  validerDateDeNaissance();
});

valeurDuVehicule.addEventListener("input", () => {
  validerVehiculeValeur();
});

dateFabricationDuVehicule.addEventListener("input", () => {
  validerDateFabricationDuVehicule();
});

kilometresParAn.addEventListener("input", () => {
  validerKilometresParAn();
});

cameraDeRecul.addEventListener("input", () => {
  validerCameraDeRecul();
});

reclamations.addEventListener("input", () => {
  validerReclamations();
});

boutonReset.addEventListener('click', () => {
  reinitialiserErreurs();
  reinitialiserQuestionsReclamation();
});

// Validation genre (homme, femme, non-binaire)
const validerGenre = () => {
  const genreValeur = genre.value.trim().toLowerCase();
  if (genreValeur === "") {
    afficheErreur(genre, "Ce champ est obligatoire");
  } else if (!estValideGenre(genreValeur)) {
    afficheErreur(genre,"Veuillez choisir un genre valide (homme/femme/non-binaire)");
  } else {
    afficheSucces(genre);
  }
};

// Validation date (JJ/MM/AAAA) -> Date de naissance
const validerDateDeNaissance = () => {
  const dateDeNaissanceValeur = dateDeNaissance.value.trim();
  if (dateDeNaissanceValeur === "") {
    afficheErreur(dateDeNaissance, "Ce champ est obligatoire");
  } else if (!estValideDate(dateDeNaissanceValeur)) {
    afficheErreur(dateDeNaissance,"Veuillez entrer une date valide (JJ/MM/AAAA)");
  } else {
    afficheSucces(dateDeNaissance);
  }
};

// Validation d'un nombre entier  -> Valeur du Vehicule
const validerVehiculeValeur = () => {
  const vehiculeValeur = valeurDuVehicule.value.trim();

  if (vehiculeValeur === "") {
    afficheErreur(valeurDuVehicule, "Ce champ est obligatoire");
  } else if (vehiculeValeur.startsWith('-')) {
    afficheErreur(valeurDuVehicule, "Veuillez entrer un nombre positif");
  } else if (!estValideNombre(vehiculeValeur)) {
    afficheErreur(valeurDuVehicule, "Veuillez entrer un nombre valide");
  } else {
    afficheSucces(valeurDuVehicule);
  }
};

// Validation date (JJ/MM/AAAA) -> Date Fabrication du Vehicule
const validerDateFabricationDuVehicule = () => {
  const dateFabricationDuVehiculeValeur = dateFabricationDuVehicule.value.trim();
  if (dateFabricationDuVehiculeValeur === "") {
    afficheErreur(dateFabricationDuVehicule, "Ce champ est obligatoire");
  } else if (!estValideDate(dateFabricationDuVehiculeValeur)) {
    afficheErreur(dateFabricationDuVehicule,"Veuillez entrer une date valide (JJ/MM/AAAA)");
  } else {
    afficheSucces(dateFabricationDuVehicule);
  }
};

// Validation chiffre entier  -> Nombre de Kilometres Par An
const validerKilometresParAn = () => {
  const kilometresParAnValeur = kilometresParAn.value.trim();
  if (kilometresParAnValeur === "") {
    afficheErreur(kilometresParAn, "Ce champ est obligatoire");
  } else if (kilometresParAnValeur.startsWith('-')) {
    afficheErreur(kilometresParAn, "Veuillez entrer un nombre positif");
  } else if (!estValideNombre(kilometresParAnValeur)) {
    afficheErreur(kilometresParAn, "Veuillez entrer un nombre valide");
  } else {
    afficheSucces(kilometresParAn);
  }
};

// Validation reponse (oui ou non) -> Camera de recul
const validerCameraDeRecul = () => {
  const cameraDeReculValeur = cameraDeRecul.value.trim().toLowerCase();
  if (cameraDeReculValeur === "") {
    afficheErreur(cameraDeRecul, "Ce champ est obligatoire");
  } else if (!estValideReponse(cameraDeReculValeur)) {
    afficheErreur(cameraDeRecul, "Veuillez répondre par 'oui' ou 'non'");
  } else {
    afficheSucces(cameraDeRecul);
  }
};

// Validation reponse (oui ou non) -> Reclamations
const validerReclamations = () => {
  const reclamationsValeur = reclamations.value.trim().toLowerCase();
  if (reclamationsValeur === "") {
    afficheErreur(reclamations, "Ce champ est obligatoire");
  } else if (!estValideReponse(reclamationsValeur)) {
    afficheErreur(reclamations, "Veuillez répondre par 'oui' ou 'non'");
  } else {
    afficheSucces(reclamations);
  }
};

// Fonctions de validation genre (homme ou femme ou non-binaire)
const estValideGenre = (genre) => {
  const minusculeGenre = genre.toLowerCase();
  return (minusculeGenre === "homme" || minusculeGenre === "femme" || minusculeGenre === "non-binaire");
};

// Fonction de validation reponse (oui ou non)
const estValideReponse = (reponse) => {
  const minusculeReponse = reponse.toLowerCase();
  return (minusculeReponse === "oui" || minusculeReponse === "non");
};

// Fonctions de validation date match (JJ/MM/AAAA)
const estValideDate = (date) => {
  return date.match(/^\d{2}\/\d{2}\/\d{4}$/);
};

// Fonction de calculation de l'age
const calculerAge = (dateDeNaissance) => {
  const [jour, mois, annee] = dateDeNaissance.split("/").map(Number);

  const aujourdHui = new Date();
  const dateNaissance = new Date(annee, mois - 1, jour);

  let age = aujourdHui.getFullYear() - dateNaissance.getFullYear();

  aujourdHui.setFullYear(aujourdHui.getFullYear());
  if (aujourdHui < dateNaissance) {
    age--;
  }

  return age;
};

// Fonction de validation nombre
const estValideNombre = (nombre) => {
  return /^\d+$/.test(nombre);
};

//Fonction Calculer le montant de base
const calculerMontantBase = (genreValeur, age, vehiculeValeur) => {
  let montantBase = 0;

  if ((genreValeur === "homme" || genreValeur === "non-binaire") && age < 25) {
    montantBase = 0.05 * vehiculeValeur;
  } else if (age >= 75) {
    montantBase = 0.04 * vehiculeValeur;
  } else {
    montantBase = 0.015 * vehiculeValeur;
  }

  return montantBase;
};

// Fonction calculer l'assurance Anuelle
const calculerAssuranceAnuelle = () => {
  const genreValeur = genre.value.trim().toLowerCase();
  const dateDeNaissanceValeur = dateDeNaissance.value.trim();
  const vehiculeValeur = parseInt(valeurDuVehicule.value.trim(), 10);
  const kilometresParAnValeur = parseInt(kilometresParAn.value.trim(), 10);
  const PrixTotalReclamations = parseFloat(CalculerPrixTotalReclamations());
  let nombreReclamations = parseInt(quantiteReclamations.value.trim(), 10);
  const age = calculerAge(dateDeNaissanceValeur);

  if (isNaN(nombreReclamations)) {
    nombreReclamations = 0;
  }

  const montantBase = calculerMontantBase(genreValeur, age, vehiculeValeur);
  const assuranceAnnuelle =  montantBase + (350 * nombreReclamations) + (0.02 * kilometresParAnValeur);

  if (PrixTotalReclamations > 25000) {
    return assuranceAnnuelle + 700;
  }

  return assuranceAnnuelle;
};

// Fonction calculer l'assurance Mensuelle (AssuranceAnuelle / 12)
const calculerAssuranceMensuelle = () => {
  const assuranceAnnuelle = calculerAssuranceAnuelle();
  const assuranceMensuelle = assuranceAnnuelle / 12;
  return assuranceMensuelle;
};

// Fonction de validation de non assurance
const estValideAssurance = () => {
  const genreValeur = genre.value.trim().toLowerCase();
  const dateDeNaissanceValeur = dateDeNaissance.value.trim();
  const vehiculeValeur = parseInt(valeurDuVehicule.value.trim(), 10);
  const dateFabricationDuVehiculeValeur = dateFabricationDuVehicule.value.trim();
  const kilometresParAnValeur = parseInt(kilometresParAn.value.trim(), 10);
  const cameraDeReculValeur = cameraDeRecul.value.trim().toLowerCase();

  const nombreReclamations = parseInt(quantiteReclamations.value.trim(), 10);
  const PrixTotalReclamations = parseFloat(CalculerPrixTotalReclamations());

  const age = calculerAge(dateDeNaissanceValeur);
  const vehicleAge = calculerAge(dateFabricationDuVehiculeValeur);

  let erreurs = "";

  if (genreValeur === "femme" && age < 16) {
    erreurs += "Les femmes de moins de 16 ans.\n";
  }
  if (genreValeur === "homme" && age < 18) {
    erreurs += "Les hommes de moins de 18 ans.\n";
  }
  if (genreValeur === "non-binaire" && age < 18) {
    erreurs += "Une personne non-binaire de moins de 18 ans.\n";
  }
  if (age >= 100) {
    erreurs += "Les personnes de 100 ans ou plus.\n";
  }
  if (vehicleAge > 25) {
    erreurs += "Un véhicule de plus de 25 ans.\n";
  }
  if (vehiculeValeur > 100000) {
    erreurs += "Un véhicule de plus de 100 000$ à l'achat.\n";
  }
  if (nombreReclamations > 4) {
    erreurs += "Une personne avec plus de 4 réclamations.\n";
  }
  if (PrixTotalReclamations > 35000) {
    erreurs += "Une personne avec plus de 35 000$ de réclamation.\n";
  }
  if (kilometresParAnValeur > 50000) {
    erreurs += "Une personne qui parcourt plus de 50000 km par année.\n";
  }
  if (cameraDeReculValeur !== "oui") {
    erreurs += "Un véhicule qui n'a pas de caméra de recul.\n";
  }

  if (erreurs != "") {
    alert("Désolé, nous n'avons aucun produit à offrir pour ce profil de client:\n\n" + erreurs);
    return true;
  }

  return false;
};

// Affichage des reclamations
function afficherReclamationQuestions() {
  const historiqueReclamations = document.getElementById("reclamations").value.trim().toLowerCase();
  const questionsReclamation = document.querySelector(".reclamationQuestions");

  if (historiqueReclamations === "oui") {
    questionsReclamation.style.display = "block";
  } else if (historiqueReclamations === "non") {
    questionsReclamation.style.display = "none";
  }
}
// Reset l'affichage des reclamations
function reinitialiserQuestionsReclamation() {
  const questionsReclamation = document.querySelector(".reclamationQuestions");
  questionsReclamation.style.display = "none";
}

// Fonction pour créer des des champs de réclamations
function creationQuantiteReclamations() {
  const quantiteReclamations = parseInt(document.getElementById("quantiteReclamations").value);
  const MontantsReclamations = document.querySelector(".MontantsReclamations");
  MontantsReclamations.innerHTML = "";

  // Boucle pour créer des réclamations
  for (let i = 1; i <= quantiteReclamations; i++) {
    const label = document.createElement("label");
    label.textContent = `Pour la réclamation ${i}`;

    // Création d'un input de type nombre pour la réclamation index {i}
    const input = document.createElement("input");
    input.type = "number";
    input.name = `montantReclamation${i}`;
    const br = document.createElement("br");

    MontantsReclamations.appendChild(label);
    MontantsReclamations.appendChild(input);
    MontantsReclamations.appendChild(br);
  }
}

// Fonction pour calculer le prix total des réclamations
function CalculerPrixTotalReclamations() {
  const quantiteReclamations = parseInt(document.getElementById("quantiteReclamations").value);
  let montantTotal = 0;

  for (let i = 1; i <= quantiteReclamations; i++) {
    const montantReclamation = parseFloat(document.getElementsByName(`montantReclamation${i}`)[0].value);
    if (!isNaN(montantReclamation)) {
      montantTotal += montantReclamation;
    }
  }

  return montantTotal;
}
