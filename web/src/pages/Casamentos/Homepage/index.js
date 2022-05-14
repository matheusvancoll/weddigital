import React from 'react'
import './Homepage-Noivos.css'

import Navbar from '../../../components/Navbar'
import CardIconsServicosCasamento from '../../../components/Homepage/CardIconsServicosCasamento'

import IconBusca  from '../../../assets/icons/pesquisa.png'
import IconAssistindo  from '../../../assets/icons/assistindo.png'
import IconDinheiro  from '../../../assets/icons/pagamento.png'
import IconPlanejamento  from '../../../assets/icons/planejamento.png'
import IconInspiracoes  from '../../../assets/icons/luminaria.png'
import IconComunidade  from '../../../assets/icons/comunidade.png'
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div className=''>
            <Navbar />

            <div className='home-noivos__container'>
                <div className='home-noivos_area1' id='inicio'>
                    <div className='area1-text-title'>
                        <h1 className='text-roxo area1-text-h1'>Contrate os melhores profissionais para o seu casamento.</h1>
                    </div>

                    <div className='area1-search'>
                        <div className='area1-description'>
                            <h4 className='text-roxo area1-description-h4'>Concorra a R$ 1.000 e aprenda tudo sobre o seu casamento com fornecedores de forma rápida e segura</h4>
                            <Link to='/buscar-profissional' className='teste'>LOCALIZAR FORNECEDORES</Link>
                        </div>
                    </div>

                    <div className='area1-icons'>
                        <CardIconsServicosCasamento image={IconBusca} texto='Buscar fornecedores' />
                        <CardIconsServicosCasamento image={IconAssistindo} texto='Assista aulas' />
                        <CardIconsServicosCasamento image={IconDinheiro} texto='Sorteios' />
                        <CardIconsServicosCasamento image={IconPlanejamento} texto='Planejamento' />
                        <CardIconsServicosCasamento image={IconInspiracoes} texto='Inspirações' />
                        <CardIconsServicosCasamento image={IconComunidade} texto='Comunidade' />
                    </div>
                </div>

                <div className='home-noivos-area2' id='sorteio'>
                    <div className='area2-part1'>
                        <h1>Aproveite essa chance!</h1>
                        <h2>Organize seu casamento e concorra a prêmios todos os meses podendo ganhar mais de uma vez.</h2>
                        <img src=''></img>
                        <h4 className='area2-h4'>R$ 1.000</h4>
                        <h4 className='area2-h4'>Todos os meses para você</h4>
                        <Link to='/'>QUERO PARTICIPAR</Link>
                    </div>

                    <div className='area2-part2'>
                        <h1>Como participar?</h1>
                        <h2>Consquiste pontos realizando pequenas ações!
                            Cada ponto é uma chance a mais de ganhar</h2>
                    </div>
                </div>

                <div className='home-noivos-area3' id='dicas-wed'>
                    <h1>Dicas da Wed</h1>
                    <h4 className='text-roxo text-dicas'>Sabemos que os preparativos para o seu grande dia não será uma tarefa tão fácil, por isso você terá acesso a dicas dos melhores profissionais</h4>
                    <img src=''></img>
                    <img src=''></img>
                </div>
            </div>
        </div>
    )
}

