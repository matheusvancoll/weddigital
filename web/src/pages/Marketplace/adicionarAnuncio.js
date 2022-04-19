import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";
import CurrencyInput from 'react-currency-input-field';
import './AdicionarAnuncio.css'

import api from "../../api";

import Navbar from '../../components/Navbar'


const newAnuncio = {
    titulo : "",
	descricao : "",
	categoria : 1,
	preco: "",
	cidade: "",
	estado : "",
	telefone: "",
	whatsapp: false,
	idUsuarioFornecedor : 57
}

export default function AdicionarAnuncio(props){
    const [Dados, setDados] = useState(newAnuncio)
    const history = useHistory()

    function onChange(ev){
        const { name, value } = ev.target

        setDados({...Dados, [name]: value})
    }

    function onSubmit(ev){
        ev.preventDefault()

        let tituloAnuncio = document.getElementById('tituloAnuncio').value
        let descricaoAnuncio = document.getElementById('descricaoAnuncios').value
        let categoriaAnuncio = 1
        let precoAnuncio = document.getElementById('precoAnuncio').value
        let cidadeAnuncio = document.getElementById('cidadeAnuncio').value
        let estadoAnuncio = document.getElementById('estadoAnuncio').value
        let telefoneAnuncio = document.getElementById('telefoneAnuncio').value
        let whatsappTrue = document.getElementById('whatsappTrue')
        let whatsappFalse = document.getElementById('whatsappFalse')
        let emailAnuncio = document.getElementById('emailAnuncio')
        
        setDados({
            titulo : tituloAnuncio,
            descricao : descricaoAnuncio,
            categoria : categoriaAnuncio,
            preco: precoAnuncio,
            cidade: cidadeAnuncio,
            estado : estadoAnuncio,
            telefone: telefoneAnuncio,
            whatsapp: false,
            idUsuarioFornecedor : 57
        })
        console.log("DADOS")
        console.log(Dados)
        api.post('anuncio/salvar', Dados
        ).then((response) => {
            console.log(response)
            history.push('/')
        }).catch((error) => {
            console.log(error);
        })

    }
    return(
        <div className='addanuncio-container'>
            <Navbar isUserLogado={props.dadosUsuario.length  != 0 ? true : false} tipoUsuario={props.dadosUsuario.tipoUsuario} />
            
            <div className='addanuncio-title'>
                <p>O que você está anunciando?</p>
            </div>

            <form className='addanuncio-inputs' onSubmit={onSubmit}>
                <input type='text' name='titulo' id='tituloAnuncio' placeholder='Título*' />
                <input type='text' name='descricao' id='descricaoAnuncios' placeholder='Descrição*' />

                <div className='addanuncio-input-categorias'>
                    <p>Cateogiras*</p>
                    <div>
                    </div>
                </div>

                <CurrencyInput name="preco" id='precoAnuncio' placeholder="Preço (R$)*"
                                maxLength='8' prefix="R$ " decimalSeparator="," decimalsLimit={2} />;

                <div className='addanuncio-upload-imagem'>
                    <p>Selecione uma imagem*</p>
                    <input type="file" multiple/>
                </div>

                <div className='addanuncio-input-localizacao'>
                    <p>Localização*</p>
                    <input type='text' name='cidade' id='cidadeAnuncio' placeholder='Cidade*' />
                    
                    <select name="estado" id='estadoAnuncio'>
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
                        <InputMask mask="(99) 99999-9999" name='telefone' id='telefoneAnuncio' placeholder='Telefone*'  />
                        <div className='contato-check'>
                            <p>É WhatsApp? </p>
                            <input type="radio" value="true" name="whatsapp" id='whatsappTrue'/>
                            <p>Sim |</p>
                            <input type="radio" value="nao" name="whatsapp" id='whatsappFalse' />
                            <p>Não</p>
                        </div>
                    </div>
                    <input type='email' id='emailAnuncio' placeholder='Email*' />
                </div>

                <button>Inserir Anuncio</button>
            </form>
        </div>

    )


}
