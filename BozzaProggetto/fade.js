// Aggiungi lo stile per la transizione
const style = document.createElement('style');
style.textContent = 'body { transition: opacity 0.5s ease-in-out; }';
document.head.appendChild(style);

// Funzione per andare alla pagina della storia
function startStory() {

    // Segna che stiamo transitando
    sessionStorage.setItem('transitando', 'true');
    
    document.body.style.opacity = '0';
    
    setTimeout(function() {
        window.location.href = 'inizioStoria.html';
    }, 500);
}

// Controlla se siamo nella pagina della storia e se arriviamo dalla transizione
if (window.location.pathname.includes('inizioStoria.html')) {
    // Controlla se arriviamo da index.html
    if (sessionStorage.getItem('transitando') === 'true') {
        document.body.style.opacity = '0';
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            // Rimuovi il flag
            sessionStorage.removeItem('transitando');
        });
    }
}