import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginEmpresa.css';

import api from '../../../../api';
import Navbar from '../../../../components/Navbar';
import UsuarioModel from "../../../../utils/UsuarioModel";
import LoginInvalido from '../../../../components/ModalError/LoginInvalido'
import UserContext from '../../../../api/userContext-api/userContext';
import CarregandoPlaceholder from '../../../../components/ModalError/CarregandoPlaceholder';

export default function UserLogin(){
    const [IsDadosInvalido, setIsDadosInvalido] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [DadosUser, setDadosUSer] = useState(UsuarioModel.login)
    const { setToken } = useContext(UserContext)
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
        setIsCarregandoDados(true)
        setIsDadosInvalido(false)

        api.get(`usuario/validarAcesso?login=${DadosUser.user}&senha=${DadosUser.password}`)
        .then((response) => {
            setToken(response.data)
            setIsCarregandoDados(false)
            history.push('/empresas/perfil')
        }).catch((error) => {
            setIsCarregandoDados(false)
            setIsDadosInvalido(true)
        })
    
        setDadosUSer({
            ...DadosUser, 
            password: "",
        })
    }

    return (
        <>
            <Navbar isAreaEmpresa={true}/>
            <div className="container-sm login-usuario-container">
                {IsDadosInvalido
                ? <LoginInvalido />
                :""}

                {IsCarregandoDados
                ? <CarregandoPlaceholder />
                :<div className="container-sm login-usuario-container">
                    <p className="text-center texto-label-acesso">Login</p>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email ou Usuario</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                                    name="user" value={DadosUser.user} onChange={onChange} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" required
                                    name="password" value={DadosUser.password} onChange={onChange} />
                        </div>
                        <button class="btn btn-primary" onClick={onSubmit}>Acessar</button>
                    </form>
                </div>
                }
            </div>
        </>
    );
};
