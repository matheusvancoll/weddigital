import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import './Navbar.css'

import UserContext from '../../../api/userContext-api/userContext'

export default function Navbar({toggleState, toggleMove}) {
    const { token, setToken } = useContext(UserContext)
    const history = useHistory()

    let dadosToken = token.split('.')
    let tipoUsuario = dadosToken[0]

    function onSubmit(ev){
        ev.preventDefault()
        setToken('')
        history.push('/')
    }

    return(
        <nav className="navbar" id={toggleState ? "" : "max-responsive"}>
        <div className="navbar__toggle">
            <i 
            className="fa fa-bars" 
            onClick={toggleMove}>
            </i>
        </div>
        <div className="navbar__icons">
            <a href='/' onClick={onSubmit}>Sair</a>
            <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        </nav>
    )
}