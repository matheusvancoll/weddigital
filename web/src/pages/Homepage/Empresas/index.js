import React from 'react'
import './Homepage-Empresas.css'

import Navbar from '../../../components/Navbar';

export default function HomePage() {
    return (
        <div className=''>
            <Navbar />
            <p>
                Empresas
            </p>
            {/* <div className='busca-homepage-container'>
                <div className='busca-homepage-text'>
                    <p className='busca-homepage-title'>Encontre os melhores <br/> profissionais aqui!</p>
                    <div className='busca-homepage-pesquisa'>
                        <input type='text' className='busca-homepage-input' />
                        <a href='buscar-profissionais' className='busca-homepage-button'>Pesquisar</a>
                    </div>
                    <p className='busca-homepage-texto-complementar'>
                        Encontre mais de 150 profissionais!
                    </p>
                </div>
                <img src={ImageHome} className='busca-homepage-img'></img>
            </div> */}
        </div>
    )
}

