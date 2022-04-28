import React from "react";
import './CardServicosOferecidos.css'

export default function(props){
    return(
        <div className="card__servicos__contaier">
            <div className="card_servicos_icon">
                <i class={props.icon}></i>
            </div>
            
            <h2 className="card_text">
                {props.texto}
            </h2>
        </div>
    )
}