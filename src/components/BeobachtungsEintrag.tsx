interface BeobachtungsEintragProps {
    art: string;
    datum: string;
    notiz: string;
}

function BeobachtungsEintrag({art, datum, notiz}: BeobachtungsEintragProps){
    return(
        <article>
            <h2>{art}</h2>
            <p>{datum}</p>
            <p>{notiz}</p>
        </article>
    )
}


export default BeobachtungsEintrag;