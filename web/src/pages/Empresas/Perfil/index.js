import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import './PerfilEmpresa.css'

import api from '../../../api/';
import UserContext from '../../../api/userContext-api/userContext';
import UsuarioModel from '../../../utils/UsuarioModel';
import StatusModel from "../../../utils/statusNivelModel";

import NavbarPerfil from '../../../components/Perfil/Navbar'

import FormResumo from '../../../components/Perfil/Empresas/FormResumo';
import FormDadosGerais from '../../../components/Perfil//Empresas/FormDadosGerais';
import FormConquistas from '../../../components/Perfil/Empresas/FormConquistas'
import FormCursos from "../../../components/Perfil/Empresas/FormCursos";
import FormOrcamentos from "../../../components/Perfil/MensagensChat";
import FormComunidade from "../../../components/Perfil/Empresas/FormComunidade";
import {useHistory} from "react-router-dom";

export default function Perfil() {
    const [ DadosResumoPerfil, setDadosResumoPerfil ] = useState(UsuarioModel.dadosResumoPerfilProfissionalDTO)
    const [ DadosStatusProfissional, setDadosStatusProfissional ] = useState(StatusModel.StatusNivelProfissional)
    const [ IsDadosInvalido, setIsDadosInvalido ] = useState(false)
    const [ TabLocation, setTabLocation ] = useState("resumo")
    const [ IsCarregando, setIsCarregando ] = useState(true)
    const [ SidebarOpen, setSidebarOpen ] = useState(true)

    const { token } = useContext(UserContext)
    const history = useHistory()

    let urlTabAcesso = window.location.href.split('#')

    let dadosToken = token.split('.')
    let idUsuario = dadosToken[1]
    let idProfissional = dadosToken[2]

    // const { data, error } = useSWR(`usuario/empresa/obterDadosPerfil?idUsuario=${idUsuario}&idUsuario=${idProfissional}`,
    //     api.get(`usuario/empresa/obterDadosPerfil?idUsuario=${idUsuario}&idUsuario=${idProfissional}`)
    //     .then(({data}) => {
    //     console.log("TESTE SWR")
    //     console.log(data)
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // }).catch(({error}) => {
    //     console.log("SWR FAIL")
    // }))


    useEffect(() => {
        api.get(`usuario/empresa/obterDadosPerfil?idUsuario=${idUsuario}&idProfissional=${idProfissional}`)
        .then(({data}) => {
            setDadosResumoPerfil(data)
            setIsCarregando(false)
            setIsCarregando(false)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }).catch(({error}) => {
            setIsCarregando(false)
            setIsDadosInvalido(true)
            history.push('/empresas')
        })


        api.get(`usuario/empresa/obterDadosPontuacao/${idUsuario}`)
            .then(({data}) => {
                setDadosStatusProfissional(data)
                setTabLocation(urlTabAcesso[1] ? urlTabAcesso[1] : "resumo")
                //eslint-disable-next-line react-hooks/exhaustive-deps
            }).catch(({error}) => {
            setIsCarregando(false)
        })
    }, [])

    function toggleSidebar() { setSidebarOpen(!SidebarOpen) }

    let nomeArquivoPerfil = DadosResumoPerfil.fotoPerfil ? DadosResumoPerfil.fotoPerfil : 'avatar.jpg'
    const fotoPerfil = require(`../../../fileContents/imagensPerfil/${nomeArquivoPerfil}`)

    return (
        <div className='perfil-container'>
            <NavbarPerfil toggleState={SidebarOpen} toggleMove={toggleSidebar} />

            <section className="sidebar" id={SidebarOpen ? "" : "responsive-sidebar"}>
                    <div className="sidebar__title">
                        <div className="sidebar__img">
                            <img src={fotoPerfil} alt="logo"/>
                            <h1>{DadosResumoPerfil.nomeEmpresa}</h1>
                        </div>
                    </div>

                    <div className="sidebar__menu">
                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'resumo' ? "active" : ""}>
                            <a href='#resumo' onClick={() => setTabLocation("resumo")} >
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
                                <span>Meus Orçamentos</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'cursos' ? "active" : ""}>
                            <a href='#cursos' onClick={() => setTabLocation("cursos")} >
                                <i class="fa-solid fa-graduation-cap"></i>
                                <span>Cursos</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'conquitas' ? "active" : ""}>
                            <a href='#conquitas' onClick={() => setTabLocation("conquitas")} >
                                <i class="fa-solid fa-flag-checkered"></i>
                                <span>Minhas conquistas</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'convites' ? "active" : ""}>
                            <a href='#convites' onClick={() => setTabLocation("convites")} >
                                <i class="fa-solid fa-share-nodes"></i>
                                <span>Indicar</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'comunidade' ? "active" : ""}>
                            <a href='#comunidade' onClick={() => setTabLocation("comunidade")} >
                                <i className="fa-solid fa-people-group"></i>
                                <span>Comunidade</span>
                            </a>
                        </div>

                        <div className={SidebarOpen ? "sidebar__item" : "sidebar__item responsive"} id={TabLocation == 'assinatura' ? "active" : ""}>
                            <a href='#assinatura' onClick={() => setTabLocation("assinatura")} >
                                <i class="fa-solid fa-money-check-dollar"></i>
                                <span>Minha assinatura</span>
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
                                    {DadosStatusProfissional.nivelContaNome == 'Bronze'
                                        ? ''
                                        : <FormConquistas dadosStatusPontuacao={DadosStatusProfissional}/>}
                                    <FormResumo dadosUsuario={DadosResumoPerfil}/>
                                </div>
                            :''
                            }

                            {TabLocation == 'meuPerfil' ?
                                <div >
                                    <FormDadosGerais dadosResumoPerfil={DadosResumoPerfil} idUsuario={idUsuario} idProfissional={idProfissional} />
                                </div>
                            :''}

                            {TabLocation == 'orcamentos' ?
                                <div >
                                    <FormOrcamentos />
                                </div>
                            :''}

                            {TabLocation == 'cursos' ?
                                <div >
                                    <FormCursos nivelConta={DadosResumoPerfil.nivelConta}/>
                                </div>
                            :''}

                            {TabLocation == 'conquitas' ?
                                <div >
                                    <FormConquistas dadosStatusPontuacao={DadosStatusProfissional} nivelConta={DadosResumoPerfil.nivelConta} />
                                </div>
                            :''}

                            {TabLocation == 'convites' ?
                                <div>
                                    <h1>Convide parceiros e ganhe pontos para concorrer a R$1.000 todos os meses, confira quantos pontos você pode ganhar:</h1>
                                </div>
                            :''}

                            {TabLocation == 'comunidade' ?
                                <div>
                                    <FormComunidade nivelConta={DadosResumoPerfil.nivelConta} />
                                </div>
                            :''}
                            {TabLocation == 'assinatura' ?
                                <div>
                                    <h1>Indicações</h1>
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

