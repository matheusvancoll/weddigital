import React from "react";
import './CardIconsPontos.css'

export default function CardIconsPontos(props){
    return(
        <div className='card_icons_pontos'>
            <div className="icons_icon">
                <i class={props.icon}></i>
            </div>
            <div className="card_icons_text">
                <h2 className="icons_title">
                    {props.title}
                </h2>
                <h4 className="icons_desc">
                    {props.description}
                </h4>
            </div>
        </div>
    )
}