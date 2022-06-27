import React, {useEffect, useState} from 'react'
import './Chat.css'

import api from "../../../api";
import Model from '../../../utils/MensagensModel'

import MensagemItem from "./MensagemItem";
import CarregandoPlaceholder from "../../Modal/CarregandoPlaceholder";

export default function CardChat(props){
    const [ConteudoMensagem, setConteudoMensagem] = useState([])
    const [IsCarregandoPlaceholder, setIsCarregandoPlaceholder] = useState(false)
    const [MensagemEnvio, setMensagemEnvio] = useState(Model.ChatMensagem)

    let nomeContato = props.dadosConversa.nomeContato
    let dataCasamento = props.dadosConversa.dataCasamento
    let isProfissional = props.isProfissional
    let idProfissional = props.dadosConversa.idProfissional
    let idCliente = props.dadosConversa.idCliente

    if(props.isAlterado){
        props.setAlterado(false)
        carregarMensagens()
    }

    function carregarMensagens(){
        api.get(`mensagens/listarConteudoMensagem?idProfissional=${idProfissional}&idCliente=${idCliente}`)
            .then(({data}) => {
                setConteudoMensagem(data)
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



    function onChange(ev){
        ev.preventDefault()
        const { value, name } = ev.target
        setMensagemEnvio({
            ...MensagemEnvio,
            [name]: value,
            idProfissional: idProfissional,
            idCliente: idCliente
        })
    }


    function enviarMensagem(){

        let campoCorpoMensagem = document.getElementById('campoCorpoMensagem')

        api.post(`mensagens/enviarMensagem?enviadoPorProfissional=${isProfissional}`, MensagemEnvio)
            .then((response) => {
                campoCorpoMensagem.value = ''
                carregarMensagens()
            }).catch((error) => {
                console.log(error)
        })
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
                                    <h6 className="m-b-0">{nomeContato}</h6>
                                    {dataCasamento
                                        ? <small>Vai casar em: {dataCasamento}</small>
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
                            <input type="text" className="form-control" id="campoCorpoMensagem" name='corpoMensagem' placeholder="Enter text here..." onChange={onChange} />
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="btnEnvioMensagemChat"><i className="fa fa-send" onClick={enviarMensagem}></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}