import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
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
async function afficherProduits(categorie = null, searchQuery = '') {
  try {
    const produitsRef = collection(db, "produits");
    let produitsSnapshot;

    // Si une catégorie est spécifiée, filtrer par catégorie
    if (categorie) {
      const produitsQuery = query(produitsRef, where("categorie", "==", categorie));
      produitsSnapshot = await getDocs(produitsQuery);
    } else if (searchQuery) {
      // Si une recherche est effectuée, filtrer par nom de produit
      const produitsQuery = query(produitsRef, where("nomProduit", ">=", searchQuery), where("nomProduit", "<=", searchQuery + '\uf8ff'));
      produitsSnapshot = await getDocs(produitsQuery);
    } else {
      produitsSnapshot = await getDocs(produitsRef);  // Récupérer tous les produits si aucun filtre n'est spécifié
    }

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

      // Bouton ajouter dans le panier
      const boutonAjouter = produitDiv.querySelector('.btn');  
      boutonAjouter.addEventListener('click', () => {
        const produitId = doc.id;
        let panier = JSON.parse(localStorage.getItem('panier')) || [];
        const produitExiste = panier.find(item => item.id === produitId);

        if (!produitExiste) {
          panier.push({ id: produitId, quantite: 1 });
        } else {
          produitExiste.quantite++;
        }

        function mettreAJourAffichagePanier() {
          let panier = JSON.parse(localStorage.getItem('panier')) || [];
          const spanPanier = document.querySelector('.connect_panier .panier span');
  
          let totalQuantite = 0;
          panier.forEach(produit => {
              totalQuantite += produit.quantite;
          });
  
          spanPanier.textContent = totalQuantite;
      }

        localStorage.setItem('panier', JSON.stringify(panier));
        mettreAJourAffichagePanier();
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
  }
}

// Afficher les produits au chargement de la page
window.addEventListener("load", () => {
  afficherProduits(); // Afficher tous les produits au départ
});

// Gestionnaires d'événements pour le filtrage des catégories
document.addEventListener('DOMContentLoaded', () => {
  const categorieElements = document.querySelectorAll('.sidebar ul li'); // Sélectionner tous les éléments de catégorie

  categorieElements.forEach((categorieElement) => {
    categorieElement.addEventListener('click', () => {
      const categorie = categorieElement.textContent.trim().toLocaleLowerCase(); // Récupérer le texte de la catégorie (ex: "Ordinateur")
      afficherProduits(categorie); // Afficher les produits filtrés par catégorie
    });
  });

  // Gestion de la flèche pour afficher/masquer la sidebar
  const sidebarActif = document.querySelector('.sidebar');
  const flecheActivation = document.querySelector('.lafleche');

  flecheActivation.addEventListener('click', () => {
    sidebarActif.classList.toggle('active');
  });

  const searchInput = document.querySelector('.searcBar input'); 
  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.trim().toLowerCase();
    afficherProduits(searchQuery); 
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const panier = document.querySelector('.connect_panier .panier');
  panier.addEventListener('click', () => { 
      const estConnecte = verifierSiUtilisateurEstConnecte(); 

      if (!estConnecte) {
          alert("Veuillez vous connecter ou créer un compte pour accéder à votre panier.");
      } else {
          afficherContenuPanier(); 
      }
  });

  
});


function verifierSiUtilisateurEstConnecte() {
  return false; 
}

function afficherContenuPanier() {
  console.log("Afficher le contenu du panier");
}