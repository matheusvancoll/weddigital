import React, { useEffect, useState } from 'react'
import './Perfil.css'

import api from '../../api';

import Navbar from '../../components/Navbar';
import ImagePerfil from '../../assets/perfil.jpg'

import CardCasamentoNoiv from './CardCasamentoNoiv';
import CardCasamentoFornecedor from './CardCasamentoFornecedor';
import MeusFornecedoresNoiv from './MeusFornecedoresNoiv';
import MeusAnunciosFornecedor from './MeusAnunciosFornecedor';

export default function HomePage() {
    const [Usuario, setUsuario] = useState([])
    
    useEffect(() => {
        api.get("perfilusuario/58").then(({data}) => {
            setUsuario(data)
            //eslint-disable-next-line react-hooks/exhaustive-deps           
        }).catch(error => {
            console.log("Nenhum usuario encontrato")
        })        
    }, [])
    
    let dados = Usuario
    
    return (
        <div className='perfil-container'>
            <Navbar isUserLogado={dados.length  != 0 ? true : false} tipoUsuario={dados.tipoUsuario} />

            <div className='perfil-infos'>
                <div className='perfil-dados-usuario'>
                    <div className='perfil-img'>
                        <img src={ImagePerfil}></img>
                    </div>

                    <div className='perfil-info-dados'>
                        <p id='nomeUsuario'>{dados.usuario.nomeCompleto}</p>
                        <p>{dados.usuario.cidade}, {dados.usuario.estado}</p>
                        <div className='perfil-edit'>
                            <button>Editar</button>
                            <p>{dados.tipoUsuario}</p>
                        </div>
                    </div>
                </div>

                <div>
                    {dados.tipoUsuario == "Fornecedor"  ? 
                        <CardCasamentoFornecedor /> : 
                        <CardCasamentoNoiv dadosCasamento={dados.dadosCasamento}/>
                    }
                </div>
            </div>

            <div>
                {dados.tipoUsuario == "Fornecedor"  ? 
                    <MeusAnunciosFornecedor listaAnuncios={dados.listaAnuncios} />:
                    <MeusFornecedoresNoiv dadosCasamento={dados.dadosCasamento}/>
                }
            </div>
        </div>
    )
}

