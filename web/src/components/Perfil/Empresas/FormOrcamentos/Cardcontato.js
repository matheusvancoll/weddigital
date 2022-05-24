import React from "react";

export default function Cardcontato(props){
    return(
        <>
            <li className={props.isActive ? "clearfix active" : "clearfix"}>
                <img src={props.fotoPerfil} alt="avatar" />
                <div className="about">
                    <div className="name">{props.nome}</div>
                    <div className="status">
                        <i className={props.isOnline ? "fa fa-circle online" : "fa fa-circle offline"}></i> left 7 mins ago
                    </div>
                </div>
            </li>
        </>
    )
}