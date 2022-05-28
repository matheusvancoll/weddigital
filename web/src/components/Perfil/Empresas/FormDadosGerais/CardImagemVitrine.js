import React from "react";

export default function CardImagemVitrine(props){
    const imagem = require(`../../../../fileContents/imagensVitrineProfissional/${props.imagemCarregada}`)

    return(
        <div className="col">
            <div className="card">
                <img src={imagem} className="card-img-top" alt="..." />
            </div>
        </div>
    )
}