import React from 'react'
import './SidebarMarketplace.css'

import CategoriaSidebar from './CategoriasSidebar'
import DadosCategoria from '../../../config.json'

export default function SidebarMarketplace(){
    return(
        <div className='sidebar-marketplace-container'>
            <CategoriaSidebar title='Categorias' opcoes={DadosCategoria.filtros.Categorias} />
            <CategoriaSidebar title='Valores' opcoes={DadosCategoria.filtros.Valores} />
            <CategoriaSidebar title='Classificação' opcoes={DadosCategoria.filtros.Classificação} />
            <div className='sidebar-marketplace-button'>
                <button>Filtrar</button>
            </div>
        </div>
    )
}