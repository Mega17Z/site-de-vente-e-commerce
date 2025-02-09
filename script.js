const sidebarActif = document.querySelector('.sidebar')
const flecheActivation = document.querySelector('.lafleche')

flecheActivation.addEventListener('click', ()=>{
    sidebarActif.classList.toggle('active')
})


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUIqQOW9Oy66YaJVDvxocoVxiGAlirvMQ",
  authDomain: "ajout-de-produit.firebaseapp.com",
  projectId: "ajout-de-produit",
  storageBucket: "ajout-de-produit.firebasestorage.app",
  messagingSenderId: "481573722872",
  appId: "1:481573722872:web:c15506732fc6d9516f390d"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Fonction pour afficher les produits
async function afficherProduits() {
  try {
    // Récupérer les produits depuis Firestore
    const produitsRef = collection(db, "produits");
    const produitsSnapshot = await getDocs(produitsRef);
    const produitsList = produitsSnapshot.docs;

    const panierContainer = document.querySelector('.lespanier');
    panierContainer.innerHTML = ''; // Vider le conteneur des produits existants

    produitsList.forEach(async (doc) => {
      const produitData = doc.data();
      const nomProduit = produitData.nomProduit;
      const prixProduit = produitData.prixProduit;
      const categorie = produitData.categorie;
      const imageUrl = produitData.imageUrl;

      // Créer un nouvel élément HTML pour chaque produit
      const produitDiv = document.createElement('div');
      produitDiv.classList.add('panier');
      produitDiv.innerHTML = `
        <div class="image">
          <img src="${imageUrl || ''}" alt="${nomProduit}" id="produit-image">
        </div>
        <div class="info-panier">
          <p class="category m-0">${categorie}</p>
          <div class="mt-1 nomPrix d-flex align-items-center justify-content-between">
            <h4 class="nomProduit m-0">${nomProduit}</h4>
            <h5 class="m-0"><span class="prix">${prixProduit}</span><span>fr</span></h5>
          </div>
          <button class="btn d-flex align-items-center gap-2 justify-content-center mt-2 p-1">
            <i class="fa-solid fa-plus"></i><span>Ajouter</span>
          </button>
        </div>
      `;
      panierContainer.appendChild(produitDiv);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
  }
}

// Afficher les produits au chargement de la page
window.addEventListener("load", afficherProduits);
