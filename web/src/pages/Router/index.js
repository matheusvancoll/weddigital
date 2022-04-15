import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../Homepage'
import Perfil from '../Perfil'
import Marketplace from '../Marketplace'
import AdicionarAnuncio from '../Marketplace/adicionarAnuncio'

export default function Router(props) {
    return(
        <Switch>
            <Route exact path="/">
                <HomePage dadosUsuario={props.dadosUser} />
            </Route>

            <Route exact path="/perfil">
                <Perfil dadosUsuario={props.dadosUser} />
            </Route>

            <Route exact path="/buscar-fornecedores">
                <Marketplace dadosUsuario={props.dadosUser} />
            </Route>

            <Route exact path="/adicionar-anuncio">
                <AdicionarAnuncio dadosUsuario={props.dadosUser} />
            </Route>
        </Switch>
        
    )
}