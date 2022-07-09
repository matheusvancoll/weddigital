import React, {useState} from 'react'
import CardPlanos from "../../../CardPlanos";

import Config from '../../../../config.json'

import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";

export default function FormInficacao(props){
    const [ IsCarregando, setIsCarregando ] = useState(false)
    const [ IsTextoCopiado, setIsTextoCopiado ] = useState(false)

    let nivelConta = props.nivelConta
    let dadosProfissional = props.dadosProfissional

    let urlIndicacao = `${Config.api.linkPublico}/empresas/cadastro_${dadosProfissional.idUsuario}_${dadosProfissional.tokenConvite}`

    function copiarCodigo(){

        navigator.clipboard.writeText(urlIndicacao)
            .then(() => {
                setIsTextoCopiado(true)
            })
            .catch(err => {
                setIsTextoCopiado(false)
            })
    }

    return(
        <div>
            {IsCarregando
                ? <CarregandoPlaceholder />
                : <>
                    {nivelConta == 1
                        ? <CardPlanos nivelConta={props.nivelConta} />
                        : <div>
                            {IsTextoCopiado
                                ? <div className="alert alert-success" role="alert">
                                    Link copiado com sucesso!
                                </div>
                                : ''
                            }

                            <h1>Convide parceiros e ganhe pontos para concorrer a R$1.000 todos os meses, confira quantos pontos você pode ganhar: </h1>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput" className="form-label">Envie o link para outros profissionais</label>
                                <input type="text" id="disabledTextInputUrl" className="form-control"
                                       placeholder="Disabled input" value={urlIndicacao} />
                                <br></br>
                                <button type="button" className="btn btn-primary" onClick={copiarCodigo}>
                                    Copiar código <i className="fa-solid fa-copy"></i>
                                </button>

                            </div>
                        </div>
                    }
                </>
            }
        </div>
    )
}