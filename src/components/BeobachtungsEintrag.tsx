interface BeobachtungsEintragProps {
    art: string;
    datum: string;
    notiz: string;
}

function BeobachtungEintrag({art, datum, notiz}: BeobachtungsEintragProps){
    return(
        <div>
            <h2>{art}</h2>
            <p>{datum}</p>
            <article>{notiz}</article>
        </div>
    )
}

<BeobachtungEintrag art='Buntspecht' datum='10.11.2026' notiz='Höhle ca. 4 m hoch, Eiche am Waldrand'/>

export default BeobachtungEintrag;