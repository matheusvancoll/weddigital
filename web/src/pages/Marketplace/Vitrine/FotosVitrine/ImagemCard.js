import React from "react";
import Imagem1 from "../../../../assets/crs1.jpeg";

export default function ImagemCard(props){

    const imagem = require(`../../../../fileContents/imagensVitrineProfissional/${props.imagemNome}`)

    return(
        <div className="carousel-item active" data-bs-interval="10000">
            <img src={imagem} className="d-block w-100" alt="..."/>
        </div>
    )
}