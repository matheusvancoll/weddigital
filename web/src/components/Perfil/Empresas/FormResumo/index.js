import React from "react";
import './FormResumo.css'

import ImagePerfil from '../../../../assets/perfil.jpg'
import BoxInfoResumo from "./BoxInfoRedumo";

export default function FormResumo(props){

    let dadosPerfil = props.dadosUsuario

    console.log("DADOS PERFIIKF")
    console.log(dadosPerfil)

    return(
        <>
            <div className="perfil-resumo__cards">
                <BoxInfoResumo title='Visitas em sua vitrine' valor='4' />
                <BoxInfoResumo title='Orçamentos solicitados' valor='1' />
                <BoxInfoResumo title='Pontos Acumulados' valor='230' />
                <BoxInfoResumo title='Casamentos bem sucedidos' valor='2' />
            </div>
        </>
    )
}