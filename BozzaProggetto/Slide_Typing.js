//Variabili globali
let slideCorrente = 1;
let terzaSlide = false;
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

// Avvia la funzione ad ogni click
document.addEventListener('click', function(e) {
    eventoClick()
});
// Effetto del cambio slide
function eventoClick(){
    //Evita di andare alla prossima slide con un click se sei alla terza
    if(terzaSlide){
        return;    
    }
    // Passa alla slide successiva
    slideCorrente++;
    console.log(slideCorrente);
    // Se superi l'ultima slide, torna alla prima
    if(slideCorrente > totalSlide) {
        slideCorrente = 1;
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
            //Siamo alla terza slide
            terzaSlide = true;
            break;
        }
        case 4:{
            document.getElementById('slideQuattro').classList.add('active');
            const elemento = document.getElementById('typingTestoDinamicoDue');
            let testo = vettoreTesti[2];
            testo = testo.replace("*nickname*", persona.nome);
            typeWriter(elemento, testo);
            break;
        }
        case 5:{document.getElementById('slideCinque').classList.add('active');

    // Aspetta 2 secondi e poi avvia il gioco
    setTimeout(() => {
        avviaGioco();
    }, 2000);

    break;}
            
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
            if(slideCorrente === 3){
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
        terzaSlide = false;
        contenitoreElementiDinamici.remove();
        eventoClick();
    });
}

function avviaGioco(){
    window.location.href = "gioco.html";
}