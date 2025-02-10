import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTCapeLe48dTnMvckuxLOTTJzKagbSRCU",
  authDomain: "utilisateurs-eedf9.firebaseapp.com",
  projectId: "utilisateurs-eedf9",
  storageBucket: "utilisateurs-eedf9.firebasestorage.app",
  messagingSenderId: "944916347507",
  appId: "1:944916347507:web:3e61e0ecd31fe8c3fb8806"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Utilisation de Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app)

// Fonction d'inscription
const handleSignUp = async (event) => {
  event.preventDefault();  // Empêche la soumission du formulaire classique

  // Récupérer les informations du formulaire
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Utilisateur créé :", user);  // Ajoutez un log ici
    
    const donnerUser = {
      email: email,
      prenom: firstname,
      nom: lastname
    };
    
    const docRef = doc(db, "utilisateurs", user.uid);
    await setDoc(docRef, donnerUser);
    
    alert("Inscription réussie !");
    window.location.href = "connexion.html";  // Redirection vers la page de connexion
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    alert("Erreur lors de l'inscription: " + error.message);
  }
  
};

// Attacher l'événement de soumission au formulaire
const form = document.getElementById("signup-form");  // Utiliser l'ID pour le formulaire
form.addEventListener("submit", handleSignUp);
