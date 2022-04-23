import React from "react";

export default function CardDadosContato(){
    return(
        <>
            <div class="card">
                <h5 class="card-header">Contato</h5>
                <div class="card-body">
                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label"></label>
                        <input class="form-control" type="text" value="Disabled readonly input" aria-label="Disabled input example" disabled readonly />
                    </div>
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}