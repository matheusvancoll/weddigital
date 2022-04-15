import React from "react";

export default function CardCasamentoNoiv(props){
    return(
        <div className='perfil-info-casamento'>
            <p id='dataCasamento'>{props.dadosUsuario.dataCasamento}</p>
            <p>Faltam: {props.dadosUsuario.diasParaCasamento}</p>
        </div>
    )
}