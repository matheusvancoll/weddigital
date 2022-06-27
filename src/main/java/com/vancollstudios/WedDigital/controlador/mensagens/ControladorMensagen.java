package com.vancollstudios.WedDigital.controlador.mensagens;

import com.vancollstudios.WedDigital.model.chat.DTO.DadosResumoListaMensagensDTO;
import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.orcamentos.DTO.DadosResumoOrcamentoDTO;
import com.vancollstudios.WedDigital.model.orcamentos.Orcamento;
import com.vancollstudios.WedDigital.model.usuarios.Noivos;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.chat.RepositorioMensagens;
import com.vancollstudios.WedDigital.repositorio.orcamentos.RepositorioOrcamento;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioNoivos;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.sql.Timestamp;
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
    RepositorioNoivos repositorioNoivos;

    @Autowired
    RepositorioUsuario repositorioUsuario;

    /**
     *
     */
    @GetMapping(path = "/api/mensagens/profissional/listarConversas/{idProfissional}")
    public Collection<DadosResumoListaMensagensDTO> obterContatosDoProfissionalPorIdProfissional(@PathVariable("idProfissional") Integer idProfissional){
        Collection<DadosResumoListaMensagensDTO> listaResumoMensagenDTO = new ArrayList<>();
        Collection<Mensagem> listaMensagensDoProfissional = new ArrayList<>();

        Optional<Profissional> profissionalOption = repositorioProfissional.findAllByIdProfissional(idProfissional);

        if(profissionalOption.isPresent()){
            listaMensagensDoProfissional = repositorioMensagens.findAllByIdProfissional(idProfissional);
        }else{
            return null;
        }

        for(Mensagem mensagem : listaMensagensDoProfissional){
            Usuario usuarioCliente = new Usuario();
            DadosResumoListaMensagensDTO dadosResumoMensagenDTO = new DadosResumoListaMensagensDTO();

            Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(mensagem.getIdCliente());
            if(usuarioOptional.isPresent()){
                usuarioCliente = usuarioOptional.get();
            }

            if(usuarioCliente != null){
                dadosResumoMensagenDTO.setIdMensagem(mensagem.getIdMensagem());
                dadosResumoMensagenDTO.setIdProfissional(mensagem.getIdProfissional());
                dadosResumoMensagenDTO.setIdCliente(mensagem.getIdCliente());

                dadosResumoMensagenDTO.setNomeContato(usuarioCliente.getNomeUsuario());
                dadosResumoMensagenDTO.setFotoPerfil(usuarioCliente.getFotoPerfil());

                Optional<Noivos> clienteOpt = repositorioNoivos.findAllByIdUsuario(usuarioCliente.getIdUsuario());

                if (clienteOpt.isPresent()){
                    dadosResumoMensagenDTO.setDataCasamento(clienteOpt.get().getDataCasamento());
                }
            }

            listaResumoMensagenDTO.add(dadosResumoMensagenDTO);

        }

        return listaResumoMensagenDTO;
    }

    @GetMapping(path = "/api/mensagens/cliente/listarConversas/{idCliente}")
    public Collection<DadosResumoListaMensagensDTO> obterContatosDoClientePorIdNoivos(@PathVariable("idCliente") Integer idCliente){
        Collection<DadosResumoListaMensagensDTO> listaResumoMensagenDTO = new ArrayList<>();
        Collection<Mensagem> listaMensagensDoCliente = new ArrayList<>();

        Optional<Usuario> clienteUsuarioOption = repositorioUsuario.findAllByIdUsuario(idCliente);

        if(clienteUsuarioOption.isPresent()){
            listaMensagensDoCliente = repositorioMensagens.findAllByIdCliente(idCliente);
        }else{
            return null;
        }

        for(Mensagem mensagem : listaMensagensDoCliente){
            DadosResumoListaMensagensDTO dadosResumoMensagenDTO = new DadosResumoListaMensagensDTO();
            Usuario usuarioProfissional = new Usuario();
            Profissional profissional = new Profissional();

            Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(mensagem.getIdCliente());
            Optional<Profissional> profissionalOptional = repositorioProfissional.findAllByIdProfissional(mensagem.getIdProfissional());

            if(usuarioOptional.isPresent() && profissionalOptional.isPresent()){
                usuarioProfissional = usuarioOptional.get();
                profissional = profissionalOptional.get();
            }

            if(usuarioProfissional != null && profissional != null){
                dadosResumoMensagenDTO.setIdMensagem(mensagem.getIdMensagem());
                dadosResumoMensagenDTO.setIdProfissional(mensagem.getIdProfissional());
                dadosResumoMensagenDTO.setIdCliente(mensagem.getIdCliente());

                dadosResumoMensagenDTO.setNomeContato(profissional.getNomeEmpresa());
                dadosResumoMensagenDTO.setFotoPerfil(usuarioProfissional.getFotoPerfil());
            }

            listaResumoMensagenDTO.add(dadosResumoMensagenDTO);
        }

        return listaResumoMensagenDTO;
    }




    @GetMapping(path = "/api/mensagens/listarConteudoMensagem")
    public Collection<Mensagem> obterConteudoMensagem(@RequestParam Integer idProfissional, @RequestParam Integer idCliente){
        Collection<Mensagem> listaMensagens = new ArrayList<>();
        Profissional profissional = new Profissional();
        Noivos cliente = new Noivos();


        Optional<Profissional> profissionalOption = repositorioProfissional.findAllByIdProfissional(idProfissional);
        Optional<Noivos> clienteOption = repositorioNoivos.findAllByIdUsuario(idCliente);

        listaMensagens = repositorioMensagens.findAllByIdProfissionalAndIdCliente(idProfissional, idCliente);

        return listaMensagens;
    }



    @PostMapping(path = "/api/mensagens/enviarMensagem")
    public ResponseEntity<String> enviarMensagemChat(@RequestParam Boolean enviadoPorProfissional, @RequestBody Mensagem mensagemEnviada){

        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(mensagemEnviada.getIdCliente());
        Optional<Profissional> ProfissionalOptional = repositorioProfissional.findAllByIdProfissional(mensagemEnviada.getIdProfissional());

        if(usuarioOptional == null || !usuarioOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not user");
        }
        if(ProfissionalOptional == null || !ProfissionalOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not prof");
        }

        Usuario usuario  = usuarioOptional.get();
        Profissional profissional  = ProfissionalOptional.get();
        Mensagem mensagem = new Mensagem();

        mensagem.setIdProfissional(profissional.getIdProfissional());
        mensagem.setIdCliente(usuario.getIdUsuario());
        mensagem.setCorpoMensagem(mensagemEnviada.getCorpoMensagem());

        if(enviadoPorProfissional){
            mensagem.setEnviadoPorProfissional(true);
            mensagem.setEnviadoPorCliente(false);
        }else{
            mensagem.setEnviadoPorProfissional(false);
            mensagem.setEnviadoPorCliente(true);
        }


        Long datetime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(datetime);
        mensagem.setDataEnvioMensagem(timestamp);

        repositorioMensagens.save(mensagem);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }
}
