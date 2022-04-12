import React from 'react'
import './Navbar.css'

import Logo from '../../assets/icon.png'
export default function Navbar(props) {
    return (
        <navbar className='navbar-container'>
            <div className='navbar-logo-container'>
                <img src={Logo} className='navbar-logo-img' ></img>
                <a href='/' className='navbar-logo-name'>Wed Digital</a>
            </div>

            <div className='navbar-links'>
                <a href='perfil'>Meu Casamento</a>
                <a href='buscar-fornecedores'>Fornecedores</a>
            </div>

            <div className='navbar-login'>
                <div className={props.isUserLogado ? "" : "isLogado"}>
                    <a href='/perfil'>Conta</a>
                </div>

                <div className={props.isUserLogado ? "isLogado" : ""}>
                    <a href='/login' id='btnLogin'>Acesse</a>
                    <a href='/cadastro'>Registre-se</a>
                </div>
            </div>
        </navbar>
    )
}

