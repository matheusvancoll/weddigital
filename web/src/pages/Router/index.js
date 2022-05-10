import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import UserContext from '../../api/userContext-api/userContext'
import PrivateRouter from './privateRouter'

import TermoDeUso from '../CondicoesLegais/TermoDeUso'

import HomepageEmpresa from '../Empresas/Homepage'
import CadastroEmpresa from '../Empresas/CadastroEmpresa'
import PerfilEmpresa from '../Empresas/Perfil/'

import HomepageNoivos from '../Casamentos/Homepage'
import CadastroNoivos from '../Casamentos/CadastroNoivos/index.js'
import PerfilNoivos from '../Casamentos/Perfil/'

import Login from '../Login'
import Marketplace from '../Marketplace'
import Vitrine from '../Marketplace/Vitrine/Vitrine'
import Teste from '../teste'

export default function Router() {
    const { token } = useContext(UserContext)

    return(
        <Switch>
            {/* EMPRESAS */}
            <Route exact path="/empresas" component={HomepageEmpresa} />
            <Route exact path="/empresas/cadastro" component={CadastroEmpresa} />
            <Route exact path="/empresas/login"> <Login isEmpresa={true}/> </Route>
            <PrivateRouter exact path="/empresas/perfil" component={PerfilEmpresa} />
            
            {/* NOIVOS */}
            <Route exact path="/" component={HomepageNoivos} />
            <Route exact path="/cadastro" component={CadastroNoivos} />
            <Route exact path="/login"> <Login /> </Route>
            <PrivateRouter exact path="/perfil" component={PerfilNoivos} />

            {/* OUTROS */}
            <Route exact path="/buscar-profissional" component={Marketplace} />

            <Route exact path="/buscar-profissional/detalhes" component={Vitrine} />
            <Route exact path="/buscar-profissional/detalhes=:idProfissional" component={Vitrine} />
            <Route exact path="/teste" component={Teste} />
            <Route exact path='/termos-de-uso' component={TermoDeUso} />
        </Switch>
    )
}