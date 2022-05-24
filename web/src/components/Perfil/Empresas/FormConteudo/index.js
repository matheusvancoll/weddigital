import React, {useEffect, useState} from "react";
import './FormConteudo.css'

import ImagemTeste from '../../../../assets/acessoria.jpg'
import CardConteudoCurso from "./CardConteudoCurso";

export default function FormConteudo(){
    return(
        <div className="aba-conteudos__container">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <CardConteudoCurso />
                <CardConteudoCurso />
                <CardConteudoCurso />
                <CardConteudoCurso />
            </div>
        </div>
    )
}