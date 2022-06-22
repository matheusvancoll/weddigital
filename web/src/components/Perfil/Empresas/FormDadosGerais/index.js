import React, {useContext, useEffect, useState} from "react";
import InputMask from 'react-input-mask';
import { useHistory } from "react-router-dom";
import './FormDadosGerais.css'

import api from "../../../../api";
import UserContext from "../../../../api/userContext-api/userContext";

import ErroCarregarDados from "../../../Modal/ErroCarregarDados";
import ErroUploadArquivo from "../../../Modal/ErroUploadArquivo";
import CardImagemVitrine from './CardImagemVitrine'
import ErroLimiteUpload from "../../../Modal/ErroLimiteUpload";

export default function FormDadosGerais(props){
    const { setToken } = useContext(UserContext)
    const history = useHistory()
    const [DadosCadastro, setDadosCadastro] = useState(props.dadosResumoPerfil)
    const [IsErroCadastro, setIsErroCadastro] = useState(false)
    const [IsErroUploadFoto, setIsErroUploadFoto] = useState(false)
    const [IsLimiteUpload, setIsLimiteUpload] = useState(false)

    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsCNPJ, setIsCNPJ] = useState(DadosCadastro.is_CNPJ)
    const [IsWhatsapp, setIsWhatsapp] = useState(DadosCadastro.is_Whatsapp)
    const [IsMaisDeUmEventoPorDia, setIsMaisDeUmEventoPorDia] = useState(DadosCadastro.maisDeUmEventoPorDia)
    const [IsTrabalhaSozinho, setIsTrabalhaSozinho] = useState(DadosCadastro.trabalhaSozinho)

    let idUsuario = props.idUsuario
    let idProfissional = props.idProfissional

    //Carregar upload fotos vitrine
    const [Imagens, setImagens] = useState([])

    useEffect(() => {
        setIsCarregandoDados(true)
        api.get("obterImagensVitrine/"+ idProfissional)
            .then(({data}) => {
                setImagens(data)
                setIsCarregandoDados(false)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }).catch(({error}) => {
            console.log(error)
            setIsCarregandoDados(false)
        })
    }, [])


    let listaImagens = Imagens
    let listaCardImagensVitrine = []

    for (let i = 0; i < listaImagens.length; i++) {
        listaCardImagensVitrine.push(
            <CardImagemVitrine idImagem={listaImagens[i].idImagem}
                               imagemCarregada={listaImagens[i].nomeImagem}
                               idProfissional={idProfissional}
                               isCarregando={setIsCarregandoDados}
            />)
    }

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
        setIsErroCadastro(false)

        api.put('empresa/dadosPerfil/atualizarDados/'+idUsuario, DadosCadastro)
            .then((response) => {
                setIsCarregandoDados(false)
                setToken(response.data)
                history.push('/empresas/perfil')
            }).catch((error) => {
                setIsErroCadastro(true)
                setIsCarregandoDados(false)
                window.scrollTo(0,0)
            })
    }

    function uploadFotoPerfil(ev){
        ev.preventDefault();
        setIsCarregandoDados(true)
        setIsErroUploadFoto(false)

        let arquivoImagem = document.getElementById('inputFotoPerfil').files[0]

        const formData = new FormData();
        formData.append('fotoPerfil', arquivoImagem);

        api.post('dadosPerfil/uploadImagensPerfil/'+ idUsuario + '?fotoPerfil=', formData)
            .then((response) => {
                response == "falha" ? setIsErroUploadFoto(true) : setIsErroUploadFoto(false)
                setIsCarregandoDados(false)
            }).catch((error) => {
                console.log(error)
                setIsCarregandoDados(false)
                setIsErroUploadFoto(true)
        })
    }

    function uploadImagemVitrine(ev){
        ev.preventDefault();
        setIsCarregandoDados(true)
        setIsErroUploadFoto(false)
        setIsLimiteUpload(false)

        let arquivoImagemVitrine = document.getElementById('inputImagemVitrine').files[0]

        const formData = new FormData();
        formData.append('arquivoImagemVitrine', arquivoImagemVitrine);

        api.post('imagens/uploadImagensVitrine/'+ idProfissional + '?arquivoImagemVitrine=', formData)
            .then((response) => {
                console.log("response.data")
                console.log(response)
                response.data == "falha" ? setIsErroUploadFoto(true) : response.data == "limite" ? setIsLimiteUpload(true) : setIsErroUploadFoto(false)
                setIsCarregandoDados(false)
            }).catch((error) => {
            setIsCarregandoDados(false)
            setIsErroUploadFoto(true)
        })
    }


    return(
        <div className="form-dados-derais__container">
            {IsCarregandoDados 
            ? <div className='.container p-4 d-flex justify-content-center'>
                <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Carregando...
                </button>
            </div>
            :
            <>
                {IsErroCadastro 
                ? <ErroCarregarDados /> 
                : ''
                }

                {IsLimiteUpload
                    ? <ErroLimiteUpload />
                    : ''
                }

                {IsErroUploadFoto
                ? <ErroUploadArquivo />
                :''
                }
{/* ==== DADOS GERAIS ==== */}
                <p className="text-center texto-label-titulo">Dados Gerais</p>
                <p className="text-center">É essencial que toda a informação estejam atualizados e sejam verdadeiros.</p>
                <br></br>
                <form className="row g-4 border_custom">

                    <div className="col-md-12">
                        <label htmlFor="validationCustom01" className="form-label">Atualizar foto do perfil (até 1MB)</label>
                        <div className="input-group">
                            <input type="file" className="form-control" id="inputFotoPerfil"
                                   aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            <button className="btn btn-outline-secondary" type="button"
                                    id="inputGroupFileAddon04" onClick={uploadFotoPerfil}>Atualizar
                            </button>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label">Nome da Empresa*</label>
                        <input type="text" className="form-control" id="validationCustom01" required
                                name="nomeEmpresa" value={DadosCadastro.nomeEmpresa} onChange={onChange} />
                    </div>

                    <div class="mb-3">
                        <label for="validationTextarea" class="form-label">Descrição da Empresa</label>
                        <textarea class="form-control" id="validationTextarea" placeholder="Fale aos noivos sobre os seus serviços!" required
                                    name="descricaoEmpresa" value={DadosCadastro.descricaoEmpresa} onChange={onChange}></textarea>
                    </div>

                    <div className="col-md-7">
                        <label htmlFor="validationCustom01" className="form-label">Número do CPF*</label>
                        <InputMask className="form-control" id="validationCustom01" required
                                   mask="99.999.999/9999-99" maskChar=" "
                                   name="numeroCNPJ" value={DadosCadastro.numeroCPF} onChange={onChange}/>
                    </div>

                    <label class="form-check-label" for="flexSwitchCheckDefault">Possui CNPJ?</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                    name="isCNPJ" checked={IsCNPJ} value={IsCNPJ}
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
                                <InputMask className="form-control" id="validationCustom01" required
                                            mask="99.999.999/9999-99" maskChar=" "
                                            name="numeroCNPJ" value={DadosCadastro.numeroCNPJ} onChange={onChange} />
                            </div>
                        </> 
                        :<></>
                        }
                </form>
                
                <div> <br></br> <br></br> </div>

{/* ==== CONTATO ==== */}
                <p className="text-center texto-label-titulo">Contato</p>
                <p className="text-center">É essencial que toda a informação estejam atualizados e sejam verdadeiros.</p>
                <form className="row g-3 border_custom">
                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="validationCustom01" required
                                name="nomeUsuario" value={DadosCadastro.nomeUsuario} onChange={onChange} />
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

                        <div className="col-md-12">
                            <label for="exampleInputEmail1" class="form-label">Email*</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                                    name="email" value={DadosCadastro.email} onChange={onChange}/>
                        </div>
                        
                        <div className="col-md-7">
                            <label for="validationCustom01" className="form-label">Contato*</label>
                            <InputMask className="form-control" id="validationCustom01" required
                                        mask="(99) 99999999" maskChar=" "
                                        name="numeroContato" value={DadosCadastro.numeroContato} onChange={onChange}/>
                        </div>

                        <label class="form-check-label" for="flexSwitchCheckDefault">É Whatsapp?</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                    name="is_Whatsapp" checked={IsWhatsapp}
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
                </form>

{/* ==== FOTOS ==== */}
                <p className="text-center texto-label-titulo">Imagens</p>
                <div className="row g-3 border_custom">
                    <div className="col-md-12">
                        <label htmlFor="validationCustom01" className="form-label">Adicionar nova imagem (até 1MB)</label>
                        <div className="input-group">
                            <input type="file" className="form-control" id="inputImagemVitrine"
                                   aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            <button className="btn btn-outline-secondary" type="button"
                                    id="inputGroupFileAddon04" onClick={uploadImagemVitrine}>Adicionar
                            </button>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {listaCardImagensVitrine.length > 0 ? listaCardImagensVitrine : ''}
                    </div>
                </div>

{/* ==== FAQ ==== */}
                <p className="text-center texto-label-titulo">Perguntas relevantes</p>
                <form className="row g-3 border_custom">
                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label">Valor a partir de</label>
                        <InputMask className="form-control" id="validationCustom01" required
                                        mask="R$ 999999" maskChar=" "
                                        name="valorMinimo" value={DadosCadastro.valorMinimo} onChange={onChange}/>
                    </div>

                    <div class="mb-3">
                        <label for="validationTextarea" class="form-label">Formas de pagamento</label>
                        <textarea class="form-control" id="validationTextarea" placeholder="Informe para seus clientes como eles conseguem te pagar" required
                                    name="formasPagamento" value={DadosCadastro.formasPagamento} onChange={onChange}></textarea>
                    </div>

                    <label class="form-check-label" for="flexSwitchCheckDefault">Sua empresa realiza mais de um evento por dia?</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                name="maisDeUmEventoPorDia" checked={IsMaisDeUmEventoPorDia} value={IsMaisDeUmEventoPorDia}
                                onChange={() =>{
                                    setIsMaisDeUmEventoPorDia(!IsMaisDeUmEventoPorDia)
                                    setDadosCadastro({
                                    ...DadosCadastro, 
                                   maisDeUmEventoPorDia: !IsMaisDeUmEventoPorDia,
                                })
                            }}
                        />
                        <label class="form-check-label" for="flexSwitchCheckDefault">{IsMaisDeUmEventoPorDia ? "Sim" : "Não"}</label>
                        </div>

                    <label class="form-check-label" for="flexSwitchCheckDefault">Você trabalha sozinho(a)?</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                name="trabalhaSozinho" checked={IsTrabalhaSozinho} value={IsTrabalhaSozinho}
                                onChange={() =>{
                                    setIsTrabalhaSozinho(!IsTrabalhaSozinho)
                                    setDadosCadastro({
                                    ...DadosCadastro, 
                                    trabalhaSozinho: !IsTrabalhaSozinho,
                                })
                            }}
                        />
                        <label class="form-check-label" for="flexSwitchCheckDefault">{IsTrabalhaSozinho ? "Sim" : "Não"}</label>
                    </div>
                </form>

                <div className="space-vertical"></div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={onSubmit}>Atualizar Dados</button>
                </div>

                <div className="space-vertical"></div>

            </>
            }
        </div>
    )
}