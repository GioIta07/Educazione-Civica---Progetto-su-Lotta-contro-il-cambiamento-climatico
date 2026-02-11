//Variabili globali
let slideCorrente = 1;
const totalSlide = 5; //da cambiare in aggiunta o rimozione di slide
const vettoreTesti = 
[
    "Sei stato appena eletto Primo Ministro di Steamington, una capitale di Weslandia in piena crisi energetica. Il popolo chiede elettricità a basso costo, ma le coste si stanno alzando a causa del clima. ",
    "Benvenuto nel suo ufficio Primo Ministro. Come vuole che la chiami?",
    "Piacere *nickname*, lo so che oggi è il suo primo giorno, ma necessitiamo del suo aiuto per mantenere la gestione delle centrali di Steamington, le quali, ultimamente stanno riscontrando dei problemi con la sostenibilità ambientale.",
    //Impostazione dinamica dei discorsi, dei tipi di alert UI friendly
    //"Come può vedere, la rete elettrica è sull'orlo del blackout, provi a migliorare questa situazione premendo uno dei tasti sulla sua scrivania.",
    //"Ottimo, sembra stia migliorano.",
    //"Faccia però attenzione, perché ogni sua decisione determinerà se domani i cittadini accenderanno la luce o indosseranno una maschera antigas, quindi sta tutto nelle sue mani."
];

// Effetto slide
document.addEventListener('click', function() {
    // Nascondi tutte le slide
    document.querySelectorAll('.slides').forEach(slide => {
        slide.classList.remove('active');
    });
    // Passa alla slide successiva
    slideCorrente++;
    // Se superi l'ultima slide, torna alla prima
    if(slideCorrente > totalSlide) {
        slideCorrente = 1;
    }
    // Mostra la slide corrente
    if(slideCorrente === 1){
        document.getElementById('slideUno').classList.add('active');  
    } 
    if(slideCorrente === 2){
        document.getElementById('slideDue').classList.add('active'); 
        const elemento = document.getElementById('typingTestoDinamicoZero');
        let testo = vettoreTesti[0];
        typeWriter(elemento, testo); 
    } 
    if(slideCorrente === 3){
        document.getElementById('slideTre').classList.add('active');
        const elemento = document.getElementById('typingTestoDinamicoUno');
        let testo = vettoreTesti[1];
        typeWriter(elemento, testo);
    }
    if(slideCorrente === 4){
        document.getElementById('slideQuattro').classList.add('active');
        const elemento = document.getElementById('typingTestoDinamicoDue');
        let testo = vettoreTesti[2];
        typeWriter(elemento, testo);
    }
    if(slideCorrente === 5){
        document.getElementById('slideCinque').classList.add('active');
    }
});
let typingTimeout;
// Effetto typing dinamico
function typeWriter(element, text) {
    clearTimeout(typingTimeout);
    let i = 0;
    let speed = 50;
    element.innerHTML = '';
    // Funzione che scrive carattere per carattere il testo
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, speed);
        }
    }
    type();
    /*if(slideCorrente === 3)
    {
        nomePlayer();
    }
    */
}