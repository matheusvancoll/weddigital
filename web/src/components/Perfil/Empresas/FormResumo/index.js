import React from "react";

import ImagePerfil from '../../../../assets/perfil.jpg'

export default function FormResumo(props){

    let dadosPerfil = props.dadosUsuario

    console.log("DADOS PERFIIKF")
    console.log(dadosPerfil)

    return(
        <>
            {/* <div className='perfil-infos'>
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
            </div> */}

            {/* <div class="card">
                <div class="card-header">
                    Visitas recebidas em sua vitrine
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                    <p>A well-known quote, contained in a blockquote element.</p>
                    <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                </div>
            </div> */}
            

            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total de visitas em sua vitrine: {}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total de orçamentos recebidos: 5</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <br></br>
            <br></br>
            
            <p></p>
            <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-12" aria-hidden="true">{dadosPerfil.pontosAcumulados} Pontos</a>


        </>
    )
}