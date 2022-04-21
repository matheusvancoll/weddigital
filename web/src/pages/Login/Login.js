import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

import api from '../../api';
import UserContext from '../../api/userContext-api/userContext';


const login = {user: '', password: '' }

export default function UserLogin(){
    const [DadosUser, setDadosUSer] = useState(login)
    const { setToken, setTipo } = useContext(UserContext)
    const history = useHistory()

    function onChange(ev){
        const { value, name } = ev.target

        setDadosUSer({
            ...DadosUser, 
            [name]: value,
        })
    }

    function onSubmit(ev){
        ev.preventDefault();

        api.get(`usuario/validarAcesso?login=${DadosUser.user}&senha=${DadosUser.password}`)
        .then((response) => {
            alert("DEUBOPM")
            console.log(response)
        }).catch((error) => {
            alert("Usuario ou senha invalida")
            console.log("error")
            console.log(error)
        })
    
    
        setDadosUSer(login)
    }

    return (
        <div className="user-login">
            <h1 className="user-login__title">Acessar o Sistema</h1>
            <div autoComplete="nope">
                <div className="user-login__form-control">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="text" name="user" autoComplete="off" value={DadosUser.user} onChange={onChange}/>
                </div>
                <div className="user-login__form-control">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" name="password" value={DadosUser.password} onChange={onChange}/>
                </div>
                <button onClick={onSubmit}
                        theme="contained-green"
                        className="user-login__submit-button"
                    >
                    Entrar
                </button>
            </div>
        </div>
    );
};
