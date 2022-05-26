import React, {useEffect, useState} from "react";
import './FormConteudo.css'

import ImagemTeste from '../../../../assets/acessoria.jpg'
import CardConteudoCurso from "./CardConteudoCurso";

export default function FormConteudo(){
    return(
        <div className="aba-conteudos__container">
            <div className="modal-content">
                <h1 className="card-header">Cursos Diamante</h1>
                <div className="card-body">
                    <label htmlFor="validationCustom01" className="form-label">Descrição da empresa</label>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                    </div>
                </div>
            </div>

            <div className="modal-content">
                <h1 className="card-header">Cursos Ouro</h1>
                <div className="card-body">
                    <label htmlFor="validationCustom01" className="form-label">Descrição da empresa</label>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                    </div>
                </div>
            </div>

            <div className="modal-content">
                <h1 className="card-header">Cursos Start</h1>
                <div className="card-body">
                    <label htmlFor="validationCustom01" className="form-label">Descrição da empresa</label>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                        <CardConteudoCurso />
                    </div>
                </div>
            </div>
        </div>
    )
}