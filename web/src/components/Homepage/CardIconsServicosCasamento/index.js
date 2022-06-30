import React from "react";
import './CardIconsServicosCasamento.css'

export default function CardIconsServicosCasamento(props){
    return(
        <div className="card-icon-servicos-casamentos__container">
            <img src={props.image}></img>
            <p className='title-escrita'>{props.texto}</p>
        </div>
    )
}
