let secondesRestantes = 1500;
let intervalId;
let modeTravail = true;
let pomodorosTermines = Number(localStorage.getItem('pomodoros')) || 0;

function afficherChrono() {
document.getElementById('chrono').textContent =
    Math.floor(secondesRestantes / 60).toString().padStart(2, '0') + ':' + (secondesRestantes % 60).toString().padStart(2, '0');

    document.title = document.getElementById('chrono').textContent + ' - Mon Pomodoro';

    if (modeTravail === true) {
        document.getElementById('mode').textContent = 'Travail';
        document.body.classList.remove('mode-pause');
    } else {
        document.getElementById('mode').textContent = 'Pause';
        document.body.classList.add('mode-pause');
    }
}

afficherChrono();
document.getElementById('compteur').textContent = pomodorosTermines;

document.getElementById('start').addEventListener('click', function() {
   if (intervalId === undefined) {
    intervalId = setInterval(function() {
        secondesRestantes--;
        afficherChrono();

        if (secondesRestantes <= 0) {
            if (modeTravail === true) {
                pomodorosTermines++;
                localStorage.setItem('pomodoros', pomodorosTermines);
                document.getElementById('compteur').textContent = pomodorosTermines;
            }
    modeTravail = !modeTravail;
    
    

    if (modeTravail === true) {
        secondesRestantes = 1500;
    } else {
        secondesRestantes = 300;
    }
    afficherChrono();
}

    },1000);
}
});

document.getElementById('pause').addEventListener('click', function() {
    clearInterval(intervalId);
    intervalId = undefined;
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(intervalId);
    intervalId = undefined;
    modeTravail = true;
    secondesRestantes = 1500;
    afficherChrono();
});

