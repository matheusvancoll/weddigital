import React from "react";
import Helmet from 'react-helmet'
import './FormOrcamento.css'
import Cardcontato from "./Cardcontato";
import CardChat from "./CardChat";

export default function FormOrcamentos(){
    return(
        <div>
            <header className="App-header">
                <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            </header>
            <Helmet>
                <title>Sobre - React Router com Helmet</title>
            </Helmet>

            <div className="chat-orcamentos__container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <div id="plist" className="people-list">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search..." />
                                </div>

                                {/* LISTA PESSOAS */}
                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                    {/* PESSOA ITEM */}
                                    <Cardcontato nome="Adilson Guedes" fotoPerfil="https://bootdey.com/img/Content/avatar/avatar1.png" isOnline={true} isActive={false} />
                                    <Cardcontato nome="Aiden Chavez" fotoPerfil="https://bootdey.com/img/Content/avatar/avatar2.png" isOnline={false} isActive={true} />
                                    <Cardcontato nome="Mike Thomas" fotoPerfil="https://bootdey.com/img/Content/avatar/avatar3.png" isOnline={true} isActive={false} />
                                    <Cardcontato nome="Christian Kelly" fotoPerfil="https://bootdey.com/img/Content/avatar/avatar7.png" isOnline={false} isActive={false} />
                                    <Cardcontato nome="Monica Ward" fotoPerfil="https://bootdey.com/img/Content/avatar/avatar8.png" isOnline={true} isActive={false} />
                                    <Cardcontato nome="Dean Henry" fotoPerfil="https://bootdey.com/img/Content/avatar/avatar3.png" isOnline={false} isActive={false} />
                                </ul>
                            </div>
                            <CardChat nomeChatAtual="Jonicleidson Fagundes" listaMensagens={""} dataCasamento={"15/11/2022"}
                                      fotoPerfil={"https://bootdey.com/img/Content/avatar/avatar2.png"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}