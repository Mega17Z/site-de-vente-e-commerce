const lepanierActif = document.querySelector('.navbar .panier')

const sidebarActif = document.querySelector('.sidebar')
const flecheActivation = document.querySelector('.lafleche')

flecheActivation.addEventListener('click', ()=>{
    sidebarActif.classList.toggle('active')
})

const profilAffiche = document.querySelector('.connect_afficher')
const affichageProfil = document.querySelector('.infoprofil')

profilAffiche.addEventListener('click', () => {
    affichageProfil.classList.toggle('active')
})


const Produit = document.querySelector('.Compteproduit')
const Panier = document.querySelector('.Comptepanier')

const leActive = document.querySelectorAll('.compteactive')
const mesproduits = document.querySelector('.contenus')
const monpanier = document.querySelector('.Sectpaniers')

Produit.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    mesproduits.classList.add('active')
})

Panier.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    monpanier.classList.add('active')
})

lepanierActif.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    monpanier.classList.add('active')
})

import { appProduit } from '../admin page/firebase.js';
// import { appUtilisateur } from '../admin page/firebase.js';
// import { appProduit } from '../admin page/firebase.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js";

// Initialisation Firestore et Storage pour l'app Produit
const dbProduit = getFirestore(appProduit);
const storageProduit = getStorage(appProduit);

// const authUtilisateur = getAuth(appUtilisateur);
// const dbUtilisateur = getFirestore(appUtilisateur);

// const db = getFirestore(app);
// const storage = getStorage(app);

// Fonction pour afficher les produits
let panier = [];
let total = 0;  // Déclarez le total global

const compte = document.getElementById('nombre');
const partieMonPanier = document.querySelector('.Sectpaniers');

// Fonction pour afficher le panier et le total
function afficherPanier() {
//   partieMonPanier.innerHTML = ''; // Vider le conteneur du panier avant de le remplir à nouveau
  total = 0; // Réinitialiser le total à chaque affichage du panier

  panier.forEach((el, index) => {
    const div = document.createElement('div');
    div.classList.add('monpanier');
    div.innerHTML = `
      <div class="panier-info mb-1 px-1">
        <img src="${el.imageUrl || ''}" alt="${el.nomProduit}">
        <div class="nomPrix">
          <h6 class="m-0">${el.nomProduit}</h6>
          <h6 class="mt-2"><span class="me-2"><u>Prix:</u></span><span class="prix">${el.prixProduit}</span><span>fr</span></h6>
          <div class="laquantite">
            <i class="fa-solid fa-minus"></i>
            <p class="m-0" id="quantite-${index}">${el.quantite || 0}</p>
            <i class="fa-solid fa-plus"></i>
          </div>
          <h6>Total : <span id="total-${index}">${(el.prixProduit * (el.quantite || 0)).toFixed(2)}fr</span></h6>
        </div>
      </div>
    `;
    partieMonPanier.appendChild(div);

    // Sélectionner les éléments d'augmentation et de diminution
    const minusButton = div.querySelector('.fa-minus');
    const plusButton = div.querySelector('.fa-plus');
    const quantityDisplay = div.querySelector(`#quantite-${index}`);
    const totalDisplay = div.querySelector(`#total-${index}`);

    // Gestion de l'événement pour le bouton "-" (diminuer la quantité)
    minusButton.addEventListener('click', () => {
      if (el.quantite > 0) {
        el.quantite--; // Décrémenter la quantité
        quantityDisplay.textContent = el.quantite; // Mettre à jour l'affichage de la quantité
        totalDisplay.textContent = `${(el.prixProduit * el.quantite).toFixed(2)}fr`; // Mettre à jour le total du produit

        // Recalculer le total global
        total = panier.reduce((acc, item) => acc + (item.prixProduit * item.quantite), 0);
        document.querySelector('.totalProduits').textContent = `${total.toFixed(2)}fr`; // Afficher le total global
      }
    });

    // Gestion de l'événement pour le bouton "+" (augmenter la quantité)
    plusButton.addEventListener('click', () => {
      el.quantite++; // Incrémenter la quantité
      quantityDisplay.textContent = el.quantite; // Mettre à jour l'affichage de la quantité
      totalDisplay.textContent = `${(el.prixProduit * el.quantite).toFixed(2)}fr`; // Mettre à jour le total du produit

      // Recalculer le total global
      total = panier.reduce((acc, item) => acc + (item.prixProduit * item.quantite), 0);
      document.querySelector('.totalProduits').textContent = `${total.toFixed(2)}fr`; // Afficher le total global
    });

    // Ajouter le total du produit au total global
    total += el.prixProduit * el.quantite;
  });
}

// Fonction pour afficher les produits
async function afficherProduits() {
  try {
    // Récupérer les produits depuis Firestore
    const produitsRef = collection(dbProduit, "produits");
    const produitsSnapshot = await getDocs(produitsRef);
    const produitsList = produitsSnapshot.docs;

    const panierContainer = document.querySelector('.lespanier');
    panierContainer.innerHTML = ''; // Vider le conteneur des produits existants

    produitsList.forEach(async (doc) => {
      const produitData = doc.data();
      const nomProduit = produitData.nomProduit;
      let prixProduit = parseFloat(produitData.prixProduit); // Convertir en nombre
      const categorie = produitData.categorie;
      const imageUrl = produitData.imageUrl;

      // Vérifier si le prix est un nombre valide
      if (isNaN(prixProduit)) {
        console.error(`Prix invalide pour le produit ${nomProduit}`);
        prixProduit = 0; // Définit un prix par défaut en cas d'erreur
      }

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
          <button class="btn d-flex align-items-center gap-2 justify-content-center mt-2 p-1 add-to-cart">
            <i class="fa-solid fa-plus"></i><span>Ajouter</span>
          </button>
        </div>
      `;
      panierContainer.appendChild(produitDiv);
      const addButton = produitDiv.querySelector('.add-to-cart');

      // Ajouter un événement de clic sur le bouton
      addButton.addEventListener('click', () => {
        // Vérifier si le produit est déjà dans le panier
        if (!panier.some(item => item.nomProduit === nomProduit)) {
          // Si le produit n'est pas déjà dans le panier, on l'ajoute
          produitData.quantite = 1; // Initialiser la quantité à 1
          panier.push(produitData); // Ajouter le produit au panier
          compte.textContent = panier.length; // Mettre à jour le compteur
          afficherPanier(); // Mettre à jour l'affichage du panier

          console.log(`${nomProduit} ajouté au panier !`);
          console.log(panier);
        } else {
          console.log(`${nomProduit} est déjà dans le panier.`);
        }
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
  }
}

// Afficher les produits au chargement de la page
window.addEventListener("load", afficherProduits);

// const lenom = document.getElementById('utilisateur')
// const recupernom = JSON.parse(localStorage.getItem('Idutilisateur'))
// console.log(lenom)
// console.log(recupernom)
// lenom.textContent = recupernom