
// === STATO DEL GIOCO ===
let anno = 1;
const MAX_ANNI = 100;
let energia = 10;
let economia = 100;
let inquinamento = 50;
let temperatura = 1.0;
let LOL = Math.floor(Math.random() * 40) + 1;
let sviluppo = 1;
let effettiNucleare = 0;
let anniPassati = [];
let storicoTemp = [];
let storicoInq = [];
// Timer
const annoTime = 30;
let timeRemaining = annoTime;
let timerInterval;
// === GRAFICO ===
const ctx = document.getElementById('grafico').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: [],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4
            },
            {
                label: 'Inquinamento',
                data: [],
                borderColor: '#95a5a6',
                backgroundColor: 'rgba(149, 165, 166, 0.1)',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// === FUNZIONI ===
function aggiornaUI() {
    document.getElementById('anno').textContent = anno;
    document.getElementById('energia').textContent = energia;
    document.getElementById('economia').textContent = economia;
    document.getElementById('inquinamento').textContent = inquinamento;
    document.getElementById('temperatura').textContent = temperatura.toFixed(2) + ' °C';
}
function aggiornaGrafico() {
    chart.data.labels = anniPassati;
    chart.data.datasets[0].data = storicoTemp;
    chart.data.datasets[1].data = storicoInq;
    chart.update();
}
function mostraEvento(messaggio) {
    const eventDiv = document.getElementById('eventMessage');
    eventDiv.innerHTML = `<div class="event-message">${messaggio}</div>`;
    setTimeout(() => {
        eventDiv.innerHTML = '';
    }, 5000);
}
function eventoClimatico() {
    const eventi = [];
    if (temperatura > 1.5 && LOL === 10) {
        eventi.push({ nome: "🔥 Ondata di calore", energia: -10, economia: -15, inquinamento: 5 });
    }
    if (temperatura > 2.0 && LOL === 20) {
        eventi.push({ nome: "🌾 Siccità", energia: -20, economia: -25, inquinamento: 10 });
    }
    if (inquinamento > 80 && LOL === 30) {
        eventi.push({ nome: "🌊 Alluvione", energia: -15, economia: -30, inquinamento: 5 });
    }
    if (temperatura > 2.5 && LOL === 40) {
        eventi.push({ nome: "❄️ Tempesta estrema", energia: -25, economia: -20, inquinamento: 5 });
    }
    if (eventi.length > 0 && Math.random() < 0.4) {
        const evento = eventi[Math.floor(Math.random() * eventi.length)];
        energia += evento.energia;
        economia += evento.economia;
        inquinamento += evento.inquinamento;
        mostraEvento(`⚠️ EVENTO CLIMATICO:\n${evento.nome}`);
    }
}
function fineGioco(messaggio) {
    clearInterval(timerInterval);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
    mostraEvento(`<div class="game-over">${messaggio}</div>`);
}
function scelta(tipo) {
    if (effettiNucleare === 1 && tipo !== 'nucleare') {
        mostraEvento("⚠️ Devi cliccare Nucleare una seconda volta!");
        return;
    }
    if (tipo === 'carbone') {
        energia += 30;
        economia += 20;
        inquinamento += 25;
    }else if (tipo === 'economia') {
        energia -= 30;
        economia += 50;
        inquinamento += 50;
    } else if (tipo === 'rinnovabili') {
        energia += 15;
        economia -= 5;
        inquinamento -= 20;
    } else if (tipo === 'efficienza') {
        economia += 10;
        inquinamento -= 1;
    } else if (tipo === 'nucleare') {
        effettiNucleare++;
        
        if (Math.random() < 0.01) {
            economia -= 40;
            inquinamento += 40;
            mostraEvento("☢️ INCIDENTE NUCLEARE!");
            effettiNucleare = 0;
        } else if (effettiNucleare === 1) {
            mostraEvento("⚠️ Clicca Nucleare ancora una volta per attivarlo!");
            return;
        }
    }
    if (effettiNucleare === 2) {
        energia += 30;
        economia += 5;
        inquinamento += 5;
        effettiNucleare = 0;
    }
    if (inquinamento < 0) inquinamento = 0;
    temperatura += inquinamento * 0.005;
    sviluppo++;
    eventoClimatico();
    anniPassati.push(anno);
    storicoTemp.push(temperatura);
    storicoInq.push(inquinamento);
    anno++;
    aggiornaUI();
    aggiornaGrafico();
    resetTimer();
    // Controlla condizioni di fine gioco
    if (temperatura >= 10) {
        fineGioco("🔥 COLLASSO CLIMATICO<br>La città non è più abitabile.");
    } else if (anno > MAX_ANNI) {
        fineGioco("🏆 SIMULAZIONE COMPLETATA");
    } else if (economia < 0) {
        fineGioco("💸 NON HAI PIÙ UN'ECONOMIA");
    }
}
function resetTimer() {
    timeRemaining = annoTime;
}
function aggiornaTimer() {
    timeRemaining--;
    document.getElementById('timer').textContent = `⏳ Tempo: ${timeRemaining}s`;
    if (timeRemaining <= 0) {
        economia -= 10;
        anniPassati.push(anno);
        storicoTemp.push(temperatura);
        storicoInq.push(inquinamento);
        anno++;
        aggiornaUI();
        aggiornaGrafico();
        resetTimer();
        mostraEvento("⚠️ Hai perso tempo! Economia -10");
        if (economia < 0) {
            fineGioco("💸 NON HAI PIÙ UN'ECONOMIA");
        } else if (anno > MAX_ANNI) {
            fineGioco("🏆 SIMULAZIONE COMPLETATA");
        }
    }
}
// Avvia il gioco
aggiornaUI();
timerInterval = setInterval(aggiornaTimer, 1000);