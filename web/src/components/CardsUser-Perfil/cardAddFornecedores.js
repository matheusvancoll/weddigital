import React from 'react'
import './CardsUser.css'

export default function FornecedoresPerfil(props) {
    return (
        <div className='perfil-fornecedores-card'>
            <p>{props.title}</p>
            <a href='/adicionar-anuncio'>Adicionar</a>
        </div>
    )
}

