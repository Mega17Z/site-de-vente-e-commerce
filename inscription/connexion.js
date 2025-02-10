// const utilisateur = document.getElementById('username')
// const motdepasse = document.getElementById('password')


// const connectBtn = document.getElementById('connect')


// connectBtn.addEventListener('click', (e)=> {
//     e.preventDefault()

//     const valUser = utilisateur.value
//     const valPass = motdepasse.value

//     const admin = {
//         nomUser: 'admin',
//         motdepasse: 'admin'
//     }

//     if(valPass == '' || valUser == ''){
//         return
//     }

//     if(valUser == admin.nomUser && valPass == admin.motdepasse){
//         window.location.href = '../admin page/admin.html'
//     }
    
// })


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDTCapeLe48dTnMvckuxLOTTJzKagbSRCU",
  authDomain: "utilisateurs-eedf9.firebaseapp.com",
  projectId: "utilisateurs-eedf9",
  storageBucket: "utilisateurs-eedf9.firebasestorage.app",
  messagingSenderId: "944916347507",
  appId: "1:944916347507:web:3e61e0ecd31fe8c3fb8806"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Récupération de l'authentification
const auth = getAuth(app);

// Fonction de connexion
const handleLogin = async (event) => {
  event.preventDefault(); // Empêche le formulaire de se soumettre de manière classique

  // Récupérer les informations du formulaire
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

    const admin = {
        nomUser: 'admin',
        motdepasse: 'admin'
    }

    if(username == admin.nomUser && password == admin.motdepasse){
        window.location.href = '../admin page/admin.html'
    }

  try {
    // Authentification de l'utilisateur avec Firebase
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;

    // Connexion réussie
    console.log("Utilisateur connecté :", user);
    alert("Connexion réussie !");
    
    // Redirection vers la page d'accueil ou une autre page après la connexion
    window.location.href = "../compte client/compte.html";  // Remplacez par la page que vous souhaitez
  } catch (error) {
    console.error("Erreur de connexion:", error);
    document.getElementById("message").textContent = "Nom d'utilisateur ou mot de passe incorrect.";
  }
};

// Attacher l'événement de soumission au formulaire
const form = document.querySelector("form"); // Le formulaire de connexion
form.addEventListener("submit", handleLogin);
