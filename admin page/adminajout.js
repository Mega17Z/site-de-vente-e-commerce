import { appUtilisateur } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, collection, setDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Initialisation Auth et Firestore pour l'app Utilisateur
const authUtilisateur = getAuth(appUtilisateur);
const dbUtilisateur = getFirestore(appUtilisateur);

// Code pour gérer les utilisateurs ici...

// Utilisation de Firebase Authentication et Firestore
// const auth = getAuth(app);
// const db = getFirestore(app);

// Fonction d'inscription
const handleSignUp = async (event) => {
  event.preventDefault();  // Empêche la soumission classique du formulaire (évite le rechargement de la page)

  // Récupérer les données du formulaire
  const prenom = document.getElementById("Prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("motdepasse").value;  // Assurez-vous de récupérer le bon champ de mot de passe

  try {
    // Créer un utilisateur avec Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(authUtilisateur, email, password);
    const user = userCredential.user;
    console.log("Utilisateur créé :", user);  // Ajoutez un log pour déboguer

    // Sauvegarder les informations de l'utilisateur dans Firestore
    const donnerUser = {
      email: email,
      prenom: prenom,
      nom: nom
    };

    // Référence du document Firestore
    const docRef = doc(dbUtilisateur, "utilisateurs", user.uid);
    await setDoc(docRef, donnerUser);  // Enregistrement dans Firestore

    alert("Inscription réussie !");

    loadUsers();
    // Vous pouvez rediriger l'utilisateur ou faire d'autres actions ici
    // window.location.href = "connexion.html"; // Exemple de redirection vers la page de connexion
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    alert("Erreur lors de l'inscription: " + error.message);
  }
};

// Attacher l'événement de soumission du formulaire
const form = document.getElementById("ajouterUtilisateur");  // Utilisation de l'ID du formulaire
form.addEventListener("submit", handleSignUp);





// Fonction pour récupérer et afficher les utilisateurs
const loadUsers = async () => {
try {
  const usersCollection = collection(dbUtilisateur, "utilisateurs");  // Référence à la collection utilisateurs
  const userSnapshot = await getDocs(usersCollection);  // Récupère les documents de la collection
  const userList = userSnapshot.docs.map(doc => doc.data());  // Transforme les documents en données

  // Sélectionner le conteneur où afficher les utilisateurs
  const usersContainer = document.querySelector(".utilisateur");

  // Vider le conteneur avant de le remplir avec les utilisateurs
  usersContainer.innerHTML = '';

  // Boucle pour créer un élément pour chaque utilisateur
  userList.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("users", "d-flex", "align-items-center", "user-item", "mb-3");

    userDiv.innerHTML = `
      <div class="lesinfos">
        <h5 class="m-0">${user.prenom} ${user.nom}</h5>
        <h6 class="">${user.email}</h6>
      </div>
      <i class="fa-solid fa-trash" onclick="deleteUser('${user.email}')"></i>  <!-- On ajoute un bouton de suppression -->
    `;

    usersContainer.appendChild(userDiv);  // Ajoute chaque div utilisateur au conteneur
  });
} catch (error) {
    console.error("Erreur lors de la récupération des utilisateur : ", error);
  }
};

// Fonction pour supprimer un utilisateur (optionnel)
// const deleteUser = (email) => {
  // Implémentez la logique pour supprimer un utilisateur de Firestore
//   alert(`Suppression de l'utilisateur avec l'email: ${email}`);
  // Vous pouvez ajouter une logique pour supprimer l'utilisateur de Firestore ici
// };

// Appel de la fonction pour charger les utilisateurs dès que la page se charge
loadUsers();

