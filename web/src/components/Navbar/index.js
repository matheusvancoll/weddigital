import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import './Navbar.css'

import UserContext from '../../api/userContext-api/userContext'

import Logo from '../../assets/icon.png'
export default function Navbar(props) {
    const { token, setToken } = useContext(UserContext)
    const history = useHistory()

    let dadosToken = token.split('.')
    let tipoUsuario = dadosToken[0]
    
    function onSubmit(ev){
        ev.preventDefault()
        setToken('')
        history.push('/')
    }

    return (
        <navbar className='navbar-container'>
            <div className='navbar-logo-container'>
                <img src={Logo} className='navbar-logo-img' ></img>
                <a href='/' className='navbar-logo-name'>Wed Digital</a>
            </div>

            <div className='navbar-links'>
                {tipoUsuario == 'profissional' 
                    ? <div>
                        <a href='perfil'>Meu Portifólio</a>
                    </div>
                    : tipoUsuario == 'noivos' 
                    ? <div>
                        <a href='/perfil'>Meu Casamento</a>
                        <a href='/buscar-profissionais'>Fornecedores</a>
                    </div>
                    : <div> </div>
                }
            </div>
            
            {props.isAreaEmpresa 
            ? <div>
                <a href='/empresas/cadastro' id='btnAreaEmpresa'>CADASTRO GRATIS</a>
                <a href='/empresas/login' id='btnLoginEmpresa'>Login</a>
            </div>
            : <div className='navbar-login'>
                <div className={token ? "" : "isLogado"}>
                    <a href='/perfil' id='btnLogin'>Perfil</a>
                    <a href='/' onClick={onSubmit}>Sair</a>
                </div>

                <div className={token ? "isLogado" : ""}>
                    <a href='/login' id='btnLogin'>Acessar</a>
                    <a href='/empresas'>Área Empresa</a>
                </div>
            </div>
            }

            
        </navbar>
    )
}

