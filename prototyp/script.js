

const formular = 
    document.getElementById('beobachtungsForm');

    formular.addEventListener('submit', 
    function(event) {
        event.preventDefault();
        
        const art =
            document.getElementById('art').value;
        const ort =
            document.getElementById('ort').value;
        const datum =
            document.getElementById('datum').value;
        const[jahr, monat, tag] =
            datum.split("-");
        const datumFormatiert =
            `${tag}.${monat}.${jahr}`;
        const beschreibung =
            document.getElementById('beschreibung').value;
       
        const eintrag =
            document.createElement('div');

        
        const beobachtung = {
            art: art,
            ort: ort,
            datum: datumFormatiert,
        };

        if(beschreibung.trim() !== ""){
            beobachtung.beschreibung =
            beschreibung;
        }

      // Standort holen (asynchron!)
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

        // Marker auf der Karte setzen
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<strong>${beobachtung.art}</strong><br>${beobachtung.ort}<br>${beobachtung.datum}`)
            .openPopup();

        // Ausgabe im HTML (optional, wie vorher)
        const beobachtungText = `
            <p><strong>Art:</strong> ${beobachtung.art}</p>
            <p><strong>Ort:</strong> ${beobachtung.ort}</p>
            <p><strong>Datum:</strong> ${beobachtung.datum}</p>
            ${beobachtung.beschreibung ? `<p><strong>Beschreibung:</strong> ${beobachtung.beschreibung}</p>` : ""}
        `;

        const eintrag = document.createElement('div');
        eintrag.innerHTML = beobachtungText;
        document.getElementById('beobachtungsListe').appendChild(eintrag);
        document.getElementById("ausgabe").innerHTML = beobachtungText;

        // Formular zurücksetzen
        formular.reset();

        // Standort erneut setzen
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude.toFixed(5);
                const lng = position.coords.longitude.toFixed(5);
                document.getElementById('ort').value = `Lat: ${lat}, Lng: ${lng}`;
            },
                function(error) {
                console.error("Standort konnte nicht erneut gesetzt werden:", error);
            }
        );
        }});


    }); 

     //Karte einbinden
    const map = L.map('map').setView([51.505, 10.0], 6); // [Lat, Lng], Zoom-Stufe

    // Tile Layer hinzufügen (Kartenhintergrund)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    //Aktuelle Position über Geodaten(GPS oder Browserdaten) festlegen und Marker setzten
    if(navigator.geolocation) {
        let aktuellePosition = null;
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                aktuellePosition = [lat, lng];

                map.setView(aktuellePosition, 13);

                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup('Du bist hier')
                    .openPopup();

                // Ort-Feld automatisch ausfüllen
                const ortsfeld = document.getElementById('ort');
                ortsfeld.value = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
            },
            function(error){
                console.error("Standort konnte nicht ermittelt werden:", error);
            }
            );
    }else{
        console.error("Geolocation wird von diesem Browser nicht unterstützt.");
    }

   

   

