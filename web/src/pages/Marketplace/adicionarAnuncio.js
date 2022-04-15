import React from "react";
import InputMask from "react-input-mask";
import CurrencyInput from 'react-currency-input-field';
import './AdicionarAnuncio.css'

import Navbar from '../../components/Navbar'

export default function AdicionarAnuncio(props){
    return(
        <div className='addanuncio-container'>
            <Navbar isUserLogado={props.dadosUsuario.isUserLogado} tipoUsuario={props.dadosUsuario.tipoUsuario} />
            
            <div className='addanuncio-title'>
                <p>O que você está anunciando?</p>
            </div>

            <form className='addanuncio-inputs' action='/perfil' method='POST'>
                <input type='text' name='tituloAnuncio' id='inputTitleAnuncio' placeholder='Título*' />
                <input type='text' name='descricaoAnuncio' id='inputDescricaoAnuncio' placeholder='Descrição*' />

                <div className='addanuncio-input-categorias'>
                    <p>Cateogiras*</p>
                    <div>
                    </div>
                </div>

                <CurrencyInput name="precoAnuncio" id='inputPrecoAnuncio' placeholder="Preço (R$)*"
                                maxLength='8' prefix="R$ " decimalSeparator="," decimalsLimit={2} />;

                <div className='addanuncio-upload-imagem'>
                    <p>Selecione uma imagem*</p>
                    <input type="file" multiple/>
                </div>

                <div className='addanuncio-input-localizacao'>
                    <p>Localização*</p>
                    <input type='text' placeholder='Cidade*' id='localizacaoCidade' />
                    
                    <select name="estado" id='localizacaoEstado'>
                        <option value="estado">Selecione o Estado</option> 
                        <option value="ac">Acre</option> 
                        <option value="al">Alagoas</option> 
                        <option value="am">Amazonas</option> 
                        <option value="ap">Amapá</option> 
                        <option value="ba">Bahia</option> 
                        <option value="ce">Ceará</option> 
                        <option value="df">Distrito Federal</option> 
                        <option value="es">Espírito Santo</option> 
                        <option value="go">Goiás</option> 
                        <option value="ma">Maranhão</option> 
                        <option value="mt">Mato Grosso</option> 
                        <option value="ms">Mato Grosso do Sul</option> 
                        <option value="mg">Minas Gerais</option> 
                        <option value="pa">Pará</option> 
                        <option value="pb">Paraíba</option> 
                        <option value="pr">Paraná</option> 
                        <option value="pe">Pernambuco</option> 
                        <option value="pi">Piauí</option> 
                        <option value="rj">Rio de Janeiro</option> 
                        <option value="rn">Rio Grande do Norte</option> 
                        <option value="ro">Rondônia</option> 
                        <option value="rs">Rio Grande do Sul</option> 
                        <option value="rr">Roraima</option> 
                        <option value="sc">Santa Catarina</option> 
                        <option value="se">Sergipe</option> 
                        <option value="sp">São Paulo</option> 
                        <option value="to">Tocantins</option> 
                    </select>
                </div>

                <div className='addanuncio-input-contato'>
                    <p>Contato*</p>
                    <div className='addanuncio-contato'>
                        <InputMask mask="(99) 99999-9999" placeholder='Telefone*' id='telefoneContato'  />
                        <div className='contato-check'>
                            <p>É WhatsApp? </p>
                            <input type="radio" value="sim" name="whatsapp" />
                            <p>Sim |</p>
                            <input type="radio" value="nao" name="whatsapp" />
                            <p>Não</p>
                        </div>
                    </div>
                    <input type='email' placeholder='Email*' id='emailContato' />
                </div>

                <button>Inserir Anuncio</button>
            </form>
        </div>

    )
}