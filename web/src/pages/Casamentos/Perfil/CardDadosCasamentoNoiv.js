import React from "react";

export default function CardCasamentoNoiv(props){
    let dataCasamento = "Indefinido"
    let diasParaCasamento = "Indefinido"

    if(props.dadosCasamento != null || props.dadosCasamento != undefined){
        dataCasamento = props.dadosCasamento.dataCasamento
        diasParaCasamento = "1"
    }
    return(
        <div className='perfil-info-casamento'>
            <p id='dataCasamento'>{dataCasamento}</p>
            <p>Faltam: {diasParaCasamento}</p>
        </div>
    )
}