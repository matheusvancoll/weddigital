import React from "react";
import './CardVantagensEmpresas.css'

export default function CardVantagensEmpresas(props){
    return(
        <div className='card__homepage_container'>
            <div className="card__icon">
                <i class={props.icon}></i>
            </div>
            <div className="card_text">
                <h2 className="card_title">
                    {props.title}
                </h2>
                <h4 className="card_description">
                    {props.description}
                </h4>
            </div>
        </div>
    )
}