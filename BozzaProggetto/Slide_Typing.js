//Variabili globali
let slideCorrente = 1;
let quintaSlide = false;
const totalSlide = 7; //da cambiare in aggiunta o rimozione di slide
const vettoreTesti = 
[
    "Sei stato appena eletto Primo Ministro a vita di Steamington, la capitale di Weslandia è in piena crisi energetica.",
    "Il paese è sempre stato il centro nevralgico della tecnologia e delle energie. Ora come Governatore devi mantenere lo status quo del paese, evitando che ci siano malcontenti, crisi energetiche, rischi biologici o crollo del mercato.",
    "Sarai in grado di non mandare in rovina il paese in meno del tuo mandato?",
    "Benvenuto nel suo ufficio Primo Ministro. Come vuole che la chiami?",
    "Piacere *nickname*, lo so che oggi è il suo primo giorno, ma necessitiamo del suo aiuto per mantenere la gestione delle centrali di Steamington, le quali, ultimamente stanno riscontrando dei problemi con la sostenibilità ambientale.",
    //Impostazione dinamica dei discorsi, dei tipi di alert UI friendly
    //"Come può vedere, la rete elettrica è sull'orlo del blackout, provi a migliorare questa situazione premendo uno dei tasti sulla sua scrivania.",
    //"Ottimo, sembra stia migliorano.",
    //"Faccia però attenzione, perché ogni sua decisione determinerà se domani i cittadini accenderanno la luce o indosseranno una maschera antigas, quindi sta tutto nelle sue mani."
];

// Avvia la funzione ad ogni click
document.addEventListener('click', function(e) {
    eventoClick()
});
// Effetto del cambio slide
function eventoClick(){
    //Evita di andare alla prossima slide con un click se sei alla terza
    if(quintaSlide){
        return;    
    }
    // Passa alla slide successiva se non superi il numero di slide disponibili
    if(slideCorrente <= totalSlide) {
        slideCorrente++;
    }
    // Nascondi tutte le slide
    document.querySelectorAll('.slides').forEach(slide => {
        slide.classList.remove('active');
    });
    //Mostra la slide corrente
    switch (slideCorrente)
    {
        case 1:
            document.getElementById('slideUno').classList.add('active');  
            break;
        case 2:{
            document.getElementById('slideDue').classList.add('active'); 
            const elemento = document.getElementById('typingTestoDinamicoZero');
            let testo = vettoreTesti[0];
            typeWriter(elemento, testo); 
            break;
        }
        case 3:{
            document.getElementById('slideTre').classList.add('active'); 
            const elemento = document.getElementById('typingTestoDinamicoUno');
            let testo = vettoreTesti[1];
            typeWriter(elemento, testo); 
            break;
        }
        case 4:{
            document.getElementById('slideQuattro').classList.add('active'); 
            const elemento = document.getElementById('typingTestoDinamicoDue');
            let testo = vettoreTesti[2];
            typeWriter(elemento, testo); 
            break;
        }
        case 5:{
            document.getElementById('slideCinque').classList.add('active');
            const elemento = document.getElementById('typingTestoDinamicoTre');
            let testo = vettoreTesti[3];
            //Siamo alla quinta slide
            quintaSlide = true;
            typeWriter(elemento, testo);
            break;
        }
        case 6:{
            document.getElementById('slideSei').classList.add('active');
            const elemento = document.getElementById('typingTestoDinamicoQuattro');
            let testo = vettoreTesti[4];
            testo = testo.replace("*nickname*", persona.nome);
            typeWriter(elemento, testo);
            break;
        }
        case 7:{document.getElementById('slideSette').classList.add('active');
            // Aspetta 2 secondi e poi avvia il gioco
            setTimeout(() => {
                avviaGioco();
            }, 2000);
            break;
        }
    }
}           
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
        else{
            // Crea casella d'input una volta viene scritto tutto, nella terza slide
            if(quintaSlide){
                ottieniNomeGiocatore();
            }
        }
    }
    type();
}

function ottieniNomeGiocatore(){
    const contenitoreSlide = document.getElementById("inserimentoNome");
    contenitoreSlide.classList.add("contenitoreTestoDinamico")
    const contenitoreElementiDinamici = document.createElement("div");

    const contenitoreInput = document.createElement("div");
    const contenitoreButton = document.createElement("div");
    const casellaInput = document.createElement("input");
    casellaInput.classList.add("inputVisible");
    casellaInput.placeholder = "Inserisci il tuo nome"
    const buttonConferma = document.createElement("button");
    buttonConferma.classList.add("buttonNome");
    buttonConferma.textContent = "Conferma"

    contenitoreSlide.appendChild(contenitoreElementiDinamici);
    contenitoreElementiDinamici.appendChild(contenitoreInput);
    contenitoreElementiDinamici.appendChild(contenitoreButton);
    contenitoreInput.appendChild(casellaInput);
    contenitoreButton.appendChild(buttonConferma);

    buttonConferma.addEventListener("click", (e) => {
        e.stopPropagation(); // ← blocca la propagazione al document
        persona.nome = casellaInput.value;
        quintaSlide = false;
        contenitoreElementiDinamici.remove();
        eventoClick();
    });
}

function avviaGioco(){
    window.location.href = "gioco.html";
}