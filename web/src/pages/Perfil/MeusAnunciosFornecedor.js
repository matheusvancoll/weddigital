import React, { useEffect, useState } from "react";

import api from "../../api";

import CardAnuncio from '../../components/CardsUser-Perfil/cardAnunciosPostados'


export default function MeusAnunciosFornecedor(props){
    const [AnunciosFornecedor, setAnunciosFornecedor] = useState([])
    
    useEffect(() => {
        api.get("anuncio/buscarTodos").then(({data}) => {
            setAnunciosFornecedor(data)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        })
    }, [])

    let listaOpcoes = AnunciosFornecedor
    let listaAnuncios = []

    for (let i = 0; i < listaOpcoes.length; i++) {
        listaAnuncios.push(<CardAnuncio dadosAnuncio={listaOpcoes[i]} />)
    }

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