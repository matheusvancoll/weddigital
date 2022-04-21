import React, { useContext, useEffect, useState } from 'react'
import './Perfil.css'

import api from '../../api';

import Navbar from '../../components/Navbar';
import ImagePerfil from '../../assets/perfil.jpg'

import CardCasamentoFornecedor from './CardDadosPerfilAnunciosFornecedor';
import CardCasamentoNoiv from './CardDadosCasamentoNoiv';
import MeusFornecedoresNoiv from './MeusFornecedoresNoiv';
import MeusAnunciosFornecedor from './MeusAnunciosFornecedor';

export default function Perfil(props) {
    const [DadosResumoPerfil, setDadosResumoPerfil] = useState([])
    
    let idUsuario = props.idUsuario
    
    useEffect(() => {
        api.get("perfilusuario/"+idUsuario).then(({data}) => {
            setDadosResumoPerfil(data)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        })
    }, [])

    let nomeUsuario
    let cidadeUsuario
    let estadoUsuario
    let tipoUsuario
    if(DadosResumoPerfil.usuario != null || DadosResumoPerfil.usuario != undefined){
        nomeUsuario = DadosResumoPerfil.usuario.nomeCompleto
        cidadeUsuario = DadosResumoPerfil.usuario.cidade
        estadoUsuario = DadosResumoPerfil.usuario.estado
        tipoUsuario = DadosResumoPerfil.tipoUsuario
    }
    
    return (
        <div className='perfil-container'>
            <Navbar isLogado={props.idUsuario} tipoUsuario={props.tipoUsuario} />

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
                            <p>{tipoUsuario}</p>
                        </div>
                    </div>
                </div>

                <div>
                    {tipoUsuario == "Fornecedor" 
                        ? <CardCasamentoFornecedor />
                        : tipoUsuario == "Noiva" 
                            ? <CardCasamentoNoiv /> 
                            : <div></div>
                        }
                </div>
            </div>

            <div>
                {tipoUsuario == "Fornecedor"
                    ? <MeusAnunciosFornecedor listaAnuncios={DadosResumoPerfil.listaAnuncios} />
                    : tipoUsuario == "Noiva" 
                        ?<MeusFornecedoresNoiv dadosCasamento={DadosResumoPerfil.dadosCasamento}/>
                        : <div></div>
                }
            </div>
        </div>
    )
}

