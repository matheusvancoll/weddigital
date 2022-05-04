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
    let possuiUsuario = dadosToken != "" ? true : false
    
    function onSubmit(ev){
        ev.preventDefault()
        setToken('')
        history.push('/')
    }

    return (
        <navbar className='navbar-container'>
            {/* === LOGO ICON === */}
            <div className='navbar-logo-container'>
                <img src={Logo} className='navbar-logo-img' ></img>
                <a href='/' className='navbar-logo-name'>Wed Digital</a>
            </div>

            {/* === CENTER === */}
            <div className='navbar-links'>
                {props.isAreaEmpresa
                ?
                    <>
                        <a href='#inicio'>Início</a>
                        <a href='#vantagens'>Vantagens</a>
                        <a href='#servicos'>Serviços</a>
                        <a href='#premios'>Prêmios</a>
                        <a href='#planos'>Planos</a>
                    </>
                :
                    <> 
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
                    </>
                }
            </div>

            {/* === LOGIN === */}
            <div className='navbar-login'>
                {props.isAreaEmpresa 
                ? <>
                    {possuiUsuario
                        ? 
                            <>
                                <a href='/empresas/perfil' id='btnLogin'>Perfil</a>
                                <a href='/empresas' onClick={onSubmit}>Sair</a>
                            </>
                        :
                            <>
                                <div>
                                    <a href='/empresas/cadastro' id='btnAreaEmpresa'>CADASTRO GRATIS</a>
                                    <a href='/empresas/login' id='btnLoginEmpresa'>Login</a>
                                </div>
                            </>
                        }
                    </>
                : 
                    <>
                        <div className={token ? "" : "isLogado"}>
                            <a href={tipoUsuario == 'profissional' ? '/empresas/perfil' : '/perfil'} id='btnLogin'>Perfil</a>
                            <a href='/' onClick={onSubmit}>Sair</a>
                        </div>

                        <div className={token ? "isLogado" : ""}>
                            <a href='/login' id='btnLogin'>Acessar</a>
                            <a href='/cadastro' id='btnLogin'>Cadastro</a>
                            <a href='/empresas'>Área Empresa</a>
                        </div>
                    </>
                }
            </div>
        </navbar>
    )
}

