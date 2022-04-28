import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../../api";
import UserContext from "../../../../api/userContext-api/userContext";

export default function FormDadosGerais(props){
    const history = useHistory()
    const { token, setToken } = useContext(UserContext)
    const [DadosCadastro, setDadosCadastro] = useState(props.dadosResumoPerfil)
    const [IsErroCadastro, setIsErroCadastro] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)
    const [IsWhatsapp, setIsWhatsapp] = useState(DadosCadastro.is_Whatsapp)
    const [IsCNPJ, setIsCNPJ] = useState(DadosCadastro.is_CNPJ)
    
    console.log("FormDadosGerais")
    console.log(DadosCadastro)

    let idUsuario = props.idUsuario

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

        api.put('dadosPerfil/atualizarDados/'+idUsuario, DadosCadastro)
            .then((response) => {
                setIsCarregandoDados(false)
                setToken(response.data)
                history.push('/empresa/perfil')
            }).catch((error) => {
                setIsErroCadastro(true)
                setIsCarregandoDados(false)
                window.scrollTo(0,0)
            })
    }
    return(
        <>
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
                ? <div class="alert alert-danger text-center" role="alert">
                    Oooops! Parece que algo não saiu como o planejado :(
                        <br></br> 
                        Por favor, tente novamente
                </div> 
                : ''
                }

                <p className="text-center texto-label-titulo">Dados Gerais</p>
                <p className="text-center">É essencial que toda a informação estejam atualizados e sejam verdadeiros.</p>
                
                <form className="row g-3 needs-validation cadastro-usuario-form">
                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label">Nome da Empresa*</label>
                        <input type="text" className="form-control" id="validationCustom01" required
                                name="nomeEmpresa" value={DadosCadastro.nomeEmpresa} onChange={onChange} />
                    </div>

                    <div class="mb-3">
                        <label for="validationTextarea" class="form-label">Descrição da Empresa</label>
                        <textarea class="form-control" id="validationTextarea" placeholder="Informe para seus visitantes o que você pode oferecer!" required
                                    name="descricaoEmpresa" value={DadosCadastro.descricaoEmpresa} onChange={onChange}></textarea>
                        <div class="invalid-feedback">
                            Please enter a message in the textarea.
                        </div>
                    </div>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Possui CNPJ?</label>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                    name="isNoivos" checked={IsCNPJ} value={IsCNPJ}
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
                </form>
                
                <div>
                    <br></br>
                    <br></br>
                </div>
                
                <p className="text-center texto-label-titulo">Contato</p>
                <p className="text-center">É essencial que toda a informação estejam atualizados e sejam verdadeiros.</p>
                <form className="row g-3 needs-validation cadastro-usuario-form">
                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="validationCustom01" required
                                name="nome" value={DadosCadastro.nome} onChange={onChange} />
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
                                <option selected disabled value="..">Selecione</option>
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

                        <div className="col-md-12">
                            <label for="exampleInputEmail1" class="form-label">Email*</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                                    name="email" value={DadosCadastro.email} onChange={onChange}/>
                        </div>
                        
                        <div className="col-md-7">
                            <label for="validationCustom01" className="form-label">Contato*</label>
                            <input type="text" className="form-control" id="validationCustom01" required
                                    name="numeroContato" value={DadosCadastro.numeroContato} onChange={onChange} />
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

                        
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit" onClick={onSubmit}>Atualizar Dados</button>
                    </div>
                </form>

                <br></br>
                <br></br>
                
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Dados da empresa
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            {/*  */}
                            <form className="row g-3 needs-validation">
                                <div className="col-md-12">
                                    <label for="validationCustom01" className="form-label">Nome da Empresa*</label>
                                    <input type="text" className="form-control" id="validationCustom01" required
                                            name="nomeEmpresa" value={DadosCadastro.nomeEmpresa} onChange={onChange} />
                                </div>

                                <div class="mb-3">
                                    <label for="validationTextarea" class="form-label">Descrição da Empresa</label>
                                    <textarea class="form-control" id="validationTextarea" placeholder="Informe para seus visitantes o que você pode oferecer!" required
                                                name="descricaoEmpresa" value={DadosCadastro.descricaoEmpresa} onChange={onChange}></textarea>
                                    <div class="invalid-feedback">
                                        Please enter a message in the textarea.
                                    </div>
                                </div>
                                <label class="form-check-label" for="flexSwitchCheckDefault">Possui CNPJ?</label>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultLogin"
                                                name="isNoivos" checked={IsCNPJ} value={IsCNPJ}
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
                            </form>
                            {/*  */}
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>


























            </> 
            }
        </>
    )
}