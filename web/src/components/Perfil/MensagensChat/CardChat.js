import React, {useEffect, useState} from 'react'
import './Chat.css'

import MensagemItem from "./MensagemItem";
import api from "../../../api";
import CarregandoPlaceholder from "../../Modal/CarregandoPlaceholder";

export default function CardChat(props){
    const [ConteudoMensagem, setConteudoMensagem] = useState([])
    const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState(true)
    const [IsCarregandoPlaceholder, setIsCarregandoPlaceholder] = useState(true)

    let dataCasamento = props.dadosConversa.dataCasamento
    let isProfissional = props.isProfissional ? props.isProfissional : true

    let idProfissional = props.dadosConversa.idProfissional
    let idCliente = props.dadosConversa.idCliente

    if(props.teste){
        props.alterar(false)
        carregarDados()
    }

    function carregarDados(){
        api.get(`mensagens/listarConteudoMensagem?idProfissional=${idProfissional}&idCliente=${idCliente}`)
            .then(({data}) => {
                setConteudoMensagem(data)
                console.log("MENSANEOE")
                console.log(ConteudoMensagem)
                setIsCarregandoPlaceholder(false)
                //eslint-disable-next-line react-hooks/exhaustive-deps
            }).catch(({error}) => {
            console.log(error)
            setIsCarregandoPlaceholder(false)
        })
    }

    let listaConteudoMensagens = []

    let image =  props.dadosConversa.fotoPerfil ? props.dadosConversa.fotoPerfil : 'avatar.jpg'
    const imagePerfilChat = require(`../../../fileContents/imagensPerfil/${image}`)

    for (let i = 0; i < ConteudoMensagem.length; i++) {
        listaConteudoMensagens.push(
            <MensagemItem
                conteudoMensagem={ConteudoMensagem[i].corpoMensagem}
                myselfSend={ConteudoMensagem[i].enviadoPorProfissional == isProfissional} />
        )
    }


    return(
        <div>
            { IsCarregandoPlaceholder
                ? <div className='chat__container_box'>
                    <CarregandoPlaceholder />
                </div>
                : <div className="chat">
                    <div className="chat-header clearfix">
                        <div className="row">
                            <div className="col-lg-6">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img src={imagePerfilChat} alt="avatar" />
                                </a>

                                <div className="chat-about">
                                    <h6 className="m-b-0">{props.nomeChatAtual}</h6>
                                    {dataCasamento
                                        ? <small>Vai casar em: {props.dataCasamento}</small>
                                        : ''
                                    }
                                </div>
                            </div>

                            <div className="col-lg-6 hidden-sm text-right">
                                <a href="javascript:void(0);" className="btn btn-outline-info">
                                    <i className="fa fa-cogs"></i>
                                </a>

                                <a href="javascript:void(0);" className="btn btn-outline-warning">
                                    <i className="fa fa-question"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="chat-history">
                        <ul className="m-b-0">
                            {listaConteudoMensagens}
                        </ul>
                    </div>
                    <div className="chat-message clearfix">
                        <div className="input-group mb-0">
                            <input type="text" className="form-control" placeholder="Enter text here..." />
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-send"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )

}