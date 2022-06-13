import React from "react";
import './FormResumoCasamentos.css'

import BoxInfoCasamento from "./BoxInfoCasamento";

export default function FormResumo(props){

    let dadosCasamento = props.dadosCasamento

    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoCasamento title='Data do Casamento' valor={dadosCasamento.dataCasamento} />
                <BoxInfoCasamento title='Data do Casamento' valor={dadosCasamento.dataCasamento} />
                <BoxInfoCasamento title='Data do Casamento' valor={dadosCasamento.dataCasamento} />
                <BoxInfoCasamento title='Data do Casamento' valor={dadosCasamento.dataCasamento} />
            </div>
        </>
    )
}