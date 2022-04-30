import React, { useState } from "react";

import CardDepeimento from './Depoimento'

export default function CardDadosContato(){
    const [ isPedirOrcamento, setIsPedirOrcamento ] = useState(true)

    return(
        <>
            <div class="card vitrine-opinioes__container">
                <h5 class="card-header">Opinioes sobre este profissional: </h5>

                <CardDepeimento nome={'Katrina Melo'} dataCasamento={'12/12/2021'}
                                casamentoBemSucedido={true} nota={'4.7'}
                                depoimento={'Profissionalismo de ponta'}/>
                
                <CardDepeimento nome={'Camila Pietro'} dataCasamento={'05/05/2018'}
                                casamentoBemSucedido={true} nota={'5'}
                                depoimento={'Muito top'}/>

                <CardDepeimento nome={'Millena Pereira'} dataCasamento={'01/01/2022'}
                                casamentoBemSucedido={false} nota={'1.4'}
                                depoimento={'Um desastre'}/>             
            </div>
        </>
    )
}