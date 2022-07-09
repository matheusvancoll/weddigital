import React, {useState} from "react";
import './Sorteio.css'

import ResultadoSorteio from './ResultadoSorteio'

export default function SelecaoSorteio(){
    const [ TipoSorteio, setTipoSorteio ] = useState('')

    return(
        <div>
            {TipoSorteio == ''
                ?<div className="selecaoSorteio__container">
                    <div>
                        <h1 className='titulo-sorteio-label'>SORTEAR</h1>
                    </div>

                    <div className='selecaoSorteio__opcoes'>
                        <button onClick={() => setTipoSorteio("Profissional")}>PROFISSIONAL</button>
                        <button onClick={() => setTipoSorteio("Noivos")}>NOIVO(A)</button>
                    </div>
                </div>
                : <ResultadoSorteio tipoSorteio={TipoSorteio} setBtnVoltar={setTipoSorteio} />
            }
        </div>
    )
}