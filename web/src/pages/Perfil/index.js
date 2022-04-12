import React from 'react'
import './Perfil.css'

import Navbar from '../../components/Navbar';
import ImagePerfil from '../../assets/perfil.jpg'
import FornecedoresPerfil from '../../components/CardAddFornecedoresPerfil'

export default function HomePage(props) {
    return (
        <div className='perfil-container'>
            <Navbar isUserLogado={props.dadosUsuario.isUserLogado} />

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

                <div className='perfil-info-casamento'>
                    <p id='dataCasamento'>{props.dadosUsuario.dataCasamento}</p>
                    <p>Faltam: {props.dadosUsuario.diasParaCasamento}</p>
                </div>

            </div>

            <div>
                <p className='perfil-meus-fornecedores'>Meus Fornecedores</p>
                <div className='perfil-fornecedores-card-container'>
                    <FornecedoresPerfil title='Recepção'/>
                    <FornecedoresPerfil title='Buffet'/>
                    <FornecedoresPerfil title='Músicos'/>
                    <FornecedoresPerfil title='Fotógrafo'/>
                    <FornecedoresPerfil title='Vestido'/>
                </div>
            </div>

        </div>
    )
}

