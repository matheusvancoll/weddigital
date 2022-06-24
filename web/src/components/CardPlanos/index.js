import React from "react";
import './CardPlanos.css'

import PlanStart from '../../assets/plan-start.png'
import PlanOuro from '../../assets/plan-ouro.png'
import PlanDiamante from '../../assets/plan-diamante.png'

import Config from '../../config.json'
export default function FormComunidade(props){
    let nivelConta = props.nivelConta
    let titleBtn = props.tituloBotao
    let linkAcesso = props.linkAcesso ? props.linkAcesso : "#"

    return(
        <div className='card-planos__container'>
            {/* Acesso Comunidade */}
            {nivelConta > 2 ?
                <div className='acesso-comunidade'>
                    <a href={linkAcesso} target='_blank'>{titleBtn}</a>
                </div>
                : ''}


            {/* Conta Bronza */}
            {nivelConta == 1 || nivelConta == 2 ?
                <div>
                    <h3>Esse recurso é exclusivo para profissionais Ouro e Diamante</h3>
                    <h4>Assine um dos planos para ter acesso!</h4>
                    <div className='card-planos'>
                        <div className='card-planos-image-link'>
                            <img src={PlanStart} />
                            <a href={Config.planos.start} target='_blank'>Assinar Start</a>
                        </div>

                        <div className='card-planos-image-link'>
                            <img src={PlanOuro} />
                            <a href={Config.planos.ouro} target='_blank'>Assinar Ouro</a>
                        </div>

                        <div className='card-planos-image-link'>
                            <img src={PlanDiamante} />
                            <a href={Config.planos.diamante} target='_blank'>Assinar Diamante</a>
                        </div>
                    </div>
                </div>: ''}


            {/* Conta Ouro */}
            {nivelConta == 3 ?
                <div>
                    <h3>Faça o upgrade de plano e tenha mais recursos para sua empresa</h3>
                    <div className='card-planos'>
                        <div className='card-planos-image-link'>
                            <img src={PlanDiamante} />
                            <a href={Config.planos.diamante} target='_blank'>Assinar Diamante</a>
                        </div>
                    </div>
                </div>: ''}
            <div className="space-vertical"></div>
        </div>
    )
}