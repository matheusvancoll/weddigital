import React from "react";

export default function ErroUploadArquivo(){
    return(
        <div class="container-sm alert alert-danger text-center w-100" role="alert">
            Não conseguimos processar sua imagem :(
            <br></br>
            A imagem deve ser menos que 1MB
            <br></br>
            Nos formatos: .png, .jpg ou .jpeg
            <br></br>
            Por favor, tente novamente
        </div>
    )
}