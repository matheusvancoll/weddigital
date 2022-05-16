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
    let idProfissionalReq = props.idProfissional
    let idClienteReq = dadosToken[1]

    function enviarPedidoOrcamento(){
        let corpoMensagemReq = document.getElementById('exampleFormControlTextareaCorpoMensagem').value
         const dadosPedidoOrcamento = {
            idProfissional: idProfissionalReq,
            idCliente: idClienteReq,
            corpoMensagem: corpoMensagemReq
         }

        console.log(dadosPedidoOrcamento)

        if(idClienteReq != undefined && idProfissionalReq != undefined){
            api.post('orcamento/solicitacao', dadosPedidoOrcamento)
                .then((response) => {
                    console.log("DEu ceerto")
                }).catch((error) => {

            })
        }
    }

    function onChanceData(ev){
        const { value, name } = ev.target
        let data = value.split('-')
        let dataFormatada = `${data[2]}/${data[1]}/${data[0]}`
        setDataCasamento(dataFormatada)
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

                            <label htmlFor="validationCustom01" className="label-pedido-orcamento">Data do casamento:</label>

                            <div>
                                <input type="date" autoComplete="off" id="dateCasamentoPedido" onChange={onChanceData} />
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

                            <textarea className="form-control" id="exampleFormControlTextareaCorpoMensagem" rows="3"
                                      aria-label="Disabled input example" disabled readOnly
                                      value={`Olá ${nomeEmpresa}, me chamo ${NomeNoiv} e gostaria de obter um orçamento para meu casamento previsto para: ${DataCasamento}. Com ${QtdConvidados} convidados`}/>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn color-roxo"
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