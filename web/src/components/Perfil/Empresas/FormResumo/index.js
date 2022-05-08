import React from "react";
import './FormResumo.css'

import ImagePerfil from '../../../../assets/perfil.jpg'
import BoxInfoResumo from "./BoxInfoRedumo";

export default function FormResumo(props){

    let dadosPerfil = props.dadosUsuario

    console.log("DADOS PERFIIKF RESUMO")
    console.log(dadosPerfil)

    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoResumo title='Visitas em sua vitrine' valor={dadosPerfil.visitasVitrine} />
                <BoxInfoResumo title='Orçamentos solicitados' valor={dadosPerfil.orcamentosRecebidos} />
                <BoxInfoResumo title='Pontos Acumulados' valor={dadosPerfil.pontosAcumulados} />
                <BoxInfoResumo title='Casamentos bem sucedidos' valor={dadosPerfil.casamentosBemSucedidos} />
            </div>
        </>
    )
}