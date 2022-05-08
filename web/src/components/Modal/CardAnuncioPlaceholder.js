import React from "react";

export default function CardAnuncioPlaceholder(){
    return(
    <div class="card placeholder_container" aria-hidden="true">
        <div src='...' class="card-img-top placeholder-img-div
placeholder-img-div" alt="..." />
            <div class="card-body">
                <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                </p>
                <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
            </div>
        </div>
    )
}