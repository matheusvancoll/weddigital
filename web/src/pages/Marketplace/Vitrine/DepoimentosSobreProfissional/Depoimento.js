import React, { useState } from "react";
import InputMask from 'react-input-mask';

export default function CardDadosContato(props){
    const [ isPedirOrcamento, setIsPedirOrcamento ] = useState(true)

    return(
        <>
            <div class="card depoimento_noivos__container">
                <div class="card-body">
                    <h4>{props.nome} - Casou em <span class="badge color-roxo">{props.dataCasamento}</span></h4>

                    <h6>Casamento bem sucedido <span class={props.casamentoBemSucedido ? 'badge bg-success' : 'badge bg-danger'}>{props.casamentoBemSucedido ? 'Sim' : 'Não'}</span></h6>
                    <h6>Nota <span class={props.nota > 3.5 ? 'badge bg-success' : 'badge bg-danger'}>{props.nota}</span></h6>
                    
                    <label for="validationCustom01" className="form-label">Depoimento</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                    value={props.depoimento} disabled readonly />
                </div>
            </div>
        </>
    )
}