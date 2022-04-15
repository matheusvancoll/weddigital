import React from 'react'
import './Perfil.css'

import Navbar from '../../components/Navbar';
import ImagePerfil from '../../assets/perfil.jpg'

import CardCasamentoNoiv from './CardCasamentoNoiv';
import CardCasamentoFornecedor from './CardCasamentoFornecedor';
import MeusFornecedoresNoiv from './MeusFornecedoresNoiv';
import MeusAnunciosFornecedor from './MeusAnunciosFornecedor';

export default function HomePage(props) {
    return (
        <div className='perfil-container'>
            <Navbar isUserLogado={props.dadosUsuario.isUserLogado} tipoUsuario={props.dadosUsuario.tipoUsuario} />

            <div className='perfil-infos'>
                <div className='perfil-dados-usuario'>
                    <div className='perfil-img'>
                        <img src={ImagePerfil}></img>
                    </div>

                    <div className='perfil-info-dados'>
                        <p id='nomeUsuario'>{props.dadosUsuario.nome}</p>
                        <p>{props.dadosUsuario.cidade}, {props.dadosUsuario.estado}</p>
                        <div className='perfil-edit'>
                            <button>Editar</button>
                            <p>{props.dadosUsuario.tipoUsuario}</p>
                        </div>
                    </div>
                </div>

                <div>
                    {props.dadosUsuario.tipoUsuario == "fornecedor"  ? 
                        <CardCasamentoFornecedor dadosUsuario={props.dadosUsuario} /> : 
                        <CardCasamentoNoiv dadosUsuario={props.dadosUsuario}/>
                    }
                </div>
            </div>

            <div>
                {props.dadosUsuario.tipoUsuario == "fornecedor"  ? 
                    <MeusAnunciosFornecedor dadosFornecedor={props.dadosUsuario} />:
                    <MeusFornecedoresNoiv/>
                }
            </div>

        </div>
    )
}

