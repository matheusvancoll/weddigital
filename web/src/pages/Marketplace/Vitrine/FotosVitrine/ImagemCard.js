import React from "react";

export default function ImagemCard(props){
    return(
        <div className="carousel-item" data-bs-interval="10000">
            <img src={props.arquivoImagem} className="d-block w-100" alt="..."/>
        </div>
    )
}