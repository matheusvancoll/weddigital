import React from 'react'
import './Marketplace.css'

import Navbar from '../../components/Navbar'
import SidebarMarketplace from '../../components/Marketplace/SidebarMarketplace'
import CardAnuncioMarketplace from '../../components/Marketplace/CardAnuncioMarketplace'

import DadosProdutos from '../../config.json'

export default function Marketplace(props){

    let listaOpcoes = DadosProdutos.produtos
    let listaCardProdutosMarketplace = []

    for (let i = 0; i < listaOpcoes.length; i++) {
        listaCardProdutosMarketplace.push(<CardAnuncioMarketplace dadosProduto={listaOpcoes[i]} />)
    }

    return(
        <div className='marketplace-container'>
            <Navbar isUserLogado={props.dadosUsuario.isUserLogado} tipoUsuario={props.dadosUsuario.tipoUsuario} />
            
            <div className='marketplace-corpo-produtos'>
                <SidebarMarketplace />
                <div className='lista-produtos-marketplace'>
                    {listaCardProdutosMarketplace}
                </div>
            </div>
        </div>
    )
}