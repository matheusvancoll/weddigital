import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';
import './CadastroNoivos.css'

import api from '../../../../api'
import UserContext from '../../../../api/userContext-api/userContext'
import UsuarioModel from '../../../../utils/UsuarioModel'
import Utils from "../../../../utils/Utils";

import Navbar from '../../../../components/Navbar'

export default function CadastroUsuario(){
    const [DadosCadastro, setDadosCadastro] = useState(UsuarioModel.dadosUsuarioNoivDTO)
    const [IsUsuarioExistente, setIsUsuarioExistente] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsAcordoChecked, setIsAcordoChecked] = useState(true)
    const [IsSenhaValida, setIsSenhaValida] = useState(true)
    const { token, setToken } = useContext(UserContext)
    const [IsNoiva, setIsNoiva] = useState(true)
    const history = useHistory()
    
    function onChange(ev){
        const { value, name } = ev.target
        setDadosCadastro({
            ...DadosCadastro, 
            [name]: value,
        })
    }

    function onSubmit(ev){
        ev.preventDefault();
        setIsCarregandoDados(true)
        setIsUsuarioExistente(false)
        setIsSenhaValida(true)

        if(!validarSenha()){
            setIsSenhaValida(false)
            setIsCarregandoDados(false)
            return
        }

        let termosUso = document.getElementById('invalidCheck').checked

        if(!termosUso){
            setIsAcordoChecked(false)
            setIsCarregandoDados(false)
            return
        }
        
        api.post('usuario/noivos/novoUsuario', DadosCadastro)
            .then((response) => {
                setIsCarregandoDados(false)
                setToken(response.data)
                history.push('/aguardando-liberacao')
            }).catch((error) => {
                setIsUsuarioExistente(true)
                setIsCarregandoDados(false)
                window.scrollTo(0,0)
            })
    }

    return(
        <>
            <Navbar />
            <div className="container-sm cadastro-usuario-container">
                {IsUsuarioExistente
                    ? <div class="alert alert-danger" role="alert">
                        Oooops! Parece que o Email ou Login informado já está cadastrado
                    </div>
                    :""
                }

                {IsCarregandoDados
                    ? <button class="btn btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Carregando...
                    </button>
                :<>
                    <p className="text-center texto-label-acesso">Dados de Acesso</p>
                    <form className="row g-3 needs-validation cadastro-usuario-form">
                        <div className="col-md-7">
                            <label for="validationCustom01" className="form-label">Nome completo*</label>
                                <input type="text" className="form-control" id="validationCustom01"
                                        name="nomeUsuario" value={DadosCadastro.nomeUsuario} onChange={onChange} required />
                        </div>

                        <div className="col-md-5">
                            <label for="validationCustomUsername" className="form-label">Login*</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                                        name="login" value={DadosCadastro.login} onChange={onChange}  />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label for="exampleInputEmail1" class="form-label">Email*</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                                    name="email" value={DadosCadastro.email} onChange={onChange}/>
                        </div>

                        <div className="col-md-6">
                            <label for="validationCustom03" className="form-label">Senha*</label>
                            <input type="password" className="form-control" id="validationSenha1" required 
                                        name="senha" value={DadosCadastro.senha} onChange={onChange} />
                        </div>

                        <div className="col-md-6">
                            <label for="validationCustom05" className="form-label">Confirmar senha*</label>
                            <input type="password" className="form-control" id="validationSenha2" required 
                                    onChange={validarSenha}/>
                        </div>

                        {IsSenhaValida
                            ? ""
                            :<div class=".text-danger">
                                <p class="text-danger">*Sua senha deve ter entre 8 e 36 caracteres e incluir, <br></br> 
                                pelo menos, uma letra maiúscula e um número!</p>
                            </div>
                        }

                        <div className="col-md-7">
                            <label for="validationCustom01" className="form-label">Cidade*</label>
                            <input type="text" className="form-control" id="validationCustom01" required
                                    name="cidade" value={DadosCadastro.cidade} onChange={onChange} />
                        </div>

                        <div className="col-md-5">
                            <label for="validationCustom04" className="form-label">Estado*</label>
                            <select className="form-select" id="validationCustom04" required
                                    name="estado" value={DadosCadastro.estado} onChange={onChange} >
                                <option selected disabled>Selecione</option>
                                {/* <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option> */}
                                <option value="SP">São Paulo</option>
                                <option value="SP-CE">São Paulo - Centro</option>
                                <option value="SP-ZL">São Paulo - Zona Leste</option>
                                <option value="SP-ZN">São Paulo - Zona Norte</option>
                                <option value="SP-ZO">São Paulo - Zona Oeste</option>
                                <option value="SP-ZS">São Paulo - Zona Sul</option>
                                {/* <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option> */}
                            </select>
                        </div>

                        <div className="col-md-7">
                            <label for="validationCustom01" className="form-label">Casamos em:*</label>
                            <InputMask className="form-control" id="validationCustom01" required
                                        mask="99/99/9999" maskChar=" "
                                        name="dataCasamento" value={DadosCadastro.dataCasamento} onChange={onChange}/>
                        </div>
            
                        <label class="form-check-label" for="flexSwitchCheckDefault">Sou:</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                    name="is_Noiva" checked={IsNoiva} value={IsNoiva}
                                    onChange={() =>{
                                        setIsNoiva(!IsNoiva)
                                        setDadosCadastro({
                                            ...DadosCadastro, 
                                            is_Noiva: !IsNoiva,
                                        })
                                    }}
                                />
                            <label class="form-check-label" for="flexSwitchCheckDefault">{IsNoiva ? "Noiva" : "Noivo"}</label>
                        </div>

                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                
                                <label className="form-check-label" for="invalidCheck">
                                    Declaro que li e aceito os termos de uso
                                </label>
                                {IsAcordoChecked
                                ? ""
                                : <div class=".text-danger">
                                    <p class="text-danger">*Para se cadastrar você precisa marcar a caixa de confirmação</p>
                                </div>
                                }
                            </div>
                        </div>

                        {/* A senha deve conter no mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial! */}

                        <div className="col-12">
                            <button className="btn btn-primary" type="submit" onClick={onSubmit}>Cadastrar</button>
                        </div>
                    </form>
                </>
            }
            </div>
        </>
    )
}


function validarSenha(){
    let senha1 = document.getElementById('validationSenha1').value
    let senha2 = document.getElementById('validationSenha2').value
    let isSenhaIgual = Utils.verificarIgualdadeSenha(senha1, senha2)

    if(isSenhaIgual){
        let isSenhaIntegra = Utils.verificarIntegridadeSenha(senha1)
        
        if(isSenhaIntegra){
            console.log("DEU TRUE")
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

