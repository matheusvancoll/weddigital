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
import ImageNoivaFeliz from '../../../assets/noiva-feliz.jpg'
import ImageSorteio from '../../../assets/sorteio-ao-vivo.jpg'
import ImageComunidade from '../../../assets/comunidade-noivas.jpg'
import ImageNoivosFesta from '../../../assets/noiva-home.jpg'
import ImageWedDicas from '../../../assets/wed-dicas.png'

import {Link} from "react-router-dom";
import Footer from "../../../components/Footer";


export default function HomePage() {
    return (
        <div className=''>
            <Navbar />

            <div className='home-noivos__container'>
                <div className='home-noivos_area1' id='inicio'>
                    <div className='area1-home__container'>
                        <div className='area1-text__container'>
                            <div className='area1-text-title'>
                                <h1 className='text-roxo area1-text-h1'>Contrate os melhores profissionais para o seu casamento.</h1>
                            </div>

                            <div className='area1-search'>
                                <div className='area1-description'>
                                    <h4 className='text-roxo area1-description-h4'>Concorra a R$ 1.000 e aprenda tudo sobre o seu casamento com fornecedores de forma rápida e segura</h4>
                                    <Link to='/cadastro' className='teste'>LOCALIZAR FORNECEDORES</Link>
                                </div>
                            </div>
                        </div>

                        <div className='area1-image__container'>
                            <img src={ImageNoivosFesta}></img>
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
                        <img src={ImageNoivaFeliz}></img>
                        <h4 className='area2-h4'>R$ 1.000</h4>
                        <h4 className='area2-h4'>Todos os meses para você</h4>
                        <Link to='/cadastro'>QUERO PARTICIPAR</Link>
                    </div>

                    <div className='area2-part2'>
                        <h1>Como participar?</h1>
                        <h2>Consquiste pontos realizando pequenas ações!
                            Cada ponto é uma chance a mais de ganhar</h2>
                        <h3>Confira como você pode ganhar:</h3>

                        <div className='card_pontos_sorteio__conteinar'>
                            <div className='card_pontos_sorteio'>
                                <i className="fa-solid fa-handshake"></i>
                                <h4>Contratar um profissional</h4>
                                <h6>50 Pontos</h6>
                            </div>

                            <div className='card_pontos_sorteio'>
                                <i className="fa-solid fa-bullhorn"></i>
                                <h4>Feedback do profissional</h4>
                                <h6>100 Pontos</h6>
                            </div>

                            <div className='card_pontos_sorteio'>
                                <i className="fa-solid fa-medal"></i>
                                <h4>Avalie a plataforma</h4>
                                <h6>200 Pontos</h6>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='home-noivos-area3'>
                    <div className='area3-text'>
                        <h1 className='text-roxo'>Sorteio Ao vivo</h1>
                        <h4 className='text-roxo'>O sorteio será realizado ao vivo todos os meses para você torcer junto conosco.</h4>
                        <Link to='/cadastro'>QUERO PARTICIPAR</Link>
                    </div>

                    <div className='area3-image'>
                        <img src={ImageSorteio}></img>
                    </div>
                </div>

                <div className='home-noivos-area4' id='dicas-wed'>
                    <div className='area3-image'>
                        <img src={ImageWedDicas}></img>
                    </div>
                    <div className='area4-text'>
                        <h1>Dicas da Wed</h1>
                        <h4 className='text-dicas'>Sabemos que os preparativos para o seu grande dia não será uma tarefa tão fácil, por isso você terá acesso a dicas dos melhores profissionais</h4>
                        <Link to='/cadastro'>APRENDER TUDO</Link>
                    </div>
                </div>

                <div className='home-noivos-area5'>
                    <h1>Comunidade</h1>
                    <h4>Conheça outras noivinhas e compartilhem sua jornada de noiva do início até o fim.</h4>
                    <img src={ImageComunidade} />
                </div>

                <div className='home-noivos-area6'>
                    <h1>Quem somos</h1>
                    <h4>Somos apaixonados por casamentos e tecnologia. Acreditamos que o amor move o mundo e cada sonho que realizamos é uma família que nasce.</h4>
                    <h4>Planeje e compartilhe momentos incríveis, o seu amor merece, isso é a Wed Digital</h4>
                </div>
            </div>
            <Footer />
        </div>
    )
}

