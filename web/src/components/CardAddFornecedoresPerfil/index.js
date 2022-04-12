import React from 'react'
import './FornecedoresPerfil.css'

export default function FornecedoresPerfil(props) {
    return (
        <div className='perfil-fornecedores-card'>
            <p>{props.title}</p>
            <a href='/buscar-fornecedores'>Adicionar</a>
        </div>
    )
}

