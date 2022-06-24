import React from "react";
import './FormResumo.css'

import BoxInfoResumo from "./BoxInfoResumo";

export default function FormResumo(props){

    let dadosPerfil = props.dadosUsuario
    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoResumo title='Visitas em seu perfil' valor={dadosPerfil.visitasVitrine} icon="fa-solid fa-eye" />
                <BoxInfoResumo title='Orçamentos solicitados' valor={dadosPerfil.orcamentosRecebidos} icon="fa-solid fa-chart-line" />
                <BoxInfoResumo title='Casamentos bem sucedidos' valor={dadosPerfil.casamentosBemSucedidos} icon="fa-solid fa-thumbs-up" />
                <BoxInfoResumo title='Feedbacks recebidos' valor={dadosPerfil.feedbacksRecebidos} icon="fa-solid fa-bullhorn" />

                <BoxInfoResumo title='Ultimo sorteado' valor={dadosPerfil.ultimoGanhadorSorteio} icon="fa-solid fa-trophy" />
                <BoxInfoResumo title='Pontos Acumulados' valor={dadosPerfil.pontosAcumulados} icon="fa-solid fa-bars-progress" />
            </div>
        </>
    )
}