import React from "react";

export default function BoxInfoResumo(props){
    return(
        <div className="box-resumo__container">
            <div className="box-resumo_itens-left">
                <div className="box-resumo_icon">
                    <i class={props.icon}></i>
                </div>

                <p>{props.title}</p>
            </div>

            <div className="box-resumo_itens-right">
                <p>{props.valor}</p>
            </div>
        </div>
    )
}