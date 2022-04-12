import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../Homepage'
import Perfil from '../Perfil'
import Marketplace from '../Marketplace'


export default function Router(props) {
    return(
        <Switch>
            <Route exact path="/">
                <HomePage isUserLogado={props.dadosUser.isUserLogado}/>
            </Route>

            <Route exact path="/perfil">
                <Perfil dadosUsuario={props.dadosUser} />
            </Route>

            <Route exact path="/buscar-fornecedores">
                <Marketplace isUserLogado={props.dadosUser.isUserLogado} />
            </Route>
        </Switch>
        
    )
}