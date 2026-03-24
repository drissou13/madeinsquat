function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const target = document.getElementById(tabId);
    if(target) target.classList.add('active');
}

function triggerPolice() {
    const body = document.getElementById('main-body');
    const timerDisplay = document.getElementById('survival-timer');
    let timeLeft = 6.00;
    body.classList.add('police-active');

    const countdown = setInterval(() => {
        timeLeft -= 0.13;
        timerDisplay.innerText = timeLeft <= 0 ? "00:00" : timeLeft.toFixed(2).replace('.', ':');
    }, 100);

    setTimeout(() => {
        clearInterval(countdown);
        body.classList.remove('police-active');
        setTimeout(ghostMisterF, 10000);
    }, 6000);
}

function ghostMisterF() {
    const body = document.getElementById('main-body');
    const laugh = document.getElementById('ghost-laugh');
    const creak = document.getElementById('door-creak');
    const tvEffect = document.getElementById('tv-off');

    if(creak) creak.play();
    setTimeout(() => { if(laugh) laugh.play(); }, 1500);

    body.classList.add('ghost-haunted');
    showTab('mister-f-section');

    const buttons = document.querySelectorAll('.btn-squat:not(.panic)');
    const chaosInterval = setInterval(() => {
        buttons.forEach(btn => {
            btn.style.marginLeft = (Math.random() * 40 - 20) + "px";
            btn.style.marginTop = (Math.random() * 40 - 20) + "px";
        });
    }, 150);

    // FIN DE LA HANTISE - 30 secondes
    setTimeout(() => {
        // Déclenche l'effet TV
        tvEffect.classList.add('tv-off-active');

        setTimeout(() => {
            clearInterval(chaosInterval);
            body.classList.remove('ghost-haunted');
            showTab('resume');
            buttons.forEach(btn => { btn.style.margin = "0"; });
            
            // On retire l'effet TV après la coupure
            setTimeout(() => {
                tvEffect.classList.remove('tv-off-active');
            }, 500);
        }, 400); // Coordonné avec l'animation CSS
    }, 30000);
}

// Machine à écrire (inchangé)
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