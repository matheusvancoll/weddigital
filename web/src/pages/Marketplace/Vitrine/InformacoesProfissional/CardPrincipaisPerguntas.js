import React from "react";
import InputMask from 'react-input-mask';

export default function CardDadosContato(props){

    let valorMinimo = props.valorMinimo
    let formasPagamento = props.formasPagamento
    let maisDeUmDia = props.maisDeUmDia
    let trabalhaSozinho = props.trabalhaSozinho

    return(
        <>
            <div class="card vitrine-informacoes-complementares__container">
                <h5 class="card-header text-center">Informações complementares</h5>
                <div class="card-body">
                    <label for="validationCustom01" className="form-label">Valores a partir de:</label>
                    <input class="form-control" type="text" value={valorMinimo ? valorMinimo : "Não informado"} aria-label="Disabled input example" disabled readonly />
                    <br></br>

                    <label for="validationCustom01" className="form-label">Formas de pagamento</label>
                    <input class="form-control" type="text" value={formasPagamento ? formasPagamento : "Não informado"} aria-label="Disabled input example" disabled readonly />
                    <br></br>

                    <label for="validationCustom01" className="form-label">Realiza mais de um evento por dia?</label>
                    <input class="form-control" type="text" value={maisDeUmDia ? "Sim" : "Não"} aria-label="Disabled input example" disabled readonly />
                    <br></br>
                    
                    <label for="validationCustom01" className="form-label">Trabalha só ou com equipe?</label>
                    <input class="form-control" type="text" value={trabalhaSozinho ? "Sozinho" : "Em equipe"} aria-label="Disabled input example" disabled readonly />
                </div>
            </div>
        </>
    )
}