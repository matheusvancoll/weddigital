import React, {useEffect, useState} from "react";
import Helmet from 'react-helmet'
import './FormOrcamento.css'

import Cardcontato from "../../MensagensChat/Cardcontato";
import api from "../../../../api";

import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";
import CardChat from "../../MensagensChat/CardChat";

export default function FormOrcamentos(props){
    const [IsCarregando, setIsCarregando] = useState(true)
    const [DadosMensagem, setDadosMensagem] = useState([])
    const [IdContatoAtivo, setIdContatoAtivo] = useState(0)
    const [IsAlterado, setIsAlterado] = useState(true)

    let idCliente = props.dadosResumoPerfil.idUsuario

    useEffect(() => {
        api.get(`mensagens/cliente/listarConversas/${idCliente}`)
            .then(({data}) => {
                setDadosMensagem(data)
                setIsCarregando(false)
                //eslint-disable-next-line react-hooks/exhaustive-deps
            }).catch(({error}) => {
            console.log(error)
            setIsCarregando(false)
        })
    }, [])

    let listaCardMensagens = []

    for (let i = 0; i < DadosMensagem.length; i++) {
        let image =  DadosMensagem[i].fotoPerfil ? DadosMensagem[i].fotoPerfil : 'avatar.jpg'
        const imagePerfilChat = require(`../../../../fileContents/imagensPerfil/${image}`)

        listaCardMensagens.push(
            <Cardcontato
                idItem={i}
                isAltaredo={setIsAlterado}
                setContatoAtivo={setIdContatoAtivo}
                nome={DadosMensagem[i].nomeContato}
                fotoPerfil={imagePerfilChat}
                isOnline={true}
                isActive={i == IdContatoAtivo ? true : false}
            />
        )
    }

    return(
        <div>
            <header className="App-header">
                {/*<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>*/}
                {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>*/}
                {/*<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />*/}
            </header>
            <Helmet>
                <title>Orçamentos - WedDigital</title>
            </Helmet>

            {IsCarregando
                ? <CarregandoPlaceholder />
                : <div className="chat-orcamentos__container">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="card chat-app">
                                <div id="plist" className="people-list">

                                    {listaCardMensagens.length > 0
                                        ? <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search..." />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                                            </div>
                                        </div>
                                        :''
                                    }

                                    {/* LISTA PESSOAS */}
                                    <ul className="list-unstyled chat-list mt-2 mb-0">
                                        {listaCardMensagens.length > 0
                                            ? listaCardMensagens
                                            :'Não há nenhuma solicitação de orçamento no momento'
                                        }
                                    </ul>
                                </div>
                                {listaCardMensagens.length > 0
                                    ? <CardChat
                                        isAlterado={IsAlterado}
                                        setAlterado={setIsAlterado}
                                        dadosConversa={DadosMensagem[IdContatoAtivo]}
                                        isProfissional={false} />
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}