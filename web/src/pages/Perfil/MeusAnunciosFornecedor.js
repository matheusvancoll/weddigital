import React, { useEffect, useState } from "react";

import CardAnuncio from '../../components/CardsUser-Perfil/cardAnunciosPostados'
import DadosAnuncio from '../../config.json'


let listaOpcoes = DadosAnuncio.produtos
let listaAnuncios = []

for (let i = 0; i < listaOpcoes.length; i++) {
    listaAnuncios.push(<CardAnuncio dadosProduto={listaOpcoes[i]} />)
}

export default function MeusAnunciosFornecedor(props){


    return(
        <div>
            <div className='perfil-fornecedor-container'>
                <p className='cards-perfil-title'>Meus Anúncios</p>
                <a href='/adicionar-anuncio'>Adicionar</a>
            </div>
                <div className='cards-perfil-fornecedor-container'>
                    {listaAnuncios}
                </div>
        </div>
    )
}