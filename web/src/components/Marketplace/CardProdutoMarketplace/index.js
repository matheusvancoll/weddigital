import React from 'react'
import './CardProdutoMarketplace.css'

import Imagem from '../../../assets/recepcao.jpeg'

export default function CardProdutoMarketplace(props){

    let classificação = props.dadosProduto.classificacao
    if(classificação === 1){ classificação = "⭐✩✩✩✩" }
    if(classificação === 2){ classificação = "⭐⭐✩✩✩" }
    if(classificação === 3){ classificação = "⭐⭐⭐✩✩" }
    if(classificação === 4){ classificação = "⭐⭐⭐⭐☆" }
    if(classificação === 5){ classificação = "⭐⭐⭐⭐⭐" }

    return(
        <div className='card-produto-marketplace-container'>
            <div className='card-produto-marketplace-image'>
                <img src={Imagem} />
            </div>
            <div className='card-produto-marketplace-dados'>
                <p id='cardProdutoTitle'>{props.dadosProduto.title}</p>
                <p>{props.dadosProduto.cidade}, {props.dadosProduto.estado}</p>
                <p>Classificacao: {classificação}</p>
            </div>
            <button>Contato</button>
        </div>
    )
}