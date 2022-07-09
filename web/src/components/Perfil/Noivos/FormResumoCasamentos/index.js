import React from "react";
import './FormResumoCasamentos.css'

import BoxInfoCasamento from "./BoxInfoCasamento";

export default function FormResumo(props){

    let dadosCasamento = props.dadosCasamento

    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoCasamento title='Data do Casamento' valor={dadosCasamento.dataCasamento}/>
                <BoxInfoCasamento title='Ultimo ganhador' valor={dadosCasamento.ultimoGanhadorSorteio} />
                <BoxInfoCasamento title='Pontos Acumulados' valor={dadosCasamento.pontosAcumulados} />
                <BoxInfoCasamento title='Profissionais Contratados' valor={dadosCasamento.profissionaisContratados ? dadosCasamento.profissionaisContratados : '0'} />
            </div>

            <div className='perfil-noivo-sbuscar-fornecedores'>
                <a href='/buscar-profissional'>BUSCAR PROFISSIONAIS AGORA</a>
            </div>
        </>
    )
}