import React from "react";

import Imagem1 from '../../../../assets/crs1.jpeg'
import Imagem2 from '../../../../assets/crs2.jpeg'
import Imagem3 from '../../../../assets/crs3.jpeg'
import CardImagemVitrine from "../../../../components/Perfil/Empresas/FormDadosGerais/CardImagemVitrine";
import ImagemCard from "./ImagemCard";

export default function FotosVitrine(props){

    let listaImagens = props.listaImagens
    let listaImagensVitrine = []

    for (let i = 0; i < listaImagens.length; i++) {
        listaImagensVitrine.push(<ImagemCard imagemNome={listaImagens[i]} />)
    }


    const imagem1 = require(`../../../../fileContents/imagensVitrineProfissional/${listaImagens[0]}`)
    const imagem2 = require(`../../../../fileContents/imagensVitrineProfissional/${listaImagens[1]}`)
    const imagem3 = require(`../../../../fileContents/imagensVitrineProfissional/${listaImagens[3]}`)
    return(
        <>
            <div className="vitrine-fotos__container">
                <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {/*{listaImagensVitrine}*/}

                        <div class="carousel-item active" data-bs-interval="10000">
                            <img src={imagem1} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item" data-bs-interval="10000">
                            <img src={imagem2} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={imagem3} class="d-block w-100" alt="..." />
                        </div>
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