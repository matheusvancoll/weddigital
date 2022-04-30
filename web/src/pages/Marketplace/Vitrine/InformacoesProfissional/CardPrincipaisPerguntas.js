import React from "react";
import InputMask from 'react-input-mask';

export default function CardDadosContato(){

    return(
        <>
            <div class="card vitrine-informacoes-complementares__container">
                <h5 class="card-header text-center">Informações complementares</h5>
                <div class="card-body">
                    <label for="validationCustom01" className="form-label">Valores a partir de:</label>
                    <input class="form-control" type="text" value="R$ 500" aria-label="Disabled input example" disabled readonly />
                    <br></br>

                    <label for="validationCustom01" className="form-label">Formas de pagamento</label>
                    <input class="form-control" type="text" value="Dinheiro ou pix" aria-label="Disabled input example" disabled readonly />
                    <br></br>

                    <label for="validationCustom01" className="form-label">Realiza mais de um evento por dia?</label>
                    <input class="form-control" type="text" value="Não" aria-label="Disabled input example" disabled readonly />
                    <br></br>
                    
                    <label for="validationCustom01" className="form-label">Trabalha só ou com equipe?</label>
                    <input class="form-control" type="text" value="Equipe" aria-label="Disabled input example" disabled readonly />
                </div>
            </div>
        </>
    )
}