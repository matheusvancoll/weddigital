import React from 'react'
import './Marketplace.css'

import Navbar from '../../components/Navbar'
import SidebarMarketplace from '../../components/Marketplace/SidebarMarketplace'
import CardProdutoMarketplace from '../../components/Marketplace/CardProdutoMarketplace'

import DadosProdutos from '../../config.json'

export default function Marketplace(props){

    let listaOpcoes = DadosProdutos.produtos
    let listaCardProdutosMarketplace = []

    for (let i = 0; i < listaOpcoes.length; i++) {
        listaCardProdutosMarketplace.push(<CardProdutoMarketplace dadosProduto={listaOpcoes[i]} />)
    }

    return(
        <div className='marketplace-container'>
            <Navbar isUserLogado={props.isUserLogado} />
            
            <div className='marketplace-corpo-produtos'>
                <SidebarMarketplace />
                <div className='lista-produtos-marketplace'>
                    {listaCardProdutosMarketplace}
                </div>
            </div>
        </div>
    )
}