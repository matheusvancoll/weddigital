import React, { useContext, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import UserContext from '../../api/userContext-api/userContext'
import Teste from '../teste'

import PrivateRouter from './privateRouter'
import HomePage from '../Homepage'
import Login from '../Login/Login'
import Perfil from '../Perfil'
import CadastroUsuario from '../Login/CadastroUsuario'
import Marketplace from '../Marketplace'

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
        </Switch>
    )
}