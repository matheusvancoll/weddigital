import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Navbar.css'

import UserContext from '../../api/userContext-api/userContext'

import Logo from '../../assets/icon.png'
export default function Navbar(props) {
    const { setToken, setTipo } = useContext(UserContext)
    const [ IsLoged, setIsLoged ] = useState(false)
    const history = useHistory()

    if(props.idUsuario != null){
        setIsLoged(true)
    }

    function onSubmit(ev){
        ev.preventDefault()

        setToken('')
        setTipo('')
        history.push('/')
    }

    return (
        <navbar className='navbar-container'>
            <div className='navbar-logo-container'>
                <img src={Logo} className='navbar-logo-img' ></img>
                <a href='/' className='navbar-logo-name'>Wed Digital</a>
            </div>

            <div className='navbar-links'>
                {props.tipoUsuario == 'Fornecedor' 
                    ? <div>
                        <a href='buscar-fornecedores'>Marketplace</a>
                        <a href='perfil'>Meus Anúncios</a>
                        <a href='orcamentos-solicitados'>Orçamentos</a>
                    </div>
                    : props.tipoUsuario == 'Noivos' 
                    ? <div>
                        <a href='perfil'>Meu Casamento</a>
                        <a href='buscar-fornecedores'>Fornecedores</a>
                    </div>
                    : <div> </div>
                }
            </div>

            <div className='navbar-login'>
                <div className={IsLoged ? "" : "isLogado"}>
                    <a href='/perfil' id='btnLogin'>Perfil</a>
                    <a href='/' onClick={onSubmit}>Sair</a>
                </div>

                <div className={IsLoged ? "isLogado" : ""}>
                    <a href='/login' id='btnLogin'>Acessar</a>
                    <a href='/cadastro'>Registre-se</a>
                </div>
            </div>
        </navbar>
    )
}

