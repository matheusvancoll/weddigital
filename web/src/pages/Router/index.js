import React, { useContext, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import UserContext from '../../api/userContext-api/userContext'
import Teste from '../teste'

import PrivateRouter from './privateRouter'
import HomePage from '../Homepage'
import CadastroUsuario from '../Login/CadastroUsuario'
import Login from '../Login/Login'
import Perfil from '../Perfil'
import Marketplace from '../Marketplace'
import Vitrine from '../Marketplace/Vitrine/Vitrine'

export default function Router(props) {
    const { token } = useContext(UserContext)

    return(
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>

            <Route exact path="/cadastro">
                <CadastroUsuario />
            </Route>

            <Route exact path="/login" component={Login} />
            <PrivateRouter exact path="/perfil" component={Perfil} />
            
            <Route exact path="/buscar-profissionais">
                <Marketplace />
            </Route>

            <Route exact path="/teste">
                <Teste />
            </Route>

            <Route exact path="/dadosProfissional">
                <Vitrine />
            </Route>
        </Switch>
    )
}