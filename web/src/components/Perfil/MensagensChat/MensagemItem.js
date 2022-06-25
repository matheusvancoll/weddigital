import React from "react";

export default function MensagemItem(props){
    return(
        <li className="clearfix">
            <div className="message-data text-right">
                <div className={props.myselfSend ? 'message other-message float-right' : 'message my-message'}>{props.conteudoMensagem}</div>
            </div>
        </li>
    )
}