import React, {useState} from "react";
import './FormDadosCasamento.css'

import api from "../../../../api";

import ErroCarregarDados from "../../../Modal/ErroCarregarDados";
import ErroUploadArquivo from "../../../Modal/ErroUploadArquivo";
import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";
import {useHistory} from "react-router-dom";


export default function FormDadosGerais(props){
    const history = useHistory()

    const [DadosCadastro, setDadosCadastro] = useState(props.dadosResumoPerfil)
    const [IsErroCadastro, setIsErroCadastro] = useState(false)
    const [IsErroUploadFoto, setIsErroUploadFoto] = useState(false)
    const [IsCarregandoDados, setIsCarregandoDados] = useState(false)

    let idUsuario = props.idUsuario
    let idNoivos = props.idNoivos

    let dataCasamentoSplit = DadosCadastro.dataCasamento.split('/')
    let dataFormatada = `${dataCasamentoSplit[2]}-${dataCasamentoSplit[1]}-${dataCasamentoSplit[0]}`;

    function formatarDataCasamento(ev){
        const { value, name } = ev.target
        let data = value.split('-')
        let dataCasamentoFormatada = `${data[2]}/${data[1]}/${data[0]}`

        setDadosCadastro({
            ...DadosCadastro,
            dataCasamento: dataCasamentoFormatada,
        })

        dataFormatada = value
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

        api.put(`noivos/dadosPerfil/atualizarDados/?idUsuario=${idUsuario}&idNoivos=${idNoivos}`, DadosCadastro)
            .then((response) => {
                setIsCarregandoDados(false)
                history.push('/perfil')
            }).catch((error) => {
                setIsErroCadastro(true)
                setIsCarregandoDados(false)
                window.scrollTo(0,0)
            })
    }

    function uploadFotoPerfil(ev){
        ev.preventDefault()
        setIsCarregandoDados(true)
        setIsErroUploadFoto(false)

        let arquivoImagem = document.getElementById('inputFotoPerfil').files[0]

        const formData = new FormData()
        formData.append('fotoPerfil', arquivoImagem)

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


    return(
        <div className="form-dados-derais__container">
            <div className="container-sm cadastro-usuario-container">
                {IsErroCadastro ? <ErroCarregarDados /> : '' }
                {IsErroUploadFoto ? <ErroUploadArquivo /> : '' }
                {IsCarregandoDados
                    ? <CarregandoPlaceholder/>
                    :
                        <>
                            <p className="text-center texto-label-titulo">Dados Gerais</p>
                            <p className="text-center">É essencial que toda a informação estejam atualizados e sejam verdadeiros.</p>
                            <br></br>
                            <form className="row g-3 needs-validation cadastro-usuario-form">
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
                                <div className="col-md-7">
                                    <label htmlFor="validationCustom01" className="form-label">Nome completo*</label>
                                    <input type="text" className="form-control" id="inputNomeUsuarioValidacao"
                                           name="nomeUsuario" value={DadosCadastro.nomeUsuario} onChange={onChange}
                                           required/>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email*</label>
                                    <input type="email" className="form-control" id="inputEmailValidacao"
                                           autoComplete="off" aria-describedby="emailHelp" disabled
                                           name="email" value={DadosCadastro.email}/>
                                </div>

                                <div className="col-md-7">
                                    <label htmlFor="validationCustom01" className="form-label">Cidade*</label>
                                    <input type="text" className="form-control" id="validationCustom01" required
                                           name="cidade" value={DadosCadastro.cidade} onChange={onChange}/>
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="validationCustom04" className="form-label">Estado*</label>
                                    <select className="form-select" id="validationCustom04" required
                                            name="estado" value={DadosCadastro.estado} onChange={onChange}>
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
                                        <input type="date" autoComplete="off" id="dataCasamento" value={dataFormatada} onChange={formatarDataCasamento} required />
                                    </div>
                                </div>
                            </form>
                        </>
                }
                <div className="space-vertical"></div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit" onClick={onSubmit}>Atualizar Dados</button>
                </div>

                <div className="space-vertical"></div>
                <div className="space-vertical"></div>
            </div>
        </div>
    )
}