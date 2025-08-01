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
            beobachtung.bescheibung =
            beschreibung;
        }

        const ausgabeDiv = 
            document.getElementById("ausgabe");

        let beobachtungText = `
        <p><strong>Art:</strong> ${beobachtung.art}</p>
        <p><strong>Ort:</strong> ${beobachtung.ort}</p>
        <p><strong>Datum:</strong> ${beobachtung.datum}</p>
        `;

        if (beobachtung.bescheibung) {
            beobachtungText +=
            `<p><strong>Beschreibung:</strong> ${beobachtung.bescheibung}</p>`
        }

        ausgabeDiv.innerHTML = beobachtungText;

        const liste = 
            document.getElementById('beobachtungsListe');

        eintrag.innerHTML = beobachtungText;    
        liste.appendChild(eintrag);


        formular.reset();
    }); 

