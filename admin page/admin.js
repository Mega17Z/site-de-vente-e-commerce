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
const Ajout = document.querySelector('.Compteajout')
const AjoutUsers = document.querySelector('.Compteajoutusers')
const Users = document.querySelector('.Compteutilisateur')

const leActive = document.querySelectorAll('.compteactive')
const mesproduits = document.querySelector('.contenus')
const ajoutProduit = document.querySelector('.Ajouter')
const ajoutUtilisateur = document.querySelector('.AjoutUsers')
const lesUsers = document.querySelector('.utilisateurs')

Produit.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    mesproduits.classList.add('active')
})

Ajout.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    ajoutProduit.classList.add('active')
})

AjoutUsers.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    ajoutUtilisateur.classList.add('active')
})


Users.addEventListener('click', () => {
    leActive.forEach((el) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
    })
    lesUsers.classList.add('active')
})



// Firebase SDKs
// import { appProduit } from './firebase.js';
// import { getFirestore, collection, addDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js";

// // Initialisation Firestore et Storage pour l'app Produit
// const dbProduit = getFirestore(appProduit);
// const storageProduit = getStorage(appProduit);


// // Fonction pour ajouter un produit
// async function ajouterProduit(nom, prix, categorie, imageFile) { 
//   try {
//     // Ajouter le produit à Firestore
//     const docRef = await addDoc(collection(dbProduit, "produits"), {
//       nomProduit: nom,
//       prixProduit: prix,
//       categorie: categorie,
//       imageUrl: "", // Initialisation de l'URL à null
//     });

//     console.log('Produit ajouté à Firestore, ID :', docRef.id);

//     // Si une image est sélectionnée
//     if (imageFile) {
//       const storageRef = ref(storageProduit, 'produits/' + imageFile.name);
//       console.log('Début du téléchargement de l\'image :', imageFile.name);

//       // Télécharger l'image sur Firebase Storage
//       const snapshot = await uploadBytes(storageRef, imageFile);
//       console.log('Téléchargement terminé pour l\'image :', imageFile.name);

//       // Obtenir l'URL de l'image
//       const downloadURL = await getDownloadURL(snapshot.ref);
//       console.log('URL de l\'image obtenue :', downloadURL);

//       // Mettre à jour Firestore avec l'URL de l'image
//       await updateDoc(docRef, {
//         imageUrl: downloadURL
//       });
//       console.log("Produit ajouté avec succès avec image !");
//     } else {
//       console.log("Produit ajouté sans image !");
//     }
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du produit : ", error);
//   }
// }

// // Fonction pour afficher les produits
// async function afficherProduits() {
//   try {
//     // Récupérer les produits depuis Firestore
//     const produitsRef = collection(dbProduit, "produits");
//     const produitsSnapshot = await getDocs(produitsRef);
//     const produitsList = produitsSnapshot.docs;

//     const panierContainer = document.querySelector('.lespanier');
//     panierContainer.innerHTML = ''; // Vider le conteneur des produits existants

//     produitsList.forEach(async (doc) => {
//       const produitData = doc.data();
//       const nomProduit = produitData.nomProduit;
//       const prixProduit = produitData.prixProduit;
//       const categorie = produitData.categorie;
//       const imageUrl = produitData.imageUrl;

//       // Créer un nouvel élément HTML pour chaque produit
//       const produitDiv = document.createElement('div');
//       produitDiv.classList.add('panier');
//       produitDiv.innerHTML = `
//         <div class="image">
//           <img src="${imageUrl || ''}" alt="${nomProduit}" id="produit-image">
//         </div>
//         <div class="info-panier">
//           <p class="category m-0">${categorie}</p>
//           <div class="mt-1 nomPrix d-flex align-items-center justify-content-between">
//             <h4 class="nomProduit m-0">${nomProduit}</h4>
//             <h5 class="m-0"><span class="prix">${prixProduit}</span><span>fr</span></h5>
//           </div>
//           <button class="btn d-flex align-items-center gap-2 justify-content-center mt-2 p-1">
//             <i class="fa-solid fa-plus"></i><span>Ajouter</span>
//           </button>
//         </div>
//       `;
//       panierContainer.appendChild(produitDiv);
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits : ", error);
//   }
// }

// // Gérer l'input de fichier et la prévisualisation de l'image
// const inputFile = document.getElementById('import');
// const imagePreview = document.getElementById('imagePreview');

// inputFile.addEventListener('change', function () {
//   const file = inputFile.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       imagePreview.src = URL.createObjectURL(file);   // Afficher l'aperçu de l'image
//     };
//     reader.readAsDataURL(file);
//   }
// });

// // Ajouter un produit via un formulaire
// const form = document.getElementById("ajouterProduit");
// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const nom = document.getElementById("nomduproduit").value;
//   const prix = document.getElementById("prixduproduit").value;
//   const categorie = document.getElementById("category").value;

//   const imageFile = inputFile.files[0];  // Obtenir le fichier de l'input

//   if (imageFile && imageFile.type.startsWith("image/")) {
//     ajouterProduit(nom, prix, categorie, imageFile)
//       .then(() => {
//         alert("Produit ajouté avec succès !");
//         form.reset();  // Réinitialiser le formulaire après ajout
//         afficherProduits();  // Afficher tous les produits après ajout
//       })
//       .catch((error) => {
//         console.error("Erreur lors de l'ajout du produit : ", error);
//       });
//   } else {
//     alert("Veuillez sélectionner une image valide.");
//   }
// });

// // Afficher les produits au chargement de la page
// window.addEventListener("load", afficherProduits);



import { appProduit } from './firebase.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Initialisation Firestore
const dbProduit = getFirestore(appProduit);

// Configuration Cloudinary
const cloudName = 'test-coc';  // Remplacez par votre Cloud Name Cloudinary
const uploadPreset = 'ml_default';    // Remplacez par votre upload preset

// Fonction pour ajouter un produit
async function ajouterProduit(nom, prix, categorie, imageFile) {
  try {
    // Ajouter le produit à Firestore sans l'URL de l'image
    const docRef = await addDoc(collection(dbProduit, "produits"), {
      nomProduit: nom,
      prixProduit: prix,
      categorie: categorie,
      imageUrl: "",  // Initialisation de l'URL à vide
    });

    console.log('Produit ajouté à Firestore, ID :', docRef.id);

    // Si une image est sélectionnée
    if (imageFile) {
      // FormData pour envoyer l'image à Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', uploadPreset);  // Préciser le preset Cloudinary
      formData.append('cloud_name', cloudName);        // Votre Cloud Name Cloudinary

      // Envoi de l'image vers Cloudinary via fetch
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      // Vérifier que l'upload a réussi
      if (data.secure_url) {
        const imageUrl = data.secure_url; // URL de l'image Cloudinary
        console.log('Image téléchargée sur Cloudinary, URL :', imageUrl);

        // Mettre à jour Firestore avec l'URL de l'image
        await updateDoc(docRef, {
          imageUrl: imageUrl
        });

        console.log("Produit ajouté avec succès avec image !");
      } else {
        console.error('Erreur de téléchargement sur Cloudinary', data);
      }
    } else {
      console.log("Produit ajouté sans image !");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit : ", error);
  }
}

// Fonction pour afficher les produits
async function afficherProduits() {
  try {
    const produitsRef = collection(dbProduit, "produits");
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

// Gérer l'input de fichier et la prévisualisation de l'image
const inputFile = document.getElementById('import');
const imagePreview = document.getElementById('imagePreview');

inputFile.addEventListener('change', function () {
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src = URL.createObjectURL(file);  // Afficher l'aperçu de l'image
    };
    reader.readAsDataURL(file);
  }
});

// Ajouter un produit via un formulaire
const form = document.getElementById("ajouterProduit");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nomduproduit").value;
  const prix = document.getElementById("prixduproduit").value;
  const categorie = document.getElementById("category").value;

  const imageFile = inputFile.files[0];  // Obtenir le fichier de l'input

  if (imageFile && imageFile.type.startsWith("image/")) {
    ajouterProduit(nom, prix, categorie, imageFile)
      .then(() => {
        alert("Produit ajouté avec succès !");
        form.reset();  // Réinitialiser le formulaire après ajout
        afficherProduits();  // Afficher tous les produits après ajout
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du produit : ", error);
      });
  } else {
    alert("Veuillez sélectionner une image valide.");
  }
});

// Afficher les produits au chargement de la page
window.addEventListener("load", afficherProduits);


