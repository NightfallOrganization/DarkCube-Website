


document.addEventListener('DOMContentLoaded', function() {
    const serverIP = 'DarkCube.eu';
    const playerCountElement = document.getElementById('playerCount');

    async function fetchPlayerCount() {
        try {
            const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
            const data = await response.json();

            if(data.online) {
                playerCountElement.textContent = `Spieler Online: ${data.players.online}`;
            } else {
                playerCountElement.textContent = 'Server ist offline';
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Serverdaten:', error);
            playerCountElement.textContent = 'Spieler Online: X';
        }
    }

    fetchPlayerCount();
    setInterval(fetchPlayerCount, 30000); // Aktualisiert alle 30 Sekunden
});






function copyText(element) {
    const text = "test.darkcube.eu";
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
        element.classList.add("clicked");
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
}

// Entfernt die 'clicked' Klasse, wenn der Benutzer nicht mehr hovert
document.querySelectorAll('.testserver-banner-container').forEach(container => {
    container.addEventListener('mouseleave', () => {
        container.classList.remove('clicked');
    });
});

