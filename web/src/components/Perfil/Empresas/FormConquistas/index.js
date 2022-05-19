import React, {useEffect, useState} from "react";
import './FormConquistas.css'


export default function FormDadosGerais(props){
    let dadosStatus = props.dadosStatusPontuacao

    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsDadosInvalido, setIsDadosInvalido] = useState(false)

    let nivelContaNome = dadosStatus.nivelContaNome ? dadosStatus.nivelContaNome : ""
    let nivelStatusNome = dadosStatus.nivelStatusNome ? dadosStatus.nivelStatusNome : ""
    let pontoMinimo = dadosStatus.pontoMinimo ? dadosStatus.pontoMinimo : 0
    let numeroCasamentosBemSucedidos = dadosStatus.numeroCasamentosBemSucedidos ? dadosStatus.numeroCasamentosBemSucedidos : 0
    let pontoMaximo = dadosStatus.pontoMaximo ? dadosStatus.pontoMaximo : 0
    let proximoNivel = dadosStatus.proximoNivel ? dadosStatus.proximoNivel : null

    let valorProporcionalPorcentagem = (100 / (pontoMaximo-pontoMinimo));
    let valorProgressoStatus = (numeroCasamentosBemSucedidos - pontoMinimo)
    let percentualProgresso = valorProporcionalPorcentagem * valorProgressoStatus

    const style = {
        width: `${percentualProgresso ? percentualProgresso : 0}%`
    };

    return(
        <div>
            <h1>Nivel da conta: <span className="nivel-conta-text">{nivelContaNome}</span></h1>
            <h3>{nivelStatusNome}</h3>

            <div className="progresso-casamentos">
                <div className="progresso-casamentos-left">
                    <h3>Status atual: {nivelStatusNome ? nivelStatusNome : ''}</h3>
                </div>

                <div className="progress w-100">
                    <div className="progress-bar" role="progressbar"
                         style={style}
                         aria-valuemin={pontoMinimo}
                         aria-valuenow={numeroCasamentosBemSucedidos}
                         aria-valuemax={pontoMaximo}>Casamentos bem sucedidos: {numeroCasamentosBemSucedidos}
                    </div>
                </div>

                <div className="progresso-casamentos-right">
                    <h3>Próximo status: {proximoNivel ? proximoNivel : ''}</h3>
                </div>
            </div>

        </div>
    )
}