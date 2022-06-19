import React from "react";

export default function CardConteudoCurso(props){
    let capaCurso = props.capaCurso != '' ? props.capaCurso : 'no-image.png'
    const imagemCapaCurso = require(`../../../../fileContents/Capa Cursos/${capaCurso}`)

    return(
        <div className="col card-curso-capa">
            <div className="card">
                <h5 className="card-text title-nivel-conta">{props.nivelCurso}</h5>
                <img src={imagemCapaCurso} className="card-img-top imagem-conteudo-capa" alt="..." />
                {props.isCursoBloqueado ? <i className="icon-lock-curso fa-solid fa-lock"></i> : ''}
                <div className="card-body">
                    <h5 className="card-title">{props.nomeCurso}</h5>
                    <p className="card-text">{props.descricaoCurso}</p>
                    <p className="card-text">{props.nivelCurso}</p>
                </div>
                {props.isCursoBloqueado
                    ? '' :
                    <a href={props.linkCurso} target='_blank' className="btn-warning btn-acessar-curso">Acessar Curso</a>}

            </div>
        </div>
    )
}