import React from "react";

export default function Cardcontato(props){


    function alterarActive(){
        props.alterarContatoAtivo(props.idItem);
        props.isAltare(true)
    }

    return(
        <>
            <li className={props.isActive ? "clearfix active" : "clearfix"} onClick={alterarActive}>
                <img src={props.fotoPerfil} alt="avatar" />
                <div className="about">
                    <div className="name">{props.nome}</div>
                    {/*<div className="status">*/}
                    {/*    <i className={props.isOnline ? "fa fa-circle online" : "fa fa-circle offline"}></i>*/}
                    {/*</div>*/}
                </div>
            </li>
        </>
    )
}