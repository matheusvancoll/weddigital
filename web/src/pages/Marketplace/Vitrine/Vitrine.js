import React from "react";
import './Vitrine.css'

import Navbar from "../../../components/Navbar";

import FotosVitrine from "./FotosVitrine/FotosVitrine";
import CardDadosContato from "./InformacoesProfissional/CardDadosContato";
import PrincipaisPerguntas from './InformacoesProfissional/CardPrincipaisPerguntas'
import CardDepoimentos from './DepoimentosSobreProfissional/CardOpinioes'

export default function Vitrine(){
    return(
        <>
            <Navbar />

            <div className="container-sm p-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Início</a></li>
                        <li class="breadcrumb-item"><a href="buscar-profissionais">Busca</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Perfil</li>
                    </ol>
                </nav>
            </div>

            <div className="container-sm">
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>

            <div className="vitrine-page__container">
                <div className="container text_nome_empresa">
                    <h1>Nome da Empresa 
                        <a href="#pedirOrcamento" className="link-pedir-orcamento">
                            <span class="badge bg color-roxo">Pedir Orçamento</span>
                        </a>
                    </h1>
                    <h6>Casamentos bem sucedidos: <span class="badge color-roxo">14</span></h6>
                    <h6>Classificação geral: <span class="badge color-roxo">4.7</span></h6>
                </div>

                <div className="vitrine01-principal">
                    <div className="fotos__vitrine">
                        <FotosVitrine />
                    </div>

                    <div className="contato__vitrine">
                        <CardDadosContato />
                    </div>
                </div>
                
                <div className="vitrine02-complementares">
                    <PrincipaisPerguntas />
                    <CardDepoimentos />
                </div>
            </div>

            <div className="vitrine-button-voltar">
                    <a href="/">Voltar</a>
            </div>
        </>
    )
}