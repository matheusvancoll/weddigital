import React, {useState} from "react";
import api from "../../api";

import CarregandoPlaceholder from "../../components/Modal/CarregandoPlaceholder";
import LoginInvalido from "../../components/Modal/LoginInvalido";
import UsuarioModel from "../../utils/UsuarioModel";
import SelecaoSorteio from './SelecaoSorteio'

export default function Sorteio(){
    const [ IsCarregandoDados, setIsCarregandoDados ] = useState(false)
    const [ IsDadosInvalido, setIsDadosInvalido ] = useState(false)
    const [ IsAcessoValido, setIsAcessoValido ] = useState(false)
    const [DadosUser, setDadosUSer] = useState(UsuarioModel.login)

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
        setIsAcessoValido(false)

        api.get(`sorteio/validarAcessoAdmin?login=${DadosUser.user}&senha=${DadosUser.password}`)
            .then((response) => {
                setIsAcessoValido(true)
                setIsCarregandoDados(false)
            }).catch((error) => {
                setIsAcessoValido(false)
                setIsCarregandoDados(false)
                setIsDadosInvalido(true)
        })
        setIsAcessoValido(true)
        setIsCarregandoDados(false)
    }

    return(
        <div>
            <div className="container-sm login-usuario-container">
                {IsDadosInvalido
                    ? <LoginInvalido/>
                    : ""
                }

                {IsCarregandoDados
                    ? <CarregandoPlaceholder/>
                    : IsAcessoValido
                        ? <SelecaoSorteio />
                        : <div className="container-sm login-usuario-container">
                            <p className="text-center texto-label-acesso">Preencha os campos para entrar</p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email ou Usuario</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" required
                                           name="user" value={DadosUser.user} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" required
                                           name="password" value={DadosUser.password} onChange={onChange}/>
                                </div>
                                <button className="btn btn-primary" onClick={onSubmit}>Acessar</button>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}