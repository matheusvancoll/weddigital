import React from "react";

import ImagePerfil from '../../../../assets/perfil.jpg'

export default function FormResumo(props){

    let dadosPerfil = props.dadosUsuario

    console.log("DADOS PERFIIKF")
    console.log(dadosPerfil)

    return(
        <>
            <div className='perfil-infos'>
                <div className='perfil-dados-usuario'>
                    <div className='perfil-img'>
                        <img src={ImagePerfil}></img>
                    </div>

                    <div className='perfil-info-dados'>
                        <p id='nomeUsuario'>{dadosPerfil ? dadosPerfil.nome : ''}</p>
                        <p>{dadosPerfil ? dadosPerfil.cidade : ''}, {dadosPerfil ? dadosPerfil.estado : ''}</p>
                        <div className='perfil-edit'>
                            <button>Editar</button>
                            <p>{dadosPerfil ? dadosPerfil.tipoUsuario : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}