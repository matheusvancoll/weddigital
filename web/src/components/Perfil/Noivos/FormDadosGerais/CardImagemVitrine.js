import React from "react";
import api from "../../../../api";

export default function CardImagemVitrine(props){

    const imagem = require(`../../../../fileContents/imagensVitrineProfissional/${props.imagemCarregada}`)
    let idProfissional = props.idProfissional
    let idImagem = props.idImagem
    let setIsCarregandoDados = props.isCarregando

    function deletarImagem(ev){
        ev.preventDefault()
        setIsCarregandoDados(true)

        api.get(`imagens/deletarImagemVitrine/${idProfissional}?idImagem=${idImagem}`)
            .then((response) => {
                document.location.reload(true);
                setIsCarregandoDados(false)
            }).catch((error) => {
                console.log("Erro ao apagar imagem")
                setIsCarregandoDados(false)
        })
    }


    console.log(props.idImagem)

    return(
        <div className="col">
            <div className="card">
                <img src={imagem} className="card-img-top" alt="..." />
                <button className="icon-delete-imagem fa-solid fa-trash-can" onClick={deletarImagem}></button>
            </div>
        </div>
    )
}