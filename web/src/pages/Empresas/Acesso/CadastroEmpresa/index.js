import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import './CadastroEmpresa.css'

import api from '../../../../api/'
import Navbar from '../../../../components/Navbar'
import UserContext from '../../../../api/userContext-api/userContext'
import UsuarioModel from '../../../../utils/UsuarioModel';

export default function CadastroUsuario(){
    const history = useHistory()
    const { token, setToken } = useContext(UserContext)

    const [DadosCadastro, setDadosCadastro] = useState(UsuarioModel.dadosUsuarioDTO)
    const [IsUsuarioExistente, setIsUsuarioExistente] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsAcordoChecked, setIsAcordoChecked] = useState(true)
    const [IsWhatsapp, setIsWhatsapp] = useState(false)
    const [IsNoivos, setIsNoivos] = useState(true)
    const [IsCNPJ, setIsCNPJ] = useState(false)

    function onChange(ev){
        const { value, name } = ev.target
        setDadosCadastro({
            ...DadosCadastro, 
            [name]: value,
        })
    }

    console.log(DadosCadastro)

    function onSubmit(ev){
        ev.preventDefault();
        setIsCarregandoDados(true)
        setIsUsuarioExistente(false)
        let termosUso = document.getElementById('invalidCheck').checked

        if(!termosUso){
            setIsAcordoChecked(false)
            setIsCarregandoDados(false)
            return
        }

        api.post('usuario/novoUsuario', DadosCadastro)
            .then((response) => {
                setIsCarregandoDados(false)
                setToken(response.data)
                history.push('/perfil')
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
                                <input type="text" className="form-control" id="validationCustom01" required
                                        name="nomeUsuario" value={DadosCadastro.nomeUsuario} onChange={onChange} />
                        </div>

                        <div className="col-md-5">
                            <label for="validationCustomUsername" className="form-label">Login*</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                                        name="login" value={DadosCadastro.login} onChange={onChange} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label for="exampleInputEmail1" class="form-label">Email*</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                                    name="email" value={DadosCadastro.email} onChange={onChange}/>
                        </div>

                        <div className="col-md-6">
                            <label for="validationCustom03" className="form-label">Senha*</label>
                            <input type="password" className="form-control" id="validationCustom03" required 
                                        name="senha" value={DadosCadastro.senha} onChange={onChange} />
                        </div>

                        <div className="col-md-6">
                            <label for="validationCustom05" className="form-label">Confirmar senha*</label>
                            <input type="password" className="form-control" id="validationCustom05" required 
                                    onChange={validarSenha}/>
                        </div>

                        <label class="form-check-label" for="flexSwitchCheckDefault">Estou acessando como:</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                    name="isNoivos" value="false" 
                                    onChange={() =>{
                                        setIsNoivos(!IsNoivos)
                                        setDadosCadastro({
                                            ...DadosCadastro, 
                                            is_Noivos: !IsNoivos,
                                            is_Profissional: IsNoivos
                                        })
                                    }}
                                    />
                            <label class="form-check-label" for="flexSwitchCheckDefault">{IsNoivos ? "Noivos" : "Profissional"}</label>
                        </div>

                        {IsNoivos 
                        ? ""
                        : <>
                            <div className="col-md-12">
                                <label for="validationCustom01" className="form-label">Nome da Empresa*</label>
                                <input type="text" className="form-control" id="validationCustom01" required
                                        name="nomeEmpresa" value={DadosCadastro.nomeEmpresa} onChange={onChange} />
                            </div>

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
                                    <option value="AC">Acre</option>
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
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                            </div>

                            <div className="col-md-7">
                                <label for="validationCustom01" className="form-label">Contato*</label>
                                <input type="text" className="form-control" id="validationCustom01" required
                                        name="numeroContato" value={DadosCadastro.numeroContato} onChange={onChange} />
                            </div>

                            <label class="form-check-label" for="flexSwitchCheckDefault">É Whatsapp?</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                        name="isNoivos" value="false" 
                                        onChange={() =>{
                                            setIsWhatsapp(!IsWhatsapp)
                                            setDadosCadastro({
                                                ...DadosCadastro, 
                                                is_Whatsapp: !IsWhatsapp,
                                            })
                                        }}
                                        />
                                <label class="form-check-label" for="flexSwitchCheckDefault">{IsWhatsapp ? "Sim" : "Não"}</label>
                            </div>

                            <label class="form-check-label" for="flexSwitchCheckDefault">Possui CNPJ?</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                        name="isNoivos" value="false" 
                                        onChange={() =>{
                                            setIsCNPJ(!IsCNPJ)
                                            setDadosCadastro({
                                                ...DadosCadastro, 
                                                is_CNPJ: !IsCNPJ,
                                            })
                                        }}
                                        />
                                <label class="form-check-label" for="flexSwitchCheckDefault">{IsCNPJ ? "Sim" : "Não"}</label>
                            </div>

                            {IsCNPJ
                            ? <>
                                <div className="col-md-7">
                                    <label for="validationCustom01" className="form-label">Número do CNPJ*</label>
                                    <input type="number" className="form-control" id="validationCustom01" required
                                            name="numeroCNPJ" value={DadosCadastro.numeroCNPJ} onChange={onChange} />
                                </div>
                            </> 
                            :<></>
                            }              
                        </>
                        }
            
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
    
}
