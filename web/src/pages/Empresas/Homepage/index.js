import React from 'react'
import './Homepage-Empresas.css'

import Navbar from '../../../components/Navbar';

import ImageHomepagePrimary from '../../../assets/homepage-home.png'
import ImagemPanel from '../../../assets/panel.jpg'
import ImagemAcessoria from '../../../assets/assessoria.jpg'
import ImagemPerfilProfissional from '../../../assets/perfil-profissional.jpeg'
import ImageCasalFelizPontos from '../../../assets/casal-feliz-pontos.jpg'

import StatusOuroGold from '../../../assets/icons/Ouro_Gold.ico'
import StatusOuroBlack from '../../../assets/icons/Ouro_Black.ico'
import StatusOuroPlatinum from '../../../assets/icons/Ouro_Platinum.ico'
import StatusOuroInfinity from '../../../assets/icons/Ouro_Infinity.ico'

import StatusDiamanteGold from '../../../assets/icons/Diamante_Gold.ico'
import StatusDiamanteBlack from '../../../assets/icons/Diamante_Black.ico'
import StatusDiamantePlatinum from '../../../assets/icons/Diamante_Platinum.ico'
import StatusDiamanteInfinity from '../../../assets/icons/Diamante_Infinity.ico'


import CardVantagensEmpresas from '../../../components/Homepage/CardVantagens/CardVantagensEmpresas';
import CardServicosOferecidos from '../../../components/Homepage/CardVantagens/CardServicosOferecidos';
import {Link} from "react-router-dom";
import Footer from "../../../components/Footer";
import CardIconsPontos from "../../../components/Homepage/CardVantagens/CardIconsPontos";

export default function HomePage() {
    return (
        <>
            <Navbar isAreaEmpresa={true}/>
            <div className='homepage__container'>
                <div className='hp-primary-container'>
                    <div className='hp-image-primary'>
                        <img src={ImageHomepagePrimary} />
                        <div className='hp-text-primary'>
                            <h1>
                                <span className='text-roxo'>Sua empresa</span> <br></br>
                                <span className='text-preto'>vendendo para <br></br>
                                                             noivos <span className='text-roxo'>reais</span>
                                </span>
                            </h1>
                        </div>

                        <div className='hp-text-secundary'>
                            <h4 className='text-roxo'>
                                Receba 10x mais solicitações de orçamento e tenha acesso a aulas exclusivas de estratégias de marketing de empresas de sucesso.
                            </h4>
                        </div>
                    </div>
                </div>

                <Link to='/empresas/cadastro' className='button_quero_crescer'>QUERO CRESCER</Link>

                <div className='space_homepage_separator'></div>

                <div className='homepage__home_two' id='vantagens'>
                    <div className='home_cards line1'>
                        <CardVantagensEmpresas icon="fa-solid fa-trophy" title="Concorra a prêmios"
                                description='Para ajudar o seu negócio, nós vamos te presentear em cash através de suas conquintas.'/>

                        <CardVantagensEmpresas icon="fa-solid fa-bullhorn" title="Marketing é tudo"
                                description='"Vou falar com meu noivo e te retorno". Aprenda técnicas de marketing e torne sua empresa desejada por noivas.'/>

                        <CardVantagensEmpresas icon="fa-solid fa-file-contract" title="Feche mais contratos"
                                description='Alavanque seu negócio fechando com noivos que acessam a plataforma'/>
                    </div>

                    <div className='home_cards line2'>
                        <CardVantagensEmpresas icon="fa-solid fa-arrow-trend-up" title="Cresça na velocidade digital"
                                    description='Não importa quanto tempo você tem de mercado, nós potencializamos sua marca 10x mais rápido usando estratégias de marketing'/>

                        <CardVantagensEmpresas icon="fa-solid fa-arrow-up-right-dots" title="Programa Win"
                                               description='Reconhecemos o seu trabalho para realizar grandes casamentos, por isso criampos o programa Win'/>
                    </div>
                </div>

                <div className='space_homepage_separator'></div>

                <div className='homepage__home_three' id='servicos'>
                    <div className='home3_text_title'>
                        <h2 className='wed_text_primary'>
                            Você está perdendo vários contratos por não ser da Wed
                        </h2>
                        <p>O marketing digital invadiu o mercado de casamentos nos últimos anos e métodos ultrapassados não são suficientes para você obter a sua liberdade financeira</p>
                        <h2 className='wed_text_secundary'>Por isso , você vai encontrar isso:</h2>
                    </div>

                    <div className='home3_text_side'>
                        <div>
                            <CardServicosOferecidos icon="fa-solid fa-desktop"
                                texto='Personalize seu perfil com ajuda dos nossos colaboradores do marketing e torne sua empresa desejada já no primeiro contato dos noivos.' />

                            <CardServicosOferecidos icon="fa-solid fa-graduation-cap"
                                texto='Tenha acesso a conteúdos exclusivos em vídeo, áudio e texto. Um passo a passo sobre estratégias de marketing de sucesso.' />

                            <CardServicosOferecidos icon="fa-solid fa-chalkboard-user"
                                texto='Um painel totalmente fácil de ser usado, te proporcionando uma experiência prática.' />
                        </div>
                        <div className='home3__imagem'>
                            <img className='image_wed_profissional' src={ImagemPanel}></img>
                        </div>
                    </div>
                </div>

                <div className='homepage__home_three'>
                    <div className='home3_text_side'>
                        <div className='home3__imagem'>
                            <img className='image_wed_profissional' src={ImagemAcessoria}></img>
                        </div>

                        <div>
                            <CardServicosOferecidos icon="fa-solid fa-people-group"
                                texto='Acessoria de marketing direta para te ajudar no crescimento da sua empresa' />

                            <CardServicosOferecidos icon="fa-solid fa-handshake"
                                texto='Conheça profissionais com o mesmo propósito que o seu e troque experiências.' />

                            <CardServicosOferecidos icon="fa-solid fa-building-lock"
                                texto='Seus dados estarão seguros na nossa base de dados.' />
                        </div>
                    </div>
                    <div className='home3_text_title'>
                        <h2 className='wed_text_primary'>
                            Tudo isso na sua mão
                        </h2>

                        <Link to='/empresas/cadastro' className='button_quero_crescer'>QUERO CRESCER</Link>
                    </div>
                </div>

                <div className='space_homepage_separator'></div>

                <div className='homepage__home_three'>
                    <div className='home3_text_side'>
                        <div className='home3__imagem'>
                            <img src={ImagemPerfilProfissional}></img>
                        </div>

                        <div>
                            <CardServicosOferecidos icon="fa-solid fa-file-circle-check"
                                                    texto='Obtenha certificado de conclusão das aulas assistidas.' />

                            <CardServicosOferecidos icon="fa-solid fa-sack-dollar"
                                                    texto='Conquiste pontos e concorra a R$500 todos os meses.' />
                        </div>
                    </div>
                </div>

                <div className='space_homepage_separator'></div>

                <div className='hp_pontos_wed'>
                    <div className='pontos_wed_primary'>
                        <div className='pontos_text'>
                            <h1 className='wed_text_primary'>Pontos WD</h1>
                            <h3 className='wed_text_compl'>Seu negócio merece crescer através das duas conquistas e vamos te presentear com R$ 1.000,00</h3>
                            <h3 className='wed_text_compl'>Não deixe essa chance escapar, conquista pontos e participe de um sorteio a cada mês.</h3>
                            <h3 className='wed_text_compl'>Quanto mais pontos, maior sua chance de ganhar!</h3>
                        </div>

                        <div className='pontos_image'>
                            <img src={ImageCasalFelizPontos} />
                        </div>
                    </div>

                    <div className='pontos_icons'>
                        <h1 className='wed_text_secundary'>Como conseguir pontos para participar do sorteio?</h1>

                        <div className='pontos_icons__group group_col1'>
                            <CardIconsPontos icon="fa-solid fa-check" title="Completar perfil" description="5 pts" />
                            <CardIconsPontos icon="fa-solid fa-handshake-simple" title="Convidar uma noiva" description="10 ou 20 pts" />
                            <CardIconsPontos icon="fa-solid fa-file-signature" title="Se tornar um assinante" description="40 ou 80 pts" />
                            <CardIconsPontos icon="fa-solid fa-user-group" title="Indicar um parceiro" description="40 ou 80 pts" />
                        </div>

                        <div className='pontos_icons__group group_col2'>
                            <CardIconsPontos icon="fa-solid fa-users-rays" title="Receber indicação" description="40 ou 80 pts" />
                            <CardIconsPontos icon="fa-solid fa-star" title="Casamento bem sucedido" description="10 ou 20 pts" />
                            <CardIconsPontos icon="fa-solid fa-comment-dots" title="Feedback em vídeo" description="80 pts" />
                            <CardIconsPontos icon="fa-solid fa-cart-shopping" title="Compre pontos" description="10 pts = R$ 20" />
                        </div>
                    </div>
                </div>


                <div className='space_homepage_separator'></div>

                <div className='sobre_sorteio'>
                    <div className='sobre_data_sorteio'>
                        <h1 className='wed_text_secundary'>Quando o sorteio é realizado?</h1>
                        <h3 className='wed_text_compl'>O sorteio é realizado ao vivo para você ter certeza de como tudo acontece e torcer junto conosco todos os meses!</h3>
                    </div>

                    <div className='sobre_participante_sorteio'>
                        <h1 className='wed_text_secundary'>Quem pode participar?</h1>
                        <h3 className='wed_text_compl'>Resolvemos dar a chance aos profissionais que são visionários e querem crescer através da nossa plataforma. Todos os assinantes PRATA e OURO poderão participar dos sorteios.</h3>
                    </div>
                </div>

                <div className='space_homepage_separator'></div>

                <div className='programa_win'>
                    <div className='win_wed_primary'>
                        <div className='win_image'>
                            <img className='image_wed_profissional' src={ImageCasalFelizPontos} />
                        </div>

                        <div className='win_text'>
                            <h1 className='wed_text_primary'>Programa Win</h1>
                            <h3 className='wed_text_compl'>Acreditamos que você precisa ser honrado por casa sonho realizado e sabemos que todos são capazes de alcançar seus objetivos</h3>
                            <h3 className='wed_text_compl'>O programa Win foi criado especialmente para te desafiar e você ser reconhecido por isso por outros profissionais e por noivos que querem te contratar</h3>
                        </div>
                    </div>

                    <div className='win_explicacao'>
                        <h1 className='wed_text_secundary'>Como funciona?</h1>
                        <h3 className='wed_text_compl'>Ao alcançar uma certa quantidade de casamentos bem sucedidos você receberá o status pelo seu resultado, onde eles serão exibidos no seu perfil para noivos gerando cada vez mais valor para sua marca</h3>
                    </div>
                </div>

                <div className='space_homepage_separator'></div>

                <div className='status_wed'>
                    <h1 className='wed_text_primary'>Status Profissional</h1>

                    <div className='status_icons__group'>
                        <img src={StatusOuroGold} />
                        <img src={StatusOuroBlack} />
                        <img src={StatusOuroPlatinum} />
                        <img src={StatusOuroInfinity} />
                    </div>

                    <div className='status_icons__group'>
                        <img src={StatusDiamanteGold} />
                        <img src={StatusDiamanteBlack} />
                        <img src={StatusDiamantePlatinum} />
                        <img src={StatusDiamanteInfinity} />
                    </div>

                    <div className='status_text'>
                        <p>25 <br></br> Casamentos bem sucedidos</p>
                        <p>50 <br></br> Casamentos bem sucedidos</p>
                        <p>100 <br></br> Casamentos bem sucedidos</p>
                        <p>200 <br></br> Casamentos bem sucedidos</p>
                    </div>
                </div>

                <div className='space_homepage_separator'></div>

                <Link to='/empresas/cadastro' className='button_quero_crescer'>QUERO CRESCER</Link>

                <div className='space_homepage_separator'></div>

                <Footer />
            </div>
        </>
    )
}

