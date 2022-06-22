import React from "react";
import './FormConquistas.css'

import Ico_Start from '../../../../assets/icons/Ico_Start.ico'

import Ico_Ouro_Gold from '../../../../assets/icons/Ouro_Gold.ico'
import Ico_Ouro_Black from '../../../../assets/icons/Ouro_Black.ico'
import Ico_Ouro_Platinum from '../../../../assets/icons/Ouro_Platinum.ico'
import Ico_Ouro_Infinity from '../../../../assets/icons/Ouro_Infinity.ico'

import Ico_Diamante_Gold from '../../../../assets/icons/Diamante_Gold.ico'
import Ico_Diamante_Black from '../../../../assets/icons/Diamante_Black.ico'
import Ico_Diamante_Platinum from '../../../../assets/icons/Diamante_Platinum.ico'
import Ico_Diamante_Infinity from '../../../../assets/icons/Diamante_Infinity.ico'
import Config from "../../../../config.json";
import CardPlanos from "../../../CardPlanos";

export default function FormDadosGerais(props){
    let dadosStatus = props.dadosStatusPontuacao
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
        <div className="progresso-casamentos__container">
            {props.nivelConta == 1
                ? <CardPlanos nivelConta={props.nivelConta} linkAcesso={Config.comunidade.linkProfissionais} tituloBotao='Acessar comunidade' />
                : <>
                    <h1>Nivel da conta: <span className="nivel-conta-text">{nivelContaNome}</span></h1>

                    <div className="progresso-casamentos">
                        <div className="progresso-casamentos-status left">
                            <img className="status-conta-ico"
                                 src={carregarStatus(nivelContaNome, nivelStatusNome)} />
                            <h3>Status atual</h3>
                        </div>

                        <div className="barra_progresso_container">
                            <div className="progress w-100">
                                <div className="progress-bar" role="progressbar"
                                     style={style}
                                     aria-valuemin={pontoMinimo}
                                     aria-valuenow={numeroCasamentosBemSucedidos}
                                     aria-valuemax={pontoMaximo}>
                                </div>
                            </div>
                            <h5>Casamentos bem sucedidos:  <span className="badge bg-secondary">{numeroCasamentosBemSucedidos}</span></h5>
                        </div>


                        <div className="progresso-casamentos-status right">
                            <img className="status-conta-ico"
                                 src={carregarStatus(nivelContaNome, proximoNivel)} />
                            <h3>Próximo status</h3>
                            <h6>Casamentos necessários: {pontoMaximo+1}</h6>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

function carregarStatus(nivelConta, status){

    let statusProfissional = `Ico_${nivelConta}_${status}`
    console.log("statusProfissional")
    console.log(statusProfissional)

    if(statusProfissional == "Ico_Ouro_Gold"){ return Ico_Ouro_Gold }
    if(statusProfissional == "Ico_Ouro_Black"){ return Ico_Ouro_Black }
    if(statusProfissional == "Ico_Ouro_Platinum"){ return Ico_Ouro_Platinum }
    if(statusProfissional == "Ico_Ouro_Infinity"){ return Ico_Ouro_Infinity }

    if(statusProfissional == "Ico_Diamante_Gold"){ return Ico_Diamante_Gold }
    if(statusProfissional == "Ico_Diamante_Black"){ return Ico_Diamante_Black }
    if(statusProfissional == "Ico_Diamante_Platinum"){ return Ico_Diamante_Platinum }
    if(statusProfissional == "Ico_Diamante_Infinity"){ return Ico_Diamante_Infinity }

    if(status == null){ return null }
    if(status == "Start") { return Ico_Start}
}