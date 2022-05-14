import React, {useContext, useState} from "react";
import api from "../../../../api";
import CarregandoPlaceholder from "../../../../components/Modal/CarregandoPlaceholder";
import UserContext from "../../../../api/userContext-api/userContext";

export default function CardDadosContato(props){
    const [ isCarregando, setIsCarregando ] = useState(false)
    const [ NomeNoiv, setNomeNoiv ] = useState('')
    const [ QtdConvidados, setQtdConvidados ] = useState('')
    const [ DataCasamento, setDataCasamento ] = useState('')
    const { token } = useContext(UserContext)

    let dadosToken = token.split('.')
    let descricao = props.descricaoEmpresa
    let nomeEmpresa = props.nomeEmpresa
    let idProfissional = props.idProfissional
    let idCliente = dadosToken[1]

    function enviarPedidoOrcamento(){
        console.log("IDPROFISSIONAL: " + idProfissional)
        console.log("IDCLIENTE: "+ idCliente)
        if(idCliente != undefined && idProfissional != undefined){

            api.get(`orcamento/solicitacao?idProfissional=${idProfissional}&idCliente=${idCliente}`)
                .then((response) => {
                    console.log("DEu ceerto")
                }).catch((error) => {

            })
        }
    }

    function onChanceData(ev){
        const { value, name } = ev.target
        setDataCasamento(value)
    }

    function onNomeNoiv(ev){
        const { value, name } = ev.target
        setNomeNoiv(value)
    }

    function onQtdConvidados(ev){
        const { value, name } = ev.target
        setQtdConvidados(value)
    }

    return(
        <>
            <div class="card vitrine-informacoes__container" id="pedirOrcamento">
                <h5 class="card-header">Sobre este profissional:</h5>
                <div class="card-body">
                    <label htmlFor="validationCustom01" className="form-label">Descrição da empresa</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                              value={descricao} aria-label="Disabled input example" disabled readOnly/>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Solicitação de orçamento</h5>
                        </div>

                        <div className="modal-body">
                            <label htmlFor="validationCustom01" className="label-pedido-orcamento">Seu nome:</label>
                            <input className="form-control input-pedido-orcamento"
                                   type="text" value={NomeNoiv}
                                   onChange={onNomeNoiv}
                            />

                            <label htmlFor="validationCustom01" className="label-pedido-orcamento">Data do
                                casamento:</label>

                            <div className="">

                            </div>
                            <div className="app-form-control formControl  leadForm__asideFormControl">
                                <div className="formField app-form-field formField--date"
                                     aria-labelledby="main_aside_date">
                                    <i className="svgIcon svgIcon__calendar formField__icon"></i>
                                    <input type="date" name="Fecha"
                                           id="main_aside_date" value=""
                                           placeholder="" autoComplete="off"
                                           className="formField__input app-lead-form-date"
                                    />
                                </div>
                            </div>

                            <label htmlFor="validationCustom01" className="label-pedido-orcamento">Quantidade de
                                convidados:</label>
                            <input className="form-control input-pedido-orcamento"
                                   type="text"
                                   value={QtdConvidados}
                                   onChange={onQtdConvidados}
                            />

                            <label htmlFor="validationCustom01" className="form-label">Sua mensagem ficará
                                assim:</label>

                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      aria-label="Disabled input example" disabled readOnly
                                      value={`Olá ${nomeEmpresa}, me chamo ${NomeNoiv} e gostaria de obter um orçamento para meu casamento previsto para: ${DataCasamento}. Com ${QtdConvidados} convidados`}/>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn color-roxo" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" onClick={enviarPedidoOrcamento}>
                                Pedir orcamento grátis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}