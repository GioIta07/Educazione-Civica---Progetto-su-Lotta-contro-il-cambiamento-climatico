let slideCorrente = 1;
const totalSlide = 3;

// Aggiungi l'evento click a tutto il documento
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
    if(slideCorrente === 1) document.getElementById('slideUno').classList.add('active');
    if(slideCorrente === 2) document.getElementById('slideDue').classList.add('active');
    if(slideCorrente === 3) document.getElementById('slideTre').classList.add('active');
});