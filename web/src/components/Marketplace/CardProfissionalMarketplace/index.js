import React from 'react'
import './CardProfissionalMarketplace.css'

import Imagem from '../../../assets/recepcao.jpeg'

export default function CardProdutoMarketplace(props){

    let nomeEmpresa = props.dadosProfissionais.nomeEmpresa
    let segmento = props.dadosProfissionais.segmento
    let valorMinimo = props.dadosProfissionais.valorMinimo
    let cidade = props.dadosProfissionais.cidade
    let estado = props.dadosProfissionais.estado
    let classificacao = props.dadosProfissionais.classificacao
    let casamentosBemSucedidos = props.dadosProfissionais.casamentosBemSucedidos
    let idProfissional = props.dadosProfissionais.idProfissional
    let nivelStatusConta = props.dadosProfissionais.nivelStatusConta
    let imagemVitrine = props.dadosProfissionais.imagemMarketplace

    let nomeArquivo = imagemVitrine ? imagemVitrine : 'capaVitrine.jpeg'
    const imagemPrincipalCapa = require(`../../../fileContents/imagensVitrineProfissional/${nomeArquivo}`)

    return(
        <div className='card-anuncio-marketplace-container'>
            <img src={imagemPrincipalCapa} class="card-img-top image-profissional" alt="..." />
            {nivelStatusConta ? <h5 className="card-text nivel-profissional-status">{nivelStatusConta}</h5> : ''}

            <div class="card-body">
                <h5 class="card-title">{nomeEmpresa}</h5>
                <p class="card-text">{segmento} | A partir de: {valorMinimo}</p>
                <p class="card-text">{cidade}, {estado}</p>
                <p class="card-text">Classificacao: {classificacao ? classificacao : "N/D"} <br></br> Casamentos bem sucedidos: {casamentosBemSucedidos}</p>
                <a href={"/buscar-profissional/detalhes=" + idProfissional}>Orçamento gratis</a>
            </div>
        </div>
    )
}