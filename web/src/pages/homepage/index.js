import React from 'react'
import './Homepage.css'

import Navbar from '../../components/Navbar';
import ImageHome from '../../assets/homepage.jpg'
import Categoria from '../../components/Categorias-Homepage'

export default function HomePage(props) {
    return (
        <div className='homepage-container'>
            <Navbar isLogado={props.idUsuario} tipoUsuario={props.tipoUsuario} />

            <div className='busca-homepage-container'>
                <div className='busca-homepage-text'>
                    <p className='busca-homepage-title'>Encontre os melhores <br/> profissionais aqui!</p>
                    <div className='busca-homepage-pesquisa'>
                        <input type='text' className='busca-homepage-input' />
                        <a href='buscar-fornecedores' className='busca-homepage-button'>Pesquisar</a>
                    </div>
                    <p className='busca-homepage-texto-complementar'>
                        Encontre mais de 150 profissionais!
                    </p>
                </div>
                <img src={ImageHome} className='busca-homepage-img'></img>
            </div>

            <div className='categoria-homepage-container'>
                <Categoria title="Vestidos" />
                <Categoria title="Buffet" />
                <Categoria title="Recepção" />
                <Categoria title="Músicos" />
                <Categoria title="Fotógrafo" />
            </div>
            
        </div>
    )
}

