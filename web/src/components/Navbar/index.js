import React, { useContext } from 'react'
import {Link, useHistory} from 'react-router-dom';
import './Navbar.css'

import UserContext from '../../api/userContext-api/userContext'

import Logo from '../../assets/icon.ico'
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
                <Link to='/' className='navbar-logo-name'>Wed <br></br>Digital</Link>
            </div>

            {/* === CENTER === */}
            <div className='navbar-links'>
                {props.isAreaEmpresa
                ?
                    <>
                        <div className='mobile-hidden'>
                            <a href='#vantagens'>Vantagens</a>
                            <a href='#servicos'>Serviços</a>
                            <a href='#premios'>Prêmios</a>
                        </div>
                    </>
                :
                    <> 
                        {tipoUsuario == 'profissional' 
                        ? <div>
                            <a href='/#inicio'>Início</a>
                            <a href='/#sorteio'>Sorteio</a>
                            <a href='/#dicas-wed'>Dicas</a>
                        </div>
                        : tipoUsuario == 'noivos' 
                        ? <div>
                            <Link to='/perfil'>Meu Casamento</Link>
                            <Link to='/buscar-profissionais'>Fornecedores</Link>
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
                                <Link to='/empresas/perfil' id='btnLogin'>Perfil</Link>
                                <Link to='/empresas' onClick={onSubmit}>Sair</Link>
                            </>
                        :
                            <>
                                <div>
                                    <Link to='/empresas/cadastro' id='btnAreaEmpresa'>CADASTRO GRATIS</Link>
                                    <Link to='/login' id='btnLoginEmpresa'>Login</Link>
                                </div>
                            </>
                        }
                    </>
                : 
                    <>
                        <div className={token ? "" : "isLogado"}>
                            <Link to={tipoUsuario == 'profissional' ? '/empresas/perfil' : '/perfil'} id='btnLogin'>Perfil</Link>
                            <Link to='/' onClick={onSubmit}>Sair</Link>
                        </div>

                        <div className={token ? "isLogado" : ""}>
                            <Link to='/login' id='btnLogin'>Acessar</Link>
                            <Link to='/cadastro' id='btnLogin'>Cadastro</Link>
                            <Link to='/empresas'>Área Empresa</Link>
                        </div>
                    </>
                }
            </div>
        </navbar>
    )
}

