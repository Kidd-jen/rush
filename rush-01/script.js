let secondesRestantes = 1500;
let intervalId;

function afficherChrono() {
document.getElementById('chrono').textContent =
    Math.floor(secondesRestantes / 60).toString().padStart(2, '0') + ':' + (secondesRestantes % 60).toString().padStart(2, '0');
    
}

afficherChrono();

document.getElementById('start').addEventListener('click', function() {
    intervalId = setInterval(function() {
        secondesRestantes--;
        afficherChrono();
    },1000);
});

document.getElementById('pause').addEventListener('click', function() {
    clearInterval(intervalId);
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(intervalId);
    secondesRestantes = 1500;
    afficherChrono();
});