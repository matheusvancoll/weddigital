import React from 'react'
import './Homepage-Empresas.css'

import Navbar from '../../../components/Navbar';
import ImagemWed from '../../../assets/home.jpg'
import ImagemPanel from '../../../assets/panel.jpg'
import ImagemAcessoria from '../../../assets/acessoria.jpg'
import CardVantagensEmpresas from '../../../components/Homepage/CardVantagens/CardVantagensEmpresas';
import CardServicosOferecidos from '../../../components/Homepage/CardVantagens/CardServicosOferecidos';
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <Navbar isAreaEmpresa={true}/>
            <div className='homepage__container'>
                <div className='homepage__home_one' id='inicio'>
                    <div className='home_one__textos'>
                        <h1>
                            <span className='text-roxo'>Sua empresa</span> <br></br>
                            <span className='text-preto'>vendendo para <br></br> 
                                                        noivos <span className='text-roxo'>reais</span></span>
                        </h1>

                        <h4 className='text-roxo'>
                            Tenha acesso a conteúdos exclusivos de estratégias de marketing das empresas de grande sucesso.
                        </h4>

                        <Link to='/empresas/cadastro' className='button_quero_crescer'>QUERO CRESCER</Link>
                    </div>
                    <div className='home_one__imagem'>
                        <img src={ImagemWed}></img>
                    </div>
                </div>
                <div className='homepage__home_two' id='vantagens'>
                    <div className='home_cards line1'>
                        <CardVantagensEmpresas icon="fa-solid fa-trophy" title="Concorra a prêmios"
                                description='Para ajudar o seu negócio, nós vamos te presentear em cash através de suas conquintas.'/>

                        <CardVantagensEmpresas icon="fa-solid fa-bullhorn" title="Marketing é tudo"
                                description='"Vou falar com meu noivo e te retorno". Aprenda técniucas de marketing com profissionais da área."'/>

                        <CardVantagensEmpresas icon="fa-solid fa-file-contract" title="Feche mais contratos"
                                description='Alavanque seu negócio fechando com noivos que acessam a plataforma'/>
                    </div>

                    <div className='home_cards line2'>
                        <CardVantagensEmpresas icon="fa-solid fa-arrow-trend-up" title="Cresça na velocidade digital"
                                    description='Não importa quanto tempo você tem de mercado, a internet potencializa sua marca 10x mais rápido'/>
                    </div>
                </div>

                <div className='homepage__home_three' id='servicos'>
                    <div className='home3_text_title'>
                        <h2>
                            Você está perdendo vários contratos por não ser da Wed
                        </h2>
                        <p>O marketing digital invadiu o mercado de casamentos nos últimos anos e métodos ultrapassados não são suficientes para você obter a sua liberdade financeira</p>
                        <h2>Por isso , você vai encontrar isso:</h2>
                    </div>

                    <div className='home3_text_side'>
                        <div>
                            <CardServicosOferecidos icon="fa-solid fa-desktop"
                                texto='Personalize seu perfil com ajuda dos nossos colaboradores do marketing, torne sua empresa desejada já no primeiro contato dos noivos.' />

                            <CardServicosOferecidos icon="fa-solid fa-graduation-cap"
                                texto='Tenha acesso a conteúdos exclusivos em vídeo, áudio, PDF. Um passo a passo sobre estratégias de marketing.' />

                            <CardServicosOferecidos icon="fa-solid fa-chalkboard-user"
                                texto='Um painel totalmente fácil de ser usado, te proporcionando uma experiência prática.' />
                        </div>
                        <div className='home3__imagem'>
                            <img src={ImagemPanel}></img>
                        </div>
                    </div>
                </div>

                <div className='homepage__home_three'>
                    <div className='home3_text_side'>
                        <div className='home3__imagem'>
                            <img src={ImagemAcessoria}></img>
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
                        <h2>
                            Tudo isso na sua mão
                        </h2>

                        <Link to='/empresas/cadastro' className='button_quero_crescer'>QUERO CRESCER</Link>
                    </div>
                </div>

            </div>
        </>
    )
}

