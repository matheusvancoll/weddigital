import React from "react";
import './FormResumo.css'

import BoxInfoResumo from "./BoxInfoRedumo";

export default function FormResumo(props){

    let dadosPerfil = props.dadosUsuario

    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoResumo title='Visitas em seu perfil' valor={dadosPerfil.visitasVitrine} />
                <BoxInfoResumo title='Orçamentos solicitados' valor={dadosPerfil.orcamentosRecebidos} />
                <BoxInfoResumo title='Casamentos bem sucedidos' valor={dadosPerfil.casamentosBemSucedidos} />
                <BoxInfoResumo title='Feedbacks recebidos' valor="1" />
            </div>
        </>
    )
}