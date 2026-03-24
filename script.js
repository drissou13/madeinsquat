function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const target = document.getElementById(tabId);
    if(target) target.classList.add('active');
}

function triggerPolice() {
    const siren = document.getElementById('police-siren');
    const body = document.getElementById('main-body');
    const timerDisplay = document.getElementById('survival-timer');
    let timeLeft = 6.00;

    if(siren) { siren.currentTime = 0; siren.play(); }
    body.classList.add('police-active');

    const countdown = setInterval(() => {
        timeLeft -= 0.13;
        timerDisplay.innerText = timeLeft <= 0 ? "00:00" : timeLeft.toFixed(2).replace('.', ':');
    }, 100);

    setTimeout(() => {
        clearInterval(countdown);
        if(siren) siren.pause();
        body.classList.remove('police-active');
        // Mister F arrive 10s après la descente
        setTimeout(ghostMisterF, 10000);
    }, 6000);
}

function ghostMisterF() {
    const body = document.getElementById('main-body');
    const tvClick = document.getElementById('tv-click');
    const tvEffect = document.getElementById('tv-off');
    const ghostTimer = document.getElementById('ghost-timer');

    document.getElementById('door-creak').play();
    setTimeout(() => document.getElementById('ghost-laugh').play(), 1500);

    body.classList.add('ghost-haunted');
    showTab('mister-f-section');

    // Timer de 3 minutes (180 secondes)
    let timeLeft = 180;
    ghostTimer.innerText = "03:00";
    const timerInterval = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        ghostTimer.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) clearInterval(timerInterval);
    }, 1000);

    const buttons = document.querySelectorAll('.btn-squat:not(.panic)');
    const chaosInterval = setInterval(() => {
        buttons.forEach(btn => {
            btn.style.transform = `translate(${Math.random()*40-20}px, ${Math.random()*40-20}px) rotate(${Math.random()*10-5}deg)`;
        });
    }, 150);

    // FIN DE LA HANTISE : 3 MINUTES (180000 ms)
    setTimeout(() => {
        clearInterval(timerInterval);
        if(tvClick) tvClick.play();
        tvEffect.classList.add('tv-off-active');

        setTimeout(() => {
            clearInterval(chaosInterval);
            body.classList.remove('ghost-haunted');
            showTab('resume');
            buttons.forEach(btn => btn.style.transform = "");
            setTimeout(() => { tvEffect.classList.remove('tv-off-active'); }, 500);
        }, 400);
    }, 180000);
}

// Effet Machine à écrire initial
const textEl = document.getElementById('typewriter-text');
if (textEl) {
    const str = textEl.innerHTML.trim();
    textEl.innerHTML = "";
    let i = 0;
    function type() {
        if (i < str.length) {
            textEl.innerHTML += str.charAt(i); i++;
            setTimeout(type, 20);
        }
    }
    window.onload = () => setTimeout(type, 500);
}