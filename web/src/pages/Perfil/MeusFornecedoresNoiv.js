import React from "react";

import CardFornecedor from '../../components/CardsUser-Perfil/cardAddFornecedores'
import DadosFornecedores from '../../config.json'

let listaOpcoes = DadosFornecedores.produtos
let listaFornecedores = []

for (let i = 0; i < listaOpcoes.length; i++) {
    listaFornecedores.push(<CardFornecedor dadosProduto={listaOpcoes[i]} />)
}

export default function MeusFornecedoresNoiv(){
    return(
        <div>
            <p className='cards-perfil-title'>Meus Fornecedores</p>
                <div className='perfil-fornecedores-card-container'>
                    <CardFornecedor title='Recepção'/>
                    <CardFornecedor title='Buffet'/>
                    <CardFornecedor title='Músicos'/>
                    <CardFornecedor title='Fotógrafo'/>
                    <CardFornecedor title='Vestido'/>
                    {listaFornecedores}
                </div>
        </div>
    )
}