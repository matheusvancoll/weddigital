import React, {useContext, useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';
import './CadastroNoivos.css'

import api from '../../../api'
import UserContext from '../../../api/userContext-api/userContext'
import UsuarioModel from '../../../utils/UsuarioModel'
import Utils from "../../../utils/Utils";

import Navbar from '../../../components/Navbar'
import CarregandoPlaceholder from "../../../components/Modal/CarregandoPlaceholder";
import CadastroInvalido from "../../../components/Modal/ErroCarregarDados";
import emailjs from "emailjs-com";
import Config from "../../../config.json";
import LogoWed from "../../../assets/icon.ico";

export default function CadastroUsuario(){
    const history = useHistory()
    const { setToken } = useContext(UserContext)
    const form = useRef();

    const [DadosCadastro, setDadosCadastro] = useState(UsuarioModel.dadosUsuarioNoivDTO)

    const [IsAguardandoConfirmacaoEmail, setIsAguardandoConfirmacaoEmail] = useState(false)
    const [IsUsuarioExistente, setIsUsuarioExistente] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsAcordoChecked, setIsAcordoChecked] = useState(true)
    const [IsSenhaValida, setIsSenhaValida] = useState(true)
    const [IsSenhaIgual, setIsSenhaIgual] = useState(true)
    const [IsNoiva, setIsNoiva] = useState(true)

    function onChange(ev){
        ev.preventDefault()
        const { value, name } = ev.target
        setDadosCadastro({
            ...DadosCadastro, 
            [name]: value,
        })
    }

    function formatarData(ev){
        const { value, name } = ev.target
        let data = value.split('-')
        let dataFormatada = `${data[2]}/${data[1]}/${data[0]}`

        setDadosCadastro({
            ...DadosCadastro,
            dataCasamento: dataFormatada,
        })
    }

    function onSenhaValida(ev){
        ev.preventDefault()
        setIsSenhaValida(false)
        const { value, name } = ev.target

        let isSenhaIntegra = Utils.verificarIntegridadeSenha(value)
        if(isSenhaIntegra){
            setIsSenhaValida(true)
        }else{
            setIsSenhaValida(false)
        }

        setDadosCadastro({
            ...DadosCadastro,
            [name]: value,
        })
    }

    function onSenhaIgual(ev){
        ev.preventDefault()
        setIsSenhaIgual(false)
        const { value, name } = ev.target
        let isSenhaIgual = Utils.verificarIgualdadeSenha(DadosCadastro.senha, value)

        if(isSenhaIgual){
            setIsSenhaIgual(true)
        }else{
            setIsSenhaIgual(false)
        }
    }

    function validacao(ev){
        setIsCarregandoDados(true)
        setIsUsuarioExistente(false)
        setIsSenhaValida(true)

        if(!validarSenha()){
            setIsSenhaValida(false)
            setIsCarregandoDados(false)
            return
        }

        let termosUso = document.getElementById('invalidCheck').checked
        let inputEmail = document.getElementById('inputEmailValidacao').value
        let inputNome = document.getElementById('inputNomeUsuarioValidacao').value

        if(!termosUso){
            setIsAcordoChecked(false)
            setIsCarregandoDados(false)
            return
        }

        setDadosCadastro({
            ...DadosCadastro,
            email: inputEmail,
        })

        setTimeout(() => {
            console.log("Email processado")
        }, "1500", console.log("NOW"))

        document.getElementById('inputHiddenEmail').value = inputEmail
        document.getElementById('inputHiddenNomeUsuario').value = inputNome

        let urlDados = window.location.href.split('_')
        let idUsuarioConviteUrl = null;
        let tokenUsuarioConviteUrl = null;

        if(urlDados.length > 1){
            idUsuarioConviteUrl = urlDados[1]
            tokenUsuarioConviteUrl = urlDados[2]

            setDadosCadastro({
                ...DadosCadastro,
                is_CadastroPorConvite: true,
                idUsuarioConvite: idUsuarioConviteUrl,
                tokenUsuarioConvite: tokenUsuarioConviteUrl,
            })
        }

        onSubmit(ev)
    }

    function onSubmit(ev){
        api.post('usuario/noivos/novoUsuario', DadosCadastro)
            .then((response) => {
                setIsCarregandoDados(false)
                setIsAguardandoConfirmacaoEmail(true)
                setToken(response.data)
                aguardandoLiberacaoEmail(ev, response.data)
            }).catch((error) => {
                setIsAguardandoConfirmacaoEmail(false)
                setIsUsuarioExistente(true)
                setIsCarregandoDados(false)
                window.scrollTo(0,0)
            })
    }

    function aguardandoLiberacaoEmail(ev, tokenUsuario){
        let tokenSplit = tokenUsuario.split('.')
        let idUsuario = tokenSplit[1]
        let idLinkToken = tokenSplit[(tokenSplit.length-1)]
        let linkValidacao = `${Config.api.linkValidacaoEmail}?idUsuario=${idUsuario}&tokenUsuario=${idLinkToken}`

        document.getElementById('inputHiddenLink').value = linkValidacao

        enviarEmailConfirmacaoCadastro(ev)
        setTimeout(() => {
            history.push('/perfil')
        }, "10000")
    }

    function enviarEmailConfirmacaoCadastro(e){
        e.preventDefault();

        emailjs.sendForm('service_7me8gxg', 'template_skfs5gg', form.current, 'duhWa4vLPR4ueB2cj')
            .then((result) => {
                console.log(result.text)
            }, (error) => {
                console.log(error.text)
            })
    }

    return(
        <>
            <Navbar />
            <div className="container-sm cadastro-usuario-container">
                {IsUsuarioExistente
                    ? <CadastroInvalido />
                    :""
                }

                {IsCarregandoDados
                    ? <CarregandoPlaceholder />
                : IsAguardandoConfirmacaoEmail
                    ?
                        <div className="modal-dialog-centered">
                            <div className="aguardando-confirmacao-email__container">
                                <img src={LogoWed} />

                                <h1>Confirme seu email!</h1>
                                <p>Olá você recebeu um email de confirmação de cadastro em seu email</p>
                                <h6>Caso não tenha recebido o email, clique em:
                                    <button type="button" class="btn btn-warning" onClick={enviarEmailConfirmacaoCadastro}>
                                        Reenviar Email
                                    </button>
                                </h6>
                            </div>
                        </div>
                    :<>
                    <p className="text-center texto-label-acesso">Cadastre-se e encontre tudo para seu casamento</p>
                    <form className="row g-3 needs-validation cadastro-usuario-form">
                        <div className="col-md-7">
                            <label for="validationCustom01" className="form-label">Nome completo*</label>
                                <input type="text" className="form-control" id="inputNomeUsuarioValidacao"
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
                            <input type="email" class="form-control" id="inputEmailValidacao" autoComplete="off" aria-describedby="emailHelp" required
                                    name="email" />
                        </div>

                        <div className="col-md-6">
                            <label for="validationCustom03" className="form-label">Senha*</label>
                            <input type="password" className="form-control" id="validationSenha1" required 
                                        name="senha" value={DadosCadastro.senha} onChange={onSenhaValida} />
                        </div>

                        <div className="col-md-6">
                            <label for="validationCustom05" className="form-label">Confirmar senha*</label>
                            <input type="password" className="form-control" id="validationSenha2" required 
                                    onChange={onSenhaIgual}/>
                        </div>

                        <div className="col-md-6">
                            {IsSenhaValida
                                ? ""
                                : <div className=".text-danger">
                                    <p className="text-danger">*Sua senha deve ter entre 8 e 36 caracteres e
                                        incluir, <br></br>
                                        pelo menos, uma letra maiúscula e um número!</p>
                                </div>
                            }
                        </div>

                        <div className="col-md-6">
                            {IsSenhaIgual
                                ? ""
                                : <div className=".text-danger">
                                    <p className="text-danger">*As senhas não são iguais!</p>
                                </div>
                            }
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
                            <label>Casamos em:*</label>
                            <div>
                                <input type="date" autoComplete="off" id="dataCasamento" onChange={formatarData} required />
                            </div>
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
                                    Declaro que li e aceito os <a href="/termos-de-uso" target="_blank">termos de uso </a> e as <a href="/regras-sorteio" target="_blank"> regras do sorteio</a>
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
                            <button className="btn btn-primary" type="submit" onClick={validacao}>Cadastrar</button>
                        </div>
                    </form>
                </>
            }
                <div className="form-envio-email-confirmacao-cadastro">
                    <form ref={form} >
                        <label>Name</label>
                        <input type="text" name="nomeUsuario" id="inputHiddenNomeUsuario" />
                        <label>Email</label>
                        <input type="text" name="email" id="inputHiddenEmail" />
                        <label>Link Validacao</label>
                        <input type="text" name="urlValidacaoEmail" id="inputHiddenLink" />
                    </form>
                </div>
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
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

