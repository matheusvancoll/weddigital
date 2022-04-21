import React from 'react'
import './CardsUser.css'

import Imagem from '../../assets/recepcao.jpeg'

export default function CardAnuncioPostado(props) {
    let classificação = props.dadosAnuncio.classificacao
    if(classificação === 1){ classificação = "⭐✩✩✩✩" }
    if(classificação === 2){ classificação = "⭐⭐✩✩✩" }
    if(classificação === 3){ classificação = "⭐⭐⭐✩✩" }
    if(classificação === 4){ classificação = "⭐⭐⭐⭐☆" }
    if(classificação === 5){ classificação = "⭐⭐⭐⭐⭐" }

    return (
        <div className='cards-anuncios-container'>
            <div className='card-anuncio-image'>
                <img src={Imagem} />
            </div>

            <div className='card-anuncio-dados'>
                <p id='cardAnuncioTitle'>{props.dadosAnuncio.titulo}</p>
                <p> R$ {props.dadosAnuncio.preco}</p>
                <p>{props.dadosAnuncio.cidade}, {props.dadosAnuncio.estado}</p>
                <p>Classificacao: {classificação}</p>
            </div>
            <button>Editar</button>
        </div>
    )
}

