import React, { useContext, useEffect, useState } from 'react'
import './Perfil.css'

import api from '../../api';
import UserContext from '../../api/userContext-api/userContext';
import UsuarioModel from '../Login/UsuarioModel';

import Navbar from '../../components/Navbar';
import FormResumo from '../../components/Perfil/FormResumo';
import FormDadosGerais from '../../components/Perfil/FormDadosGerais';


export default function Perfil() {
    const [DadosResumoPerfil, setDadosResumoPerfil] = useState(UsuarioModel.dadosResumoPerfilDTO)
    const [ TabLocation, setTabLocation ] = useState("resumo")
    const [ IsCarregando, setIsCarregando ] = useState(true)
    const [ IsDadosInvalido, setIsDadosInvalido ] = useState(false)
    const [ IsNoivos, setIsNoivos ] = useState(false)
    const { token } = useContext(UserContext)

    let dadosToken = token.split('.')
    let idUsuario = dadosToken[1]
    let tokenUsuario = dadosToken[5]

    useEffect(() => {
        api.get(`usuario/obterdadosperfil?idUsuario=${idUsuario}&tokenUsuario=${tokenUsuario}`)
        .then(({data}) => {
            setDadosResumoPerfil(data)
            console.log("DADOS")
            console.log(data)
            setIsCarregando(false)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }).catch(({error}) => {
            console.log("error")
            console.log(error)
            setIsCarregando(false)
            setIsDadosInvalido(true)
        })
    }, [])
    

    console.log('DADOS GEt')
    console.log(DadosResumoPerfil)

    function toggleTabs(tabName){ setTabLocation(tabName) }

    return (
        <div className='perfil-container'>
            <Navbar />
            
            <div className='.container p-4 d-flex justify-content-center'>
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
            </div>

            {IsCarregando 
            ? <div className='.container p-4 d-flex justify-content-center'>
                <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Carregando...
                </button>
            </div> 
            :<>
                {IsDadosInvalido 
                ? <div class="alert alert-danger text-center" role="alert">
                    Oooops! Parece que algo não saiu como o planejado :(
                    <br></br> 
                    Por favor, tente novamente
                </div> 
                : <>
                    <div className='container-sm forms-container-bttp'>
                        {TabLocation == 'resumo'? 
                        <div >
                            <FormResumo dadosUsuario={DadosResumoPerfil}/>
                        </div>
                        :''}

                        {TabLocation == 'dadosGerais' ?
                        <div >
                            <FormDadosGerais dadosResumoPerfil={DadosResumoPerfil} idUsuario={idUsuario} />
                        </div>
                        :''}

                        {TabLocation == 'duvidas' ?
                        <div >
                            <p>idhnuiff</p>
                        </div>
                        :''}
                    </div>
                </>
                }
            </>
            }
        </div>
    )
}

