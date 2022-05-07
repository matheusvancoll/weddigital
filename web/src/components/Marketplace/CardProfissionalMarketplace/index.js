import React from 'react'
import './CardProfissionalMarketplace.css'

import Imagem from '../../../assets/recepcao.jpeg'

export default function CardProdutoMarketplace(props){

    let classificação = props.dadosProfissionais.classificacao
    if(classificação === 0 || classificação == null || classificação == undefined){ classificação = "✩✩✩✩✩" }
    if(classificação >= 1){ classificação = "⭐✩✩✩✩" }
    if(classificação >= 2){ classificação = "⭐⭐✩✩✩" }
    if(classificação >= 3){ classificação = "⭐⭐⭐✩✩" }
    if(classificação >= 4){ classificação = "⭐⭐⭐⭐☆" }
    if(classificação == 5){ classificação = "⭐⭐⭐⭐⭐" }

    return(
        <div className='card-anuncio-marketplace-container'>
            <img src={Imagem} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{props.dadosProfissionais.nomeEmpresa}</h5>
                <p class="card-text">{props.dadosProfissionais.segmento} | A partir de: {props.dadosProfissionais.valorMinimo}</p>
                <p class="card-text">{props.dadosProfissionais.cidade}, {props.dadosProfissionais.estado}</p>
                <p class="card-text">Classificacao: {props.dadosProfissionais.classificacao} <br></br> Casamentos bem sucedidos: {props.dadosProfissionais.casamentosBemSucedidos}</p>
                <a href={"/buscar-profissional/detalhes=" + props.dadosProfissionais.idProfissional}>Contato</a>
            </div>
        </div>
    )
}