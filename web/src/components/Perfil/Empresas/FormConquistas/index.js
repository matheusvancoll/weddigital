import React, {useEffect, useState} from "react";
import './FormConquistas.css'

import Ico_Prata_Gold from '../../../../assets/icons/Prata_Gold.ico'
import Ico_Prata_Platinum from '../../../../assets/icons/Prata_Platinum.ico'
import Ico_Prata_Infinity from '../../../../assets/icons/Prata_Infinity.ico'

import Ico_Ouro_Gold from '../../../../assets/icons/Ouro_Gold.ico'
import Ico_Ouro_Platinum from '../../../../assets/icons/Ouro_Platinum.ico'
import Ico_Ouro_Infinity from '../../../../assets/icons/Ouro_Infinity.ico'

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

    if(numeroCasamentosBemSucedidos >= 200){
        percentualProgresso = 100
    }

    const style = {
        width: `${percentualProgresso ? percentualProgresso : 0}%`
    };

    return(
        <div>
            <h1>Nivel da conta: <span className="nivel-conta-text">{nivelContaNome}</span></h1>

            <div className="progresso-casamentos">
                <div className="progresso-casamentos-status left">
                    <img className="status-conta-ico"
                         src={carregaStatusAtual(nivelContaNome, nivelStatusNome)} />
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

                <div className="progresso-casamentos-status right">
                    <img className="status-conta-ico"
                         src={carregaProximoStatus(nivelContaNome, proximoNivel)} />
                    <h3>Próximo status: {proximoNivel ? proximoNivel : ''}</h3>
                </div>
            </div>
        </div>
    )
}

function carregaStatusAtual(nivelConta, statusConta){

    let statusProfissional = `Ico_${nivelConta}_${statusConta}`

    if(statusProfissional == "Ico_Prata_Gold"){ return Ico_Prata_Gold }
    if(statusProfissional == "Ico_Prata_Platinum"){ return Ico_Prata_Platinum }
    if(statusProfissional == "Ico_Prata_Infinity"){ return Ico_Prata_Infinity }

    if(statusProfissional == "Ico_Ouro_Gold"){ return Ico_Ouro_Gold }
    if(statusProfissional == "Ico_Ouro_Platinum"){ return Ico_Ouro_Platinum }
    if(statusProfissional == "Ico_Ouro_Infinity"){ return Ico_Ouro_Infinity }
}

function carregaProximoStatus(nivelConta, proximoStatusConta){

    let proximoStatus = `Ico_${nivelConta}_${proximoStatusConta}`

    if(proximoStatus == "Ico_Prata_Gold"){ return Ico_Prata_Gold }
    if(proximoStatus == "Ico_Prata_Platinum"){ return Ico_Prata_Platinum }
    if(proximoStatus == "Ico_Prata_Infinity"){ return Ico_Prata_Infinity }

    if(proximoStatus == "Ico_Ouro_Gold"){ return Ico_Ouro_Gold }
    if(proximoStatus == "Ico_Ouro_Platinum"){ return Ico_Ouro_Platinum }
    if(proximoStatus == "Ico_Ouro_Infinity"){ return Ico_Ouro_Infinity }

    if(proximoStatus == null){ return null }
}