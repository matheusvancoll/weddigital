import React from "react";

export default function BoxInfoResumo(props){
    return(
        <div className="box-resumo-casamento__container">
            <div className="box-resumo_itens-top">
                <p>{props.title}</p>
            </div>

            <div className="box-resumo_itens-bottom">
                <p>{props.valor}</p>
            </div>
        </div>
    )
}