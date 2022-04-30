import React from "react";

import Imagem1 from '../../../../assets/crs1.jpeg'
import Imagem2 from '../../../../assets/crs2.jpeg'
import Imagem3 from '../../../../assets/crs3.jpeg'

export default function FotosVitrine(){

    return(
        <>
            <div className="vitrine-fotos__container">
                <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                        <img src={Imagem1} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item" data-bs-interval="10000">
                        <img src={Imagem2} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                        <img src={Imagem3} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button"         data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Próxima</span>
                    </button>
                </div>
            </div>
        </>
    )
}