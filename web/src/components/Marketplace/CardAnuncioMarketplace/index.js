import React from 'react'
import './CardAnuncioMarketplace.css'

import Imagem from '../../../assets/recepcao.jpeg'

export default function CardProdutoMarketplace(props){

    let classificação = props.dadosProduto.classificacao
    if(classificação === 1){ classificação = "⭐✩✩✩✩" }
    if(classificação === 2){ classificação = "⭐⭐✩✩✩" }
    if(classificação === 3){ classificação = "⭐⭐⭐✩✩" }
    if(classificação === 4){ classificação = "⭐⭐⭐⭐☆" }
    if(classificação === 5){ classificação = "⭐⭐⭐⭐⭐" }

    return(
        <div className='card-anuncio-marketplace-container'>
            <div className='card-anuncio-marketplace-image'>
                <img src={Imagem} />
            </div>
            <div className='card-anuncio-marketplace-dados'>
                <p id='cardAnuncioTitle'>{props.dadosProduto.titulo}</p>
                <p>{props.dadosProduto.cidade}, {props.dadosProduto.estado}</p>
                <p>Classificacao: {classificação}</p>
            </div>
            <a href={"contato-fornecedor/" + props.dadosProduto.idFornecedor}>Contato</a>
        </div>
    )
}