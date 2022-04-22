import React, { useContext, useEffect, useState } from 'react'
import './Perfil.css'

import api from '../../api';
import UserContext from '../../api/userContext-api/userContext';
import UsuarioModel from '../Login/UsuarioModel';

import Navbar from '../../components/Navbar';
import ImagePerfil from '../../assets/perfil.jpg'

import CardCasamentoFornecedor from './CardDadosPerfilAnunciosFornecedor';
import CardCasamentoNoiv from './CardDadosCasamentoNoiv';
import MeusFornecedoresNoiv from './MeusFornecedoresNoiv';
import MeusAnunciosFornecedor from './MeusAnunciosFornecedor';

export default function Perfil() {
    const [DadosResumoPerfil, setDadosResumoPerfil] = useState(UsuarioModel.dadosResumoPerfil)
    const { token } = useContext(UserContext)

    let dadosToken = token.split('.')
    let idUsuario = dadosToken[1]
    let nomeUsuario = dadosToken[2]

    useEffect(() => {
        api.get("perfilusuario/"+idUsuario).then(({data}) => {
            console.log("DADOS REEEEEe")
            console.log(data)
            setDadosResumoPerfil(data)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        })
    }, [])


    let cidadeUsuario
    let estadoUsuario
    let tipoUsuario
    if(DadosResumoPerfil.usuario != null || DadosResumoPerfil.usuario != undefined){
        cidadeUsuario = DadosResumoPerfil.usuario.cidade
        estadoUsuario = DadosResumoPerfil.usuario.estado
        tipoUsuario = DadosResumoPerfil.tipoUsuario
    }
    
    return (
        <div className='perfil-container'>
            <Navbar />

            <div className='perfil-infos'>
                <div className='perfil-dados-usuario'>
                    <div className='perfil-img'>
                        <img src={ImagePerfil}></img>
                    </div>

                    <div className='perfil-info-dados'>
                        <p id='nomeUsuario'>{nomeUsuario}</p>
                        <p>{cidadeUsuario}, {estadoUsuario}</p>
                        <div className='perfil-edit'>
                            <button>Editar</button>
                            <p>{dadosToken[0]}</p>
                        </div>
                    </div>
                </div>

                <div>
                    {dadosToken[0] == "profissional" 
                        ? <CardCasamentoFornecedor />
                        : dadosToken[0] == "noivos" 
                            ? <CardCasamentoNoiv /> 
                            : <div></div>
                        }
                </div>
            </div>

            <div>
                {dadosToken[0] == "profissional"
                    ? <MeusAnunciosFornecedor listaAnuncios={DadosResumoPerfil.listaAnuncios} />
                    : dadosToken[0] == "noivos" 
                        ?<MeusFornecedoresNoiv dadosCasamento={DadosResumoPerfil.dadosCasamento}/>
                        : <div></div>
                }
            </div>
        </div>
    )
}

