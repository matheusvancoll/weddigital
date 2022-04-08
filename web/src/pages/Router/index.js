import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../Homepage'

export default function Router(props) {
    return(
        <Switch>
            <Route exact path="/">
                <HomePage isUserLogado={props.isUserLogado}/>
            </Route>
        </Switch>
    )
}