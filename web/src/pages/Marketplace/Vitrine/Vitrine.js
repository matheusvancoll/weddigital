import React from "react";
import './Vitrine.css'

import Navbar from "../../../components/Navbar";

import FotosVitrine from "./FotosVitrine";
import CardDadosContato from "./CardDadosContato";

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

            <div className="fotos-dados-container">
                <FotosVitrine />
                <CardDadosContato />
            </div>

            <div className="empresa-dados-container">
                <CardDadosContato />
            </div>


        </>
    )
}