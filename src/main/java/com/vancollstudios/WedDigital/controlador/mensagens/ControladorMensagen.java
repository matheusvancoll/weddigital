package com.vancollstudios.WedDigital.controlador.mensagens;

import com.vancollstudios.WedDigital.model.chat.DTO.dadosResumoListaMensagensDTO;
import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.orcamentos.DTO.DadosResumoOrcamentoDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.chat.RepositorioMensagens;
import com.vancollstudios.WedDigital.repositorio.orcamentos.RepositorioOrcamento;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorMensagen {

    @Autowired
    RepositorioOrcamento repositorioOrcamento;

    @Autowired
    RepositorioMensagens repositorioMensagens;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @GetMapping(path = "/api/mensagens/profissional/listarConversas/{idProfissional}")
    public Collection<dadosResumoListaMensagensDTO> obterListaMensagensPorProfissionalId(@PathVariable("idProfissional") Integer idProfissional){
        Collection<Mensagem> listaMensagensDoProfissional = repositorioMensagens.findAllByIdProfissional(idProfissional);
        Collection<dadosResumoListaMensagensDTO> listaResumoMensagenDTO = new ArrayList<>();

        Profissional profissional = new Profissional();
        Optional<Profissional> profissionalOption = repositorioProfissional.findByidProfissional(idProfissional);

        if(profissionalOption.isPresent()){
            profissional = profissionalOption.get();
        }

        for(Mensagem mensagem : listaMensagensDoProfissional){
            Usuario usuario = new Usuario();
            dadosResumoListaMensagensDTO dadosResumoMensagenDTO = new dadosResumoListaMensagensDTO();

            Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(mensagem.getIdCliente());
            if(usuarioOptional.isPresent()){
                usuario = usuarioOptional.get();
            }

            if(usuario != null && profissional != null){
                dadosResumoMensagenDTO.setIdMensagem(mensagem.getIdMensagem());
                dadosResumoMensagenDTO.setIdProfissional(profissional.getIdProfissional());
                dadosResumoMensagenDTO.setNomeProfissional(profissional.getNomeEmpresa());
                dadosResumoMensagenDTO.setIdCliente(usuario.getIdUsuario());
                dadosResumoMensagenDTO.setNomeCliente(usuario.getNomeUsuario());
                dadosResumoMensagenDTO.setUltimaMensagem(mensagem.getCorpoMensagem());
                dadosResumoMensagenDTO.setDataHoraMensagemUltimaMensagem(mensagem.getDataEnvioMensagem().toString());
            }

            listaResumoMensagenDTO.add(dadosResumoMensagenDTO);

        }

        return listaResumoMensagenDTO;
    }

    @GetMapping(path = "/api/mensagens/cliente/listarConversas/{idCliente}")
    public Collection<Mensagem> obterMensagensPorClienteId(@PathVariable("idCliente") Integer idCliente){
        Collection<Mensagem> listaMensagensCliente = repositorioMensagens.findAllByIdCliente(idCliente);
        return listaMensagensCliente;
    }



}
