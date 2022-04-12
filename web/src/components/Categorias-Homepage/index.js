import React from 'react'
import './Categoria-Homepage.css'

export default function Navbar(props) {
    return (
        <div className='categoria-homepage'>
            <a href='/buscar-fornecedores'>{props.title}</a>
        </div>
    )
}

