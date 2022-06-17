import React, { useContext, useEffect, useState } from 'react'
import './PerfilNoivos.css'

import api from '../../../api/';
import UserContext from '../../../api/userContext-api/userContext';
import UsuarioModel from '../../../utils/UsuarioModel';

import NavbarPerfil from '../../../components/Perfil/Navbar'

import FormResumo from "../../../components/Perfil/Noivos/FormResumoCasamentos";
import FormDadosCasamentos from "../../../components/Perfil/Noivos/FormDadosCasamentos"
import FormCursosNoivas from '../../../components/Perfil/Noivos/FormCursosNoivas'
import FormComunidadeNoivos from '../../../components/Perfil/Noivos/FormComunidadeNoivos'


export default function Perfil() {
    const [ DadosResumoPerfil, setDadosResumoPerfil ] = useState(UsuarioModel.dadosResumoPerfilCasamentoDTO)
    const [ IsDadosInvalido, setIsDadosInvalido ] = useState(false)
    const [ TabLocation, setTabLocation ] = useState("resumo")
    const [ IsCarregando, setIsCarregando ] = useState(true)
    const [ SidebarOpen, setSidebarOpen ] = useState(true)
    const { token } = useContext(UserContext)

    let urlTabAcesso = window.location.href.split('#')

    let dadosToken = token.split('.')
    let idUsuario = dadosToken[1]
    let idNoivos = dadosToken[2]

    useEffect(() => {
        api.get(`usuario/noivos/obterDadosPerfil?idUsuario=${idUsuario}&idNoivos=${idNoivos}`)
            .then(({data}) => {
                setDadosResumoPerfil(data)
                setIsCarregando(false)
                setIsCarregando(false)
                //eslint-disable-next-line react-hooks/exhaustive-deps
            }).catch(({error}) => {
            setIsCarregando(false)
            setIsDadosInvalido(true)
        })
    }, [])

    function toggleSidebar() { setSidebarOpen(!SidebarOpen) }

    let nomeArquivoPerfil = DadosResumoPerfil.fotoPerfil ? DadosResumoPerfil.fotoPerfil : 'avatar.png'
    const fotoPerfil = require(`../../../fileContents/imagensPerfil/${nomeArquivoPerfil}`)

    return (
        <div className='perfil-container'>
            <NavbarPerfil toggleState={SidebarOpen} toggleMove={toggleSidebar} />

            <section className="sidebar" id={SidebarOpen ? "" : "responsive-sidebar"}>
                <div className="sidebar__title">
                    <div className="sidebar__img">
                        <img src={fotoPerfil} alt="logo"/>
                        <h1>{DadosResumoPerfil.nomeUsuario}</h1>
                    </div>
                </div>

                <div className="sidebar__menu">
                    <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'resumo' ? "active" : ""}>
                        <a href='#resumo' onClick={() => setTabLocation("resumo")} >
                            <i class="fa-solid fa-gauge-high"></i>
                            <span>Resumo</span>
                        </a>
                    </div>

                    <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'meuCasamento' ? "active" : ""}>
                        <a href='#meuCasamento' onClick={() => setTabLocation("meuCasamento")} >
                            <i class="fa-solid fa-address-card"></i>
                            <span>Meu Casamento</span>
                        </a>
                    </div>

                    <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'orcamentos' ? "active" : ""}>
                        <a href='#orcamentos' onClick={() => setTabLocation("orcamentos")} >
                            <i class="fa-solid fa-tags"></i>
                            <span>Meus Orçamentos</span>
                        </a>
                    </div>

                    <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'cursos' ? "active" : ""}>
                        <a href='#cursos' onClick={() => setTabLocation("cursos")} >
                            <i class="fa-solid fa-graduation-cap"></i>
                            <span>Cursos</span>
                        </a>
                    </div>

                    <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'comunidade' ? "active" : ""}>
                        <a href='#comunidade' onClick={() => setTabLocation("comunidade")} >
                            <i className="fa-solid fa-people-group"></i>
                            <span>Comunidade</span>
                        </a>
                    </div>
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
                    :<div className="conteinar_conteudo_perfil">
                        {IsDadosInvalido
                            ? <div class="container-sm alert alert-danger text-center w-25 " role="alert">
                                Oooops! Parece que algo não saiu como o planejado :(
                                <br></br>
                                Por favor, tente novamente
                            </div>
                            : <>
                                <>
                                    {TabLocation == 'resumo' ?
                                        <div >
                                            <FormResumo dadosCasamento={DadosResumoPerfil}/>
                                        </div>
                                        :''
                                    }

                                    {TabLocation == 'meuCasamento' ?
                                        <div >
                                            <FormDadosCasamentos dadosResumoPerfil={DadosResumoPerfil} idUsuario={idUsuario} idNoivos={idNoivos} />
                                        </div>
                                        :''}

                                    {TabLocation == 'orcamentos' ?
                                        <div >
                                            <h1>Orçamentos</h1>
                                        </div>
                                        :''}

                                    {TabLocation == 'cursos' ?
                                        <div >
                                            <FormCursosNoivas />
                                        </div>
                                        :''}

                                    {TabLocation == 'comunidade' ?
                                        <div >
                                            <FormComunidadeNoivos />
                                        </div>
                                        :''}
                                </>
                            </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

