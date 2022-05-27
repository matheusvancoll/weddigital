import React, {useEffect, useState} from "react";
import './FormCursos.css'

import CardConteudoCurso from "./CardCurso";

export default function FormConteudo(){
    return(
        <div className="aba-conteudos__container">
            <div className="modal-content">
                <h1 className="card-header">Cursos</h1>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Diamante" isCursoBloqueado={false} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                        <CardConteudoCurso capaCurso="DESTRAVE-16-9.png" nomeCurso="Destrave" descricaoCurso="hueheuheuheu" nivelCurso="Ouro" isCursoBloqueado={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}