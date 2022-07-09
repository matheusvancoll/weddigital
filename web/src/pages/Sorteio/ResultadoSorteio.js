import React, {useState} from "react";
import './Sorteio.css'
import api from "../../api";

export default function ResultadoSorteio(props){
    const [ IsCarregandoDados, setIsCarregandoDados ] = useState(false)
    const [ DadosSorteio, setDadosSorteio ] = useState([])
    const [ IsSorteioRealizado, setIsSorteioRealizado ] = useState(false)

    let tipoSorteio = props.tipoSorteio
    function sortear(){
        setIsCarregandoDados(true)
        setIsSorteioRealizado(false)

        api.get(`pontuacao/sorteio${tipoSorteio}/gerar`)
            .then((response) => {
                setIsSorteioRealizado(true)
                setDadosSorteio(response.data)
                setIsCarregandoDados(false)
            }).catch((error) => {
                setIsSorteioRealizado(false)
                setIsCarregandoDados(false)
                setDadosSorteio([])
        })
    }

    let nomeArquivoPerfil = DadosSorteio.imagemPefil ? DadosSorteio.imagemPefil : 'avatar.jpg'
    const fotoPerfil = require(`../../fileContents/imagensPerfil/${nomeArquivoPerfil}`)

    return(
        <div>
            {IsCarregandoDados
                ? <div className='gerandoGanhador__container'>
                    <button className="btn btn-danger" type="button" disabled>
                        <span className="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>
                        Gerando um ganhador...
                    </button>
                </div>
                : <div className='confirmacaoSorteio__container'>
                    {DadosSorteio != [] && IsSorteioRealizado
                        ?
                            <div className='resultadoSorteio_container'>
                                <h1 className='resultadoSorteio_titulo'>Ganhador(a)</h1>
                                <img src={fotoPerfil} alt="imagem ganhador" className='resultadoSorteio_imagem'/>
                                <h3 className='resultadoSorteio_nomeGanhador'>{DadosSorteio.nomeGanhador}</h3>
                                <h3 className='resultadoSorteio_horaSorteio'>Sorteado em: {DadosSorteio.dataHoraSorteio}</h3>
                                <h3 className='resultadoSorteio_pontosAcumulados'>Pontos acumuldaos: {DadosSorteio.pontosAcumulados}</h3>
                                <h3 className='resultadoSorteio_dtCriacao'>Conta criada em: {DadosSorteio.dataCriacao}</h3>
                                {DadosSorteio.noivos
                                    ? <h3 className='resultadoSorteio_nomeConjugue'>Nome do conjugue: {DadosSorteio.nomeConjuge ? DadosSorteio.nomeConjuge : 'N/D'}</h3>
                                    : ''
                                }
                            </div>
                        : <div className='selecaoSorteio__opcoes'>
                            <button onClick={sortear}>Sortear</button>
                        </div>
                    }
                    <button className='btnVoltarSelecaoSorteio' onClick={() => props.setBtnVoltar("")}>Voltar</button>
                </div>
            }
        </div>
    )
}