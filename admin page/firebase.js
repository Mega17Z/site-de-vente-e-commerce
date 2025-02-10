import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";

// Configuration Firebase pour les produits
const firebaseConfigProduit = {
  apiKey: "AIzaSyDUIqQOW9Oy66YaJVDvxocoVxiGAlirvMQ",
  authDomain: "ajout-de-produit.firebaseapp.com",
  projectId: "ajout-de-produit",
  storageBucket: "ajout-de-produit.firebasestorage.app",
  messagingSenderId: "481573722872",
  appId: "1:481573722872:web:c15506732fc6d9516f390d"
};

// Configuration Firebase pour les utilisateurs
const firebaseConfigUtilisateur = {
  apiKey: "AIzaSyDTCapeLe48dTnMvckuxLOTTJzKagbSRCU",
  authDomain: "utilisateurs-eedf9.firebaseapp.com",
  projectId: "utilisateurs-eedf9",
  storageBucket: "utilisateurs-eedf9.firebasestorage.app",
  messagingSenderId: "944916347507",
  appId: "1:944916347507:web:3e61e0ecd31fe8c3fb8806"
};

// Initialisation des applications Firebase avec des configurations différentes
let appProduit, appUtilisateur;

// Initialiser Firebase pour les produits si ce n'est pas déjà fait
if (getApps().length === 0) {
  appProduit = initializeApp(firebaseConfigProduit, "produitApp");
  appUtilisateur = initializeApp(firebaseConfigUtilisateur, "utilisateurApp");
} else {
  // Si Firebase est déjà initialisé, récupérer les instances existantes
  appProduit = getApps().find(app => app.name === "produitApp");
  appUtilisateur = getApps().find(app => app.name === "utilisateurApp");
}

export { appProduit, appUtilisateur };