import React, { useContext, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import UserContext from '../../api/userContext-api/userContext'

import PrivateRouter from './privateRouter'
import HomePage from '../Homepage'
import Login from '../Login/Login'
import Perfil from '../Perfil'
import CadastroUsuario from '../Login/CadastroUsuario'
import Marketplace from '../Marketplace'

export default function Router(props) {
    const { token, tipo } = useContext(UserContext)
    
    let idUsuario = token
    let tipoUsuario = tipo
    
    return(
        <Switch>
            <Route exact path="/">
                <HomePage idUsuario={idUsuario} tipoUsuario={tipoUsuario} />
            </Route>

            <Route exact path="/cadastro">
                <CadastroUsuario />
            </Route>

            <Route exact path="/login" component={Login} />
            <PrivateRouter exact path="/perfil" component={Perfil} idUsuario={idUsuario} tipoUsuario={tipoUsuario}/>
            
            <Route exact path="/buscar-fornecedores">
                <Marketplace tipoUsuario={tipoUsuario} />
            </Route>
        </Switch>
    )
}