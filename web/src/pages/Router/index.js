import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRouter from './privateRouter'

import HomepageEmpresa from '../Empresas/Homepage'
import CadastroEmpresa from '../Empresas/CadastroEmpresa'
import PerfilEmpresa from '../Empresas/Perfil/'

import HomepageNoivos from '../Casamentos/Homepage'
import CadastroNoivos from '../Casamentos/CadastroNoivos'
import PerfilNoivos from '../Casamentos/Perfil/'

import Login from '../Login'
import Marketplace from '../Marketplace'
import Vitrine from '../Marketplace/Vitrine/Vitrine'
import Teste from '../teste'

import TermoDeUso from '../CondicoesLegais/TermoDeUso'
import RegrasSorteio from '../CondicoesLegais/RegrasSorteio'
import Sorteio from "../Sorteio/Login";

export default function Router() {
    return(
        <Switch>
            {/* EMPRESAS */}
            <Route exact path="/empresas" component={HomepageEmpresa} />
            <Route exact path="/empresas/cadastro:tokenConvite" component={CadastroEmpresa} />
            <Route exact path="/empresas/login"> <Login isEmpresa={true}/> </Route>
            <PrivateRouter exact path="/empresas/perfil" component={PerfilEmpresa} />
            
            {/* NOIVOS */}
            <Route exact path="/" component={HomepageNoivos} />
            <Route exact path="/cadastro" component={CadastroNoivos} />
            <Route exact path="/login"> <Login /> </Route>
            <PrivateRouter exact path="/perfil" component={PerfilNoivos} />

            {/* Marketplace */}
            <Route exact path="/buscar-profissional" component={Marketplace} />
            <Route exact path="/buscar-profissional/detalhes" component={Vitrine} />
            <Route exact path="/buscar-profissional/detalhes=:idProfissional" component={Vitrine} />

            {/* Condições legais */}
            <Route exact path='/termos-de-uso' component={TermoDeUso} />
            <Route exact path='/regras-sorteio' component={RegrasSorteio} />

            <Route exact path="/teste" component={Teste} />
            <Route exact path="/admin/gerar-ganhador" component={Sorteio} />

        </Switch>
    )
}