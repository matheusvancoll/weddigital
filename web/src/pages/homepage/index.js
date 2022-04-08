import React from 'react'
import './Homepage.css'

import Navbar from '../../components/Navbar';
import ImageHome from '../../Assets/homepage.jpg'
import Categorias from '../../components/Categorias-Homepage'

export default function HomePage(props) {
    return (
        <div className='homepage-container'>
            <Navbar isUserLogado={props.isUserLogado} />

            <div className='busca-homepage-container'>
                <div className='busca-homepage-text'>
                    <p className='busca-homepage-title'>Encontre os melhores <br/> profissionais aqui!</p>
                    <div className='busca-homepage-pesquisa'>
                        <input type='text' className='busca-homepage-input' />
                        <button className='busca-homepage-button'>Pesquisar</button>
                    </div>
                    <p className='busca-homepage-texto-complementar'>
                        Encontre mais de 150 profissionais!
                    </p>
                </div>
                <img src={ImageHome} className='busca-homepage-img'></img>
            </div>

            <div className='categoria-homepage-container'>
                <Categorias title="Vestidos" />
                <Categorias title="Buffet" />
                <Categorias title="Recepção" />
                <Categorias title="Músicos" />
                <Categorias title="Fotógrafo" />
            </div>
            
        </div>
    )
}

