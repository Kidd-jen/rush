let secondesRestantes = 1500;
let intervalId;
let modeTravail = true;

function afficherChrono() {
document.getElementById('chrono').textContent =
    Math.floor(secondesRestantes / 60).toString().padStart(2, '0') + ':' + (secondesRestantes % 60).toString().padStart(2, '0');
    
}

afficherChrono();

document.getElementById('start').addEventListener('click', function() {
   if (intervalId === undefined) {
    intervalId = setInterval(function() {
        secondesRestantes--;
        afficherChrono();

        if (secondesRestantes === 0) {
    modeTravail = !modeTravail;
    clearInterval(intervalId);
    intervalId = undefined;

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

