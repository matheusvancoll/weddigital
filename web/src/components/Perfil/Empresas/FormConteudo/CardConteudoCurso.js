import React, {useEffect, useState} from "react";

import ImagemTeste from '../../../../assets/acessoria.jpg'

export default function CardConteudoCurso(){
    return(
        <div className="col">
            <div className="card">
                <img src={ImagemTeste} className="card-img-top imagem-conteudo-capa" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
    )
}