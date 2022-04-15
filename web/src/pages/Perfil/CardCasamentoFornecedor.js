import React from "react";

export default function CardCasamentoFornecedor(props){
    return(
        <div className='perfil-info-casamento'>
            <p id='dataCasamento'>{props.dadosUsuario.casamentosRealizados} Casamentos Realizados</p>
            <p>{props.dadosUsuario.orcamentosRecebidos} Orçamento(s) Recebido(s)</p>
            <p>{props.dadosUsuario.orcamentosPendentes} Orçamento(s) Pendente(s)</p>
        </div>
    )
}