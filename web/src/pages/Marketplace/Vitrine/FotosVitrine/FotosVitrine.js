import React from "react";

import ImagemCard from "./ImagemCard";

export default function FotosVitrine(props){

    let listaImagens = props.listaImagens
    let listaImagensVitrine = []
    let imagemActive = null;

    if(listaImagens.length > 0){
        imagemActive = require(`../../../../fileContents/imagensVitrineProfissional/${listaImagens[0].nomeImagem}`)
        for (let i = 0; i < listaImagens.length; i++) {
            if(i == 0){ continue }
            const imagemParam = require(`../../../../fileContents/imagensVitrineProfissional/${listaImagens[i].nomeImagem}`)
            listaImagensVitrine.push(<ImagemCard arquivoImagem={imagemParam}/>)
        }
    }else{
        imagemActive = require('../../../../fileContents/imagensVitrineProfissional/no-image.png')
    }


    return(
        <>
            <div className="vitrine-fotos__container">
                <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                            <img src={imagemActive} class="d-block w-100" alt="..." />
                        </div>
                        {listaImagensVitrine.length > 0 ? listaImagensVitrine : ''}
                    </div>

                    <button class="carousel-control-prev" type="button"         data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Próxima</span>
                    </button>
                </div>
            </div>
        </>
    )
}