/* MENU BURGER */
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

/* VARIABLES PAIEMENT */
let produitActuel = "";
let prixActuel = 0;
let codeUSSDActuel = "";
let methodeActuelle = "";

/* ONGLETS */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
        
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

/* OUVRIR POPUP */
function ouvrirPaiement(produit, prix, code) {
    produitActuel = produit;
    prixActuel = prix;
    codeUSSDActuel = code;
    methodeActuelle = "";

    const popup = document.getElementById("popupPaiement");
    if (!popup) return;

    document.getElementById("produit").innerText = produit;
    document.getElementById("prix").innerText = prix + " FCFA";
    document.getElementById("methode").innerText = "Non sélectionnée";
    document.getElementById("codeUSSD").innerText = "";

    document.querySelectorAll('.paiement-card').forEach(card => {
        card.classList.remove('active');
    });

    popup.classList.add('active');
    document.body.classList.add('popup-open');
}

/* CHOISIR METHODE */
function choisirMethode(methode, event) {
    methodeActuelle = methode;
    document.getElementById("methode").innerText = methode;

    if (methode === "Wave" || methode === "Orange Money") {
        document.getElementById("codeUSSD").innerText = "Composez : " + codeUSSDActuel;
    } else {
        document.getElementById("codeUSSD").innerText = "";
    }

    document.querySelectorAll('.paiement-card').forEach(card => {
        card.classList.remove('active');
    });

    event.currentTarget.classList.add('active');
}

/* CONFIRMER PAIEMENT */
function confirmerPaiement(event) {
    if (!methodeActuelle) {
        alert("Choisissez une méthode de paiement d'abord");
        return;
    }

    if (methodeActuelle === "CinetPay") {
        window.location.href = "TON_LIEN_CINETPAY_ICI";
        return;
    }

    // Affiche l'instruction USSD
    alert("1. Compose " + codeUSSDActuel + " sur ton téléphone\n2. Valide le paiement de " + prixActuel + " FCFA\n3. Clique OK ici une fois fait");

    // Animation validation
    const btn = event.target;
    btn.textContent = 'Vérification...';
    btn.disabled = true;
    
    setTimeout(() => {
        fermerPopup();
        
        // Message vert "Paiement validé"
        const successMsg = document.createElement('div');
        successMsg.textContent = '✅ Paiement validé !';
        successMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:#fff;padding:15px 25px;border-radius:8px;z-index:10000;font-weight:600;box-shadow:0 4px 15px rgba(0,0,0,0.2);';
        document.body.appendChild(successMsg);
        
        setTimeout(() => successMsg.remove(), 3000);
        
        // Reset bouton
        btn.textContent = 'Confirmer paiement';
        btn.disabled = false;
    }, 1500);
}

/* FERMER POPUP */
function fermerPopup() {
    const popup = document.getElementById("popupPaiement");
    if (popup) {
        popup.classList.remove('active');
    }
    document.body.classList.remove('popup-open');
    methodeActuelle = "";
}

/* FERMER AU CLIC DEHORS */
const popupElement = document.getElementById('popupPaiement');
if (popupElement) {
    popupElement.addEventListener('click', function(e) {
        if (e.target === this) {
            fermerPopup();
        }
    });
}