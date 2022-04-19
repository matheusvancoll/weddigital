import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import api from '../../api/index'

import HomePage from '../Homepage'
import Perfil from '../Perfil'
import Marketplace from '../Marketplace'
import AdicionarAnuncio from '../Marketplace/adicionarAnuncio'

export default function Router(props) {
    
    const [Usuario, setUsuario] = useState([])
    
    useEffect(() => {
        api.get("perfilusuario/57").then(({data}) => {
            setUsuario(data)
            //eslint-disable-next-line react-hooks/exhaustive-deps           
        }).catch(error => {
            console.log("Nenhum usuario encontrato")
        })        
    }, [])
    
    return(
        <Switch>
            <Route exact path="/">
                <HomePage dadosUsuario={Usuario} />
            </Route>

            <Route exact path="/perfil">
                <Perfil dadosUsuario={Usuario} />
            </Route>

            <Route exact path="/buscar-fornecedores">
                <Marketplace dadosUsuario={Usuario} />
            </Route>

            <Route exact path="/adicionar-anuncio">
                <AdicionarAnuncio dadosUsuario={Usuario} />
            </Route>
        </Switch>
        
    )
}