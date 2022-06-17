import React from "react";

import Config from '../../../../config.json'

import CardPlanos from '../../../CardPlanos/'
export default function FormComunidade(){

    return(
        <div>
            <CardPlanos nivelConta={4} linkAcesso={Config.comunidade.linkNoivos} tituloBotao='Acessar comunidade' />
        </div>
    )
}