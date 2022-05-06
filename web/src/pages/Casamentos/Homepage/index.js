import React from 'react'
import './Homepage-Noivos.css'

import Navbar from '../../../components/Navbar'

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
                            <a href='/' className='teste'>LOCALIZAR FORNECEDORES</a>
                        </div>
                    </div>

                    <div className='area1-icons'>
                        <i class="fa-solid fa-chart-line"></i>
                        <i class="fa-solid fa-hashtag"></i>
                        <i class="fa-solid fa-chart-line"></i>
                        <i class="fa-solid fa-hashtag"></i>
                        <i class="fa-solid fa-chart-line"></i>
                        <i class="fa-solid fa-hashtag"></i>
                    </div>
                </div>

                <div className='home-noivos-area2' id='sorteio'>
                    <div className='area2-part1'>
                        <h1>Aproveite essa chance!</h1>
                        <h2>Organize seu casamento e concorra a prêmios todos os meses podendo ganhar mais de uma vez.</h2>
                        <img src=''></img>
                        <h4 className='area2-h4'>R$ 1.000</h4>
                        <h4 className='area2-h4'>Todos os meses para você</h4>
                        <a href='/'>QUERO PARTICIPAR</a>
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

