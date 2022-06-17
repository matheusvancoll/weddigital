import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import InputMask from 'react-input-mask';
import emailjs from 'emailjs-com'
import './CadastroEmpresa.css'

import Config from '../../../config.json'
import api from '../../../api'
import Navbar from '../../../components/Navbar'
import UsuarioModel from '../../../utils/UsuarioModel';
import UserContext from '../../../api/userContext-api/userContext'
import CadastroInvalido from "../../../components/Modal/CadastroInvalido";
import Utils from "../../../utils/Utils";
import CarregandoPlaceholder from "../../../components/Modal/CarregandoPlaceholder";
import LogoWed from "../../../assets/icon.ico";


export default function CadastroUsuario(){
    const history = useHistory()
    const { setToken } = useContext(UserContext)

    const [DadosCadastro, setDadosCadastro] = useState(UsuarioModel.dadosUsuarioEmpresaDTO)

    const [IsAguardandoConfirmacaoEmail, setIsAguardandoConfirmacaoEmail] = useState(false)
    const [IsUsuarioExistente, setIsUsuarioExistente] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsAcordoChecked, setIsAcordoChecked] = useState(true)
    const [IsSenhaValida, setIsSenhaValida] = useState(true)
    const [IsSenhaIgual, setIsSenhaIgual] = useState(true)
    const [IsWhatsapp, setIsWhatsapp] = useState(false)

    const [IsCNPJ, setIsCNPJ] = useState(false)
    const form = useRef();

    function onChange(ev){
        ev.preventDefault()
        const { value, name } = ev.target
        setDadosCadastro({
            ...DadosCadastro, 
            [name]: value,
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

    function enviarEmailConfirmacaoCadastro(e){
        e.preventDefault();

        emailjs.sendForm('service_5tqqlsa', 'template_x9le1nm', form.current, 'XKOIdqt9WWgiZGPAc')
        .then((result) => {
            console.log(result.text)
        }, (error) => {
            console.log(error.text)
        })
    }

    function validacao(ev){
        setIsCarregandoDados(true)
        setIsUsuarioExistente(false)
        let termosUso = document.getElementById('invalidCheck').checked
        let inputEmail = document.getElementById('inputEmailValidacao').value
        let inputNome = document.getElementById('inputNomeUsuarioValidacao').value

        setDadosCadastro({
            ...DadosCadastro,
            email: inputEmail,
        })

        setTimeout(() => {
            console.log("Email processado")
        }, "1500")

        document.getElementById('inputHiddenEmail').value = inputEmail
        document.getElementById('inputHiddenNomeUsuario').value = inputNome

        if(!termosUso){
            setIsAcordoChecked(false)
            setIsCarregandoDados(false)
            return
        }

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
         api.post('usuario/empresa/novoUsuario', DadosCadastro)
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
            history.push('/empresas/perfil')
        }, "10000")
    }

    return(
        <>
            <Navbar isAreaEmpresa={true}/>
            <div className="container-sm cadastro-usuario-container">
                {IsUsuarioExistente
                    ? <CadastroInvalido />
                    :""
                }

                {IsCarregandoDados
                ? <CarregandoPlaceholder />
                :
                    IsAguardandoConfirmacaoEmail
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
                        <p className="text-center texto-label-acesso">Cadastre-se e faça o seu negócio crescer</p>
                        <form className="row g-3 needs-validation cadastro-usuario-form">
                            <div className="col-md-7">
                                <label for="validationCustom01" className="form-label">Nome completo*</label>
                                    <input type="text" className="form-control" id="inputNomeUsuarioValidacao" required
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
                                <label for="inputEmailValidacao" class="form-label">Email*</label>
                                <input type="email" class="form-control" id="inputEmailValidacao" autoComplete="off" required />
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
                                    :<div class=".text-danger">
                                        <p class="text-danger">*Sua senha deve ter entre 8 e 36 caracteres e incluir, <br></br>
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
                                <label for="validationCustom01" className="form-label">Telefone*</label>
                                <InputMask className="form-control" id="validationCustom01" required
                                            mask="(99) 99999999" maskChar=" "
                                            name="numeroContato" value={DadosCadastro.numeroContato} onChange={onChange}/>
                            </div>

                            <div className="col-md-5">
                                <label for="validationCustom04" className="form-label">Segmento da empresa*</label>
                                <select className="form-select" id="validationCustom04" required
                                        name="segmento" value={DadosCadastro.segmento} onChange={onChange} >
                                    <option value="Recepção">Recepção</option>
                                    <option value="Fotografia">Fotografia</option>
                                    <option value="Filmagem">Filmagem</option>
                                    <option value="Fotografia e Filmagem">Fotografia e Filmagem</option>
                                    <option value="Músico / Banda">Músico / Banda</option>
                                    <option value="Decoração">Decoração</option>
                                    <option value="Cerimonialista">Cerimonialista</option>
                                    <option value="Floricultura">Floricultura</option>
                                    <option value="Bolo de casamento">Bolo de casamento</option>
                                    <option value="Doces">Doces</option>
                                    <option value="Salgados">Salgados</option>
                                    <option value="Buffet">Buffet</option>
                                    <option value="Joalheria">Joalheria</option>
                                    <option value="Roupas">Roupas</option>
                                </select>
                            </div>

                            <label class="form-check-label" for="flexSwitchCheckDefault">É Whatsapp?</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                        name="is_Whatsapp" checked={IsWhatsapp} value="false"
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

                            <div className="col-md-7">
                                <label htmlFor="validationCustom01" className="form-label">Número do CPF*</label>
                                <InputMask className="form-control" id="validationCustom01" required
                                           mask="999.999.999-99" maskChar=" "
                                           name="numeroCPF" value={DadosCadastro.numeroCPF} onChange={onChange}/>
                            </div>

                            <label class="form-check-label" for="flexSwitchCheckDefault">Possui CNPJ?</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                        name="is_CNPJ" checked={IsCNPJ} value={IsCNPJ}
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
                                ?
                                    <>
                                        <div className="col-md-7">
                                            <label for="validationCustom01" className="form-label">Número do CNPJ*</label>
                                            <InputMask className="form-control" id="validationCustom01" required
                                                        mask="99.999.999/9999-99" maskChar=" "
                                                        name="numeroCNPJ" value={DadosCadastro.numeroCNPJ} onChange={onChange} />
                                        </div>
                                    </>
                                :<></>
                            }

                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />

                                    <label className="form-check-label" for="invalidCheck">
                                        Declaro que li e aceito os <a href="/termos-de-uso" target="_blank">termos de uso</a> e as <a href="/regras-sorteio" target="_blank"> regras do sorteio</a>
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
                                <input className="btn btn-primary" type="submit" onClick={validacao} value="Cadastrar" />
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

function validarIgual(){
    let isSenhaIntegra = Utils.verificarIntegridadeSenha(senha1)

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
