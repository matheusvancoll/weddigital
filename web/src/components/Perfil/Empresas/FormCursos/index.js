import React, {useEffect, useState} from "react";
import './FormCursos.css'

import CardConteudoCurso from "./CardCurso";
import api from "../../../../api";

export default function FormConteudo(props){
    const [ IsCarregando, setIsCarregando ] = useState(true)
    const [ DadosCurso, setDadosCurso ] = useState([])

    let nivelConta = props.nivelConta

    useEffect(() => {
        api.get(`cursos/profissional/obterTodasAulas/${nivelConta}`)
            .then(({data}) => {
                console.log(data)
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
            <CardConteudoCurso capaCurso="DESTRAVE-16-9.png"
                               nomeCurso={DadosCurso[i].nomeCurso}
                               descricaoCurso={DadosCurso[i].descricao}
                               nivelCurso={nivelCursoCurrent}
                               isCursoBloqueado={isCursoBlocked} />
        )
    }

    return(
        <div className="aba-conteudos__container">
            <div className="modal-content">
                <h1 className="card-header">Cursos</h1>
                {IsCarregando ? <h1>Carregando</h1> : ''}

                <div className="card-body">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {listaCardCursos}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />*/}
                        {/*<CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />*/}
                    </div>
                </div>
            </div>
        </div>
    )
}