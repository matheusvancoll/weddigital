import React, { useEffect, useState } from 'react'
import './Marketplace.css'

import api from '../../api/index'

import Navbar from '../../components/Navbar'
import SidebarMarketplace from '../../components/Marketplace/SidebarMarketplace'
import CardAnuncioMarketplace from '../../components/Marketplace/CardProfissionalMarketplace'
import CarregandoPlaceholder from '../../components/ModalError/CarregandoPlaceholder'


export default function Marketplace(){
    const [Profissionais, setProfissionais] = useState([])
    const [IsCarregandoDados, setIsCarregandoDados] = useState(true)
    
    useEffect(() => {
        api.get("profissionais/listarTodos/").then(({data}) => {
            setProfissionais(data)
            setIsCarregandoDados(false)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        })
    }, [])
    
    
    let listaProfissionais = Profissionais
    let listaCardProfissionaisMarketplace = []

    for (let i = 0; i < listaProfissionais.length; i++) {
        listaCardProfissionaisMarketplace.push(<CardAnuncioMarketplace dadosProfissionais={listaProfissionais[i]} />)
    }

    return(
        <div className='marketplace-container'>
            <Navbar />
            <div className='marketplace-corpo-produtos'>
                <SidebarMarketplace />
                {IsCarregandoDados ? <CarregandoPlaceholder /> :
                <>
                    <div className='lista-produtos-marketplace'>
                            {listaCardProfissionaisMarketplace}
                    </div>
                </>}
            </div>
        </div>
    )
}