import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import UserContext from '../../api/userContext-api/userContext'
import PrivateRouter from './privateRouter'

import TermoDeUso from '../CondicoesLegais/TermoDeUso'

import HomepageEmpresa from '../Empresas/Homepage'
import CadastroEmpresa from '../Empresas/Acesso/CadastroEmpresa'
import LoginEmpresa from '../Empresas/Acesso/Login'
import PerfilEmpresa from '../Empresas/Perfil/'

import HomepageNoivos from '../Casamentos/Homepage'
import CadastroNoivos from '../Casamentos/Acesso/CadastroNoivos/index.js'
// import LoginNoivos from '../Casamentos/Acesso/Login'
import PerfilNoivos from '../Casamentos/Perfil/'

// import Marketplace from '../Marketplace'
import Vitrine from '../Marketplace/Vitrine/Vitrine'
// import Perfil from '../noivos/Perfil'
import Teste from '../teste'

export default function Router() {
    const { token } = useContext(UserContext)

    return(
        <Switch>
            <Route exact path="/empresas" component={HomepageEmpresa} />
            <Route exact path="/empresas/cadastro" component={CadastroEmpresa} />
            <Route exact path="/empresas/login" component={LoginEmpresa} />
            <PrivateRouter exact path="/empresas/perfil" component={PerfilEmpresa} />
            
            <Route exact path="/" component={HomepageNoivos} />
            <Route exact path="/buscar-profissional/detalhes" component={Vitrine} />

            <Route exact path="/cadastro" component={CadastroNoivos} />
            {/* <Route exact path="/login" component={LoginNoivos} />  */}
            <PrivateRouter exact path="/perfil" component={PerfilNoivos} />

            <Route exact path="/teste" component={Teste} />

            <Route exact path='/termos-de-uso' component={TermoDeUso} />
        </Switch>
    )
}