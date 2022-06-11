import React from "react";
import './FormResumo.css'

import BoxInfoResumo from "./BoxInfoRedumo";

export default function FormResumo(props){

    let dadosCasamento = props.dadosCasamento

    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoResumo title='Data do Casamento' valor={dadosCasamento.dataCasamento} />
            </div>
        </>
    )
}