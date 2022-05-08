import React, { useEffect, useState } from "react";
import './Vitrine.css'

import api from '../../../api'
import VitrineModel from "../../../utils/VitrineModel";
import Navbar from "../../../components/Navbar";


import FotosVitrine from "./FotosVitrine/FotosVitrine";
import CardDadosContato from "./InformacoesProfissional/CardDadosContato";
import PrincipaisPerguntas from './InformacoesProfissional/CardPrincipaisPerguntas'
import CardDepoimentos from './DepoimentosSobreProfissional/CardOpinioes'
import CarregandoPlaceholder from "../../../components/Modal/CarregandoPlaceholder";

export default function Vitrine(){
    const [ DadosVitrine, setDadosVitrine ] = useState(VitrineModel.dadosVitrineDTO)
    const [ IsCarregando, setIsCarregando ] = useState(true)

    let urlParam = window.location.href.split('=')
    let idProfissionalURL = null;
    
    if(urlParam.length > 1){
        idProfissionalURL = urlParam[1]
    }

    useEffect(() => {
        api.get(`detalhesProfissional/${idProfissionalURL}`)
        .then(({data}) => {
            setDadosVitrine(data)
            setIsCarregando(false)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        }).catch(({error}) => {
            setIsCarregando(false)
        })
    }, [])

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

            {IsCarregando 
            ? <div className='.container p-4 d-flex justify-content-center'>
                <CarregandoPlaceholder />
            </div> 
            : <div className="vitrine-page__container">
                <div className="container text_nome_empresa">
                    <h1>{DadosVitrine.nomeEmpresa}
                        <a href="#pedirOrcamento" className="link-pedir-orcamento">
                            <span class="badge bg color-roxo">Pedir Orçamento</span>
                        </a>
                    </h1>
                    <h6>Casamentos bem sucedidos: <span class="badge color-roxo">{DadosVitrine.casamentosBemSucedidos}</span></h6>
                    <h6>Classificação geral: <span class="badge color-roxo">{DadosVitrine.classificacaoProfissional ? DadosVitrine.classificacaoProfissional : "N/D"}</span></h6>
                </div>

                <div className="vitrine01-principal">
                    <div className="fotos__vitrine">
                        <FotosVitrine />
                    </div>

                    <div className="contato__vitrine">
                        <CardDadosContato  
                            numeroContato={DadosVitrine.numeroContato}
                            emailContato={DadosVitrine.emailContato}
                            descricaoEmpresa={DadosVitrine.descricaoEmpresa}
                            nomeEmpresa={DadosVitrine.nomeEmpresa}
                        />
                    </div>
                </div>
            
                <div className="vitrine02-complementares">
                    <PrincipaisPerguntas 
                        valorMinimo={DadosVitrine.valorMinimo} 
                        formasPagamento={DadosVitrine.formasPagamento}
                        maisDeUmDia={DadosVitrine.realizaMaisDeUmEventoPorDia} 
                        trabalhaSozinho={DadosVitrine.trabalhaSozinho} 
                    />
                                        
                    <CardDepoimentos />
                </div>
            </div>
            }

            <div className="vitrine-button-voltar">
                    <a href="/buscar-profissional">Voltar</a>
            </div>
        </>
    )
}