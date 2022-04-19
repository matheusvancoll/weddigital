import React, { useEffect, useState } from 'react'
import './Marketplace.css'

import api from '../../api/index'

import Navbar from '../../components/Navbar'
import SidebarMarketplace from '../../components/Marketplace/SidebarMarketplace'
import CardAnuncioMarketplace from '../../components/Marketplace/CardAnuncioMarketplace'


export default function Marketplace(props){
    const [Anuncios, setAnuncios] = useState([])
    
    useEffect(() => {
        api.get("anuncio/buscarTodos").then(({data}) => {
            setAnuncios(data)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        })
    }, [])
    
    
    let listaOpcoes = Anuncios
    let listaCardProdutosMarketplace = []

    for (let i = 0; i < listaOpcoes.length; i++) {
        listaCardProdutosMarketplace.push(<CardAnuncioMarketplace dadosProduto={listaOpcoes[i]} />)
    }


    return(
        <div className='marketplace-container'>
            <Navbar isUserLogado={props.dadosUsuario.length  != 0 ? true : false} tipoUsuario={props.dadosUsuario.tipoUsuario} />
            <div className='marketplace-corpo-produtos'>
                <SidebarMarketplace />
                <div className='lista-produtos-marketplace'>
                    {listaCardProdutosMarketplace}
                </div>
            </div>
        </div>
    )
}