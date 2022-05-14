import React, { useEffect, useState } from 'react'
import './Marketplace.css'

import api from '../../api/index'

import Navbar from '../../components/Navbar'
import SidebarMarketplace from '../../components/Marketplace/SidebarMarketplace'
import CardAnuncioMarketplace from '../../components/Marketplace/CardProfissionalMarketplace'
import CardAnuncioPlaceholder from '../../components/Modal/CardAnuncioPlaceholder'

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
                <div className='container__vitrine__marketplacce'>
                    <div>
                        <div className="container-sm p-2">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Início</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Busca</li>
                                </ol>
                            </nav>
                        </div>

                        <div className="container-sm">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                       aria-describedby="search-addon"/>
                                <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                            </div>
                        </div>
                    </div>


                    <div>
                        {IsCarregandoDados
                            ? <>
                                <div className='placeholder-lista-profissionais'>
                                    <CardAnuncioPlaceholder />
                                    <CardAnuncioPlaceholder />
                                    <CardAnuncioPlaceholder />
                                </div>
                            </>
                            :<>
                                <div className='lista-produtos-marketplace'>
                                    {listaCardProfissionaisMarketplace}
                                </div>
                            </>
                        }
                    </div>


                </div>



                {/*{IsCarregandoDados */}
                {/*? <>*/}
                {/*    <div className='placeholder-lista-profissionais'>*/}
                {/*        <CardAnuncioPlaceholder />*/}
                {/*        <CardAnuncioPlaceholder />*/}
                {/*        <CardAnuncioPlaceholder />*/}
                {/*    </div>*/}
                {/*</>*/}
                {/*:<>*/}
                {/*    <div className='lista-produtos-marketplace'>*/}
                {/*        {listaCardProfissionaisMarketplace}*/}
                {/*    </div>*/}
                {/*</>*/}
                {/*}*/}
            </div>
        </div>
    )
}