let questions = [];
let indexCount = 0;
let score = 0;


async function chargerQuestions() {
    const reponse = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const donnees = await reponse.json();
    questions = donnees.results;
    indexCount = 0;
    score = 0;
    afficherQuestion();
}

function afficherQuestion() {

    if (indexCount >= questions.length) {
        afficherFin();
        return;
    }

    const q = questions[indexCount];
    const bonneReponse = decoder(q.correct_answer);
    const titre = document.getElementById('titre');
    titre.textContent = decoder(q.question);

    const conteneur = document.getElementById('reponses');
    conteneur.innerHTML = '';

    const toutesLesReponses = [...q.incorrect_answers, q.correct_answer];
    melanger(toutesLesReponses);

    for (const rep of toutesLesReponses) {
        const bouton = document.createElement('button');
        bouton.textContent = decoder(rep);
        conteneur.appendChild(bouton);

        bouton.addEventListener('click', () => {
            if (rep === q.correct_answer) {
                bouton.classList.add('correct');
                score++;
            } else {
                bouton.classList.add('faux');
            }

            for (const b of conteneur.querySelectorAll('button')) {
                b.disabled = true;

                if (b.textContent === bonneReponse) {
                    b.classList.add('correct');
                }
            }

            setTimeout(() => {
                indexCount++;
                afficherQuestion();
            }, 1000);
        });
    }
}

function afficherFin() {
    const conteneur = document.getElementById('reponses');
    conteneur.innerHTML = '';

    const titre = document.getElementById('titre');
    titre.textContent = `Quiz terminé ! Votre score est ${score} sur ${questions.length}.`;

   const boutonRejouer = document.createElement('button');
    boutonRejouer.textContent = 'Rejouer';
    conteneur.appendChild(boutonRejouer);

    boutonRejouer.addEventListener('click', () => {
        chargerQuestions();
    });
}

function melanger(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // échanger tableau[i] et tableau[j]
        const temp = tableau[i];
        tableau[i] = tableau[j];
        tableau[j] = temp;
    }
    return tableau;
}

function decoder(texte) {
    const zone = document.createElement('textarea');
    zone.innerHTML = texte;   // on y met le texte encodé
    return zone.value;         // on récupère le texte décodé
}
    
chargerQuestions();

