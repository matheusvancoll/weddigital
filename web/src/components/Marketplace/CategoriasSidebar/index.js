import React from 'react'
import './CategoriaSidebar.css'

import Option from './option'

export default function CategoriaSidebar(props){

    let listaOpcoes = []
    for (let i = 0; i < props.opcoes.length; i++) {
        listaOpcoes.push(<Option title={props.opcoes[i]} />)
    }

    return(
        <div className='sidebar-categorias-container'>
            <p className='sidebar-categorias-text'>{props.title}</p>
            {listaOpcoes}
        </div>
    )
}

