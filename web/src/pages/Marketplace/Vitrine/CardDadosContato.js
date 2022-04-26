import React from "react";

export default function CardDadosContato(){
    return(
        <>
            <div class="card vitrine-contato-container">
                <h5 class="card-header">Contato</h5>
                <div class="card-body">
                    <label for="validationCustom01" className="form-label">Contato</label>
                    <input class="form-control" type="text" value="(85) 9 8888-9857" aria-label="Disabled input example" disabled readonly />
                    
                    <label for="validationCustom01" className="form-label">Email</label>
                    <input class="form-control" type="text" value="empresashow@hotmail.com.br" aria-label="Disabled input example" disabled readonly />
                    
                    <br></br>
                    <label for="validationCustom01" className="form-label">Classificação: 4.5</label>
                    <label for="validationCustom01" className="form-label">Casamentos bem sucedidos: 8</label>
                    
                    <br></br>
                    <br></br>
                    <a href="#" class="btn btn-primary">Contato WhatsApp</a>
                </div>
            </div>
        </>
    )
}