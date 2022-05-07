import React, { useState } from "react";
import InputMask from 'react-input-mask';
import VitrineModel from "../../../../utils/VitrineModel";

export default function CardDadosContato(props){
    const [ NomeNoiv, setNomeNoiv ] = useState('')
    const [ QtdConvidados, setQtdConvidados ] = useState('')
    const [ DataCasamento, setDataCasamento ] = useState('')

    let numero = props.numeroContato
    let email = props.emailContato
    let descricao = props.descricaoEmpresa
    let nomeEmpresa = props.nomeEmpresa


    function enviarPedidoOrcamento(){
        
        console.log("TESTE SLOJD")
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
                    <label for="validationCustom01" className="form-label">Contato</label>
                    <input class="form-control" type="text" value={numero} aria-label="Disabled input example" disabled readonly />
                    <br></br>
                    
                    <label for="validationCustom01" className="form-label">Email</label>
                    <input class="form-control" type="email" value={email} aria-label="Disabled input example" disabled readonly />
                    <br></br>

                    <label for="validationCustom01" className="form-label">Descrição da empresa</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"
                    value={descricao} aria-label="Disabled input example" disabled readonly />
                    <br></br>

                    <div>
                        <button type="button" class="btn color-roxo" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Pedir orcamento grátis
                        </button>
                    </div>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Solicitação de orçamento</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                
                                <div class="modal-body">
                                    <label for="validationCustom01" className="label-pedido-orcamento">Seu nome:</label>
                                    <input class="form-control input-pedido-orcamento" 
                                            type="text"
                                            value={NomeNoiv}
                                            onChange={onNomeNoiv}
                                            />
                                    
                                    <label for="validationCustom01" className="label-pedido-orcamento">Data do casamento:</label>
                                    <InputMask className="form-control" id="validationCustom01" required
                                        mask="99/99/9999" maskChar=" "
                                        name="numeroContato"
                                        value={DataCasamento}
                                        onChange={onChanceData}
                                        />
                                        
                                    <label for="validationCustom01" className="label-pedido-orcamento">Quantidade de convidados:</label>
                                    <input class="form-control input-pedido-orcamento" 
                                            type="text"
                                            value={QtdConvidados}
                                            onChange={onQtdConvidados}
                                            />

                                    <label for="validationCustom01" className="form-label">Sua mensagem ficará assim:</label>
                                    
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" aria-label="Disabled input example" disabled readonly
                                    value={`Olá ${nomeEmpresa}, me chamo ${NomeNoiv} e gostaria de obter um orçamento para meu casamento previsto para: ${DataCasamento}. Com ${QtdConvidados} convidados`} />

                                </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn color-roxo" onClick={enviarPedidoOrcamento}>Solicitar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}