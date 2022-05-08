import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import './PerfilEmpresa.css'

import api from '../../../api/';
import UserContext from '../../../api/userContext-api/userContext';
import UsuarioModel from '../../../utils/UsuarioModel';

import NavbarPerfil from '../../../components/Perfil/Navbar'
import Logo from '../../../assets/avatar.png'

import FormResumo from '../../../components/Perfil/Empresas/FormResumo';
import FormDadosGerais from '../../../components/Perfil//Empresas/FormDadosGerais';
import FormFAQProfissional from '../../../components/Perfil//Empresas/FormFAQProfissional';

export default function Perfil() {
    const [ DadosResumoPerfil, setDadosResumoPerfil ] = useState(UsuarioModel.dadosResumoPerfilProfissionalDTO)
    const [ IsDadosInvalido, setIsDadosInvalido ] = useState(false)
    const [ TabLocation, setTabLocation ] = useState("Resumo")
    const [ IsCarregando, setIsCarregando ] = useState(true)
    const [ SidebarOpen, setSidebarOpen ] = useState(true)
    const { token } = useContext(UserContext)

    let dadosToken = token.split('.')
    let idUsuario = dadosToken[1]
    let nivelUsuario = dadosToken[3]
    let tokenUsuario = dadosToken[5]

    const { data, error } = useSWR(`usuario/empresa/obterDadosPerfil?idUsuario=${idUsuario}&tokenUsuario=${tokenUsuario}`, 
        api.get(`usuario/empresa/obterDadosPerfil?idUsuario=${idUsuario}&tokenUsuario=${tokenUsuario}`)
        .then(({data}) => {
        console.log("TESTE SWR")
        console.log(data)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }).catch(({error}) => {
        console.log("SWR FAIL")
    }))


    useEffect(() => {
        api.get(`usuario/empresa/obterDadosPerfil?idUsuario=${idUsuario}&tokenUsuario=${tokenUsuario}`)
        .then(({data}) => {
            setDadosResumoPerfil(data)
            setIsCarregando(false)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }).catch(({error}) => {
            setIsCarregando(false)
            setIsDadosInvalido(true)
        })
    }, [])
    

    function toggleSidebar() { setSidebarOpen(!SidebarOpen) }

    return (
        <div className='perfil-container'>
            <NavbarPerfil toggleState={SidebarOpen} toggleMove={toggleSidebar} />

            <section className="sidebar" id={SidebarOpen ? "" : "responsive-sidebar"}>
                    <div className="sidebar__title">
                        <div className="sidebar__img">
                            <img src={Logo} alt="logo"/>
                            <h1>{DadosResumoPerfil.nomeEmpresa}</h1>
                        </div>
                    </div>

                    <div className="sidebar__menu">
                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'Resumo' ? "active" : ""}>
                            <a href='#Resumo' onClick={() => setTabLocation("Resumo")} >
                                <i class="fa-solid fa-gauge-high"></i>
                                <span>Resumo</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'meuPerfil' ? "active" : ""}>
                            <a href='#meuPerfil' onClick={() => setTabLocation("meuPerfil")} >
                                <i class="fa-solid fa-address-card"></i>
                                <span>Meu Perfil</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'orcamentos' ? "active" : ""}>
                            <a href='#orcamentos' onClick={() => setTabLocation("orcamentos")} >
                                <i class="fa-solid fa-tags"></i>
                                <span>Orçamentos</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'conteudo' ? "active" : ""}>
                            <a href='#conteudo' onClick={() => setTabLocation("conteudo")} >
                                <i class="fa-solid fa-graduation-cap"></i>
                                <span>Conteúdos</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'conquitas' ? "active" : ""}>
                            <a href='#conquitas' onClick={() => setTabLocation("conquitas")} >
                                <i class="fa-solid fa-flag-checkered"></i>
                                <span>Minhas conquistas</span>
                            </a>
                        </div>

                        {nivelUsuario == null
                        ? 
                            <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'convites' ? "active" : ""}>
                                <a href='#convites' onClick={() => setTabLocation("convites")} >
                                    <i class="fa-solid fa-share-nodes"></i>
                                    <span>Convites</span>
                                </a>
                            </div>
                        :' '
                        }

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'assinatura' ? "active" : ""}>
                            <a href='#assinatura' onClick={() => setTabLocation("assinatura")} >
                                <i class="fa-solid fa-money-check-dollar"></i>
                                <span>Minha assinatura</span>
                            </a>
                        </div>

                        {/* <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'comunidade' ? "active" : ""}>
                            <a href='#comunidade' onClick={() => setTabLocation("comunidade")} >
                                <i class="fa-solid fa-users-rectangle"></i>
                                <span>Comunidade Wed</span>
                            </a>
                        </div> */}

                    </div>
            </section>

            <div className={SidebarOpen ? 'perfil__container_open perfil__box_content' : "perfil__container_close perfil__box_content"}>
                {IsCarregando 
                ? <div className='.container p-4 d-flex justify-content-center'>
                    <button class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Carregando...
                    </button>
                </div> 
                :<>
                    {IsDadosInvalido 
                    ? <div class="container-sm alert alert-danger text-center w-25 " role="alert">
                        Oooops! Parece que algo não saiu como o planejado :(
                        <br></br> 
                        Por favor, tente novamente
                    </div> 
                    : <>
                        <>
                            {TabLocation == 'Resumo' ?
                            <div >
                                <FormResumo dadosUsuario={DadosResumoPerfil}/>
                            </div>
                            :''
                            }

                            {TabLocation == 'meuPerfil' ?
                            <div >
                                <FormDadosGerais dadosResumoPerfil={DadosResumoPerfil} idUsuario={idUsuario} />
                            </div>
                            :''}

                            {TabLocation == 'duvidas' ?
                            <div >
                                <p><FormFAQProfissional /></p>
                            </div>
                            :''}
                        </>
                    </>
                    }
                </>
                }
            </div>
            


            
            {/* <div className='.container p-4 d-flex justify-content-center'>
                <ul className="nav nav-pills">
                <li className="nav-item">
                        <a className={TabLocation == 'resumo' ? 'nav-link active' : 'nav-link'} aria-current="page" href='#' onClick={() => toggleTabs("resumo")}>Resumo</a>
                    </li>
                    <li className="nav-item">
                        <a className={TabLocation == 'dadosGerais' ? 'nav-link active' : 'nav-link'} aria-current="page" href='#' onClick={() => toggleTabs("dadosGerais")}>Dados Gerais</a>
                    </li>
                    <li className="nav-item">
                        <a className={TabLocation == 'duvidas' ? 'nav-link active' : 'nav-link'} href='#' onClick={() => toggleTabs("duvidas")}>Dúvidas</a>
                    </li>
                    <li className="nav-item">
                        <a className={TabLocation == 'galeria' ? 'nav-link active' : 'nav-link'} href='#' onClick={() => toggleTabs("galeria")}>Galeria</a>
                    </li>
                    <li className="nav-item">
                        <a className={TabLocation == 'parceiros' ? 'nav-link active' : 'nav-link'} href='#' onClick={() => toggleTabs("parceiros")}>Seus Parceiros</a>
                    </li>
                    <li className="nav-item">
                        <a className={TabLocation == 'equipe' ? 'nav-link active' : 'nav-link'} href='#' onClick={() => toggleTabs("equipe")}>Minha Equipe</a>
                    </li>
                    <li className="nav-item">
                        <a className={TabLocation == 'conquistas' ? 'nav-link active' : 'nav-link'} href='#' onClick={() => toggleTabs("conquistas")}>Minhas Conquistas</a>
                    </li>
                </ul>
            </div> */}

        </div>
    )
}

