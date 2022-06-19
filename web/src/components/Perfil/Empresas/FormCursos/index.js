import React, {useEffect, useState} from "react";
import './FormCursos.css'

import CardConteudoCurso from "./CardCurso";
import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";
import api from "../../../../api";

export default function FormConteudo(props){
    const [ IsCarregando, setIsCarregando ] = useState(true)
    const [ DadosCurso, setDadosCurso ] = useState([])

    let nivelConta = props.nivelConta

    useEffect(() => {
        api.get(`cursos/profissional/obterTodasAulas/${nivelConta}`)
            .then(({data}) => {
                setDadosCurso(data)
                setIsCarregando(false)
                //eslint-disable-next-line react-hooks/exhaustive-deps
            }).catch(({error}) => {
                setIsCarregando(false)
                console.log(error)
        })
    }, [])

    let listaCardCursos= []

    for (let i = 0; i < DadosCurso.length; i++) {

        let nivelCursoCurrent
        if( DadosCurso[i].restrincao == 1) { nivelCursoCurrent = ""}
        if( DadosCurso[i].restrincao == 2) { nivelCursoCurrent = "Start"}
        if( DadosCurso[i].restrincao == 3) { nivelCursoCurrent = "Ouro"}
        if( DadosCurso[i].restrincao == 4) { nivelCursoCurrent = "Diamante"}

        let isCursoBlocked = DadosCurso[i].restrincao <= nivelConta ? false : true

        listaCardCursos.push(
            <CardConteudoCurso capaCurso={DadosCurso[i].capaCurso}
                               nomeCurso={DadosCurso[i].nomeCurso}
                               descricaoCurso={DadosCurso[i].descricao}
                               linkCurso={DadosCurso[i].link}
                               nivelCurso={nivelCursoCurrent}
                               isCursoBloqueado={isCursoBlocked} />
        )
    }

    return(
        <div className="aba-conteudos__container">
            <div className="modal-content">
                <h1 className="card-header">Cursos</h1>
                {IsCarregando ? <CarregandoPlaceholder />
                    : <div className="card-body">
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {listaCardCursos}
                        </div>
                    </div>}
            </div>
        </div>
    )
}