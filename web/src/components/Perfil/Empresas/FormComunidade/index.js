import React from "react";

import Config from '../../../../config.json'
import CardPlanos from '../../../CardPlanos/'
export default function FormComunidade(props){

    return(
        <div>
            <CardPlanos nivelConta={props.nivelConta} linkAcesso={Config.comunidade.linkProfissionais} tituloBotao='Acessar comunidade' />
        </div>
    )
}