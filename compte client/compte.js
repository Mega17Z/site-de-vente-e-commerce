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