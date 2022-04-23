package com.vancollstudios.WedDigital.controlador.usuarios;

import com.vancollstudios.WedDigital.controlador.casamentos.ControladorCasamento;
import com.vancollstudios.WedDigital.model.casamentos.Casamento;
import com.vancollstudios.WedDigital.model.usuarios.*;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoPerfilDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.UsuarioDTO;
import com.vancollstudios.WedDigital.repositorio.casamentos.RepositorioCasamento;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import com.vancollstudios.WedDigital.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControladorUsuario {

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioCasamento repositorioCasamento;

    @Autowired
    ControladorCasamento controladorCasamento;

    @Autowired
    PasswordEncoder passwordEncoder;


//    @GetMapping(path = "/api/usuario/buscarTodosUsuarios")
//    public Iterable<Usuario> buscarTodosUsuarios(){
//        return repositorioUsuario.findAll();
//    }


    @PostMapping(path = "/api/usuario/novoUsuario")
    public ResponseEntity<String> criarNovoUsuario(@RequestBody UsuarioDTO novoUsuarioDTO){
        Boolean usuarioExistente = isUsuarioExistente(novoUsuarioDTO.getLogin(), novoUsuarioDTO.getEmail());
        Usuario novoUsuario = new Usuario();
        if(!usuarioExistente){
            Date dataAtual = new Date();
            String dataCriacao = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            Calendar cal = Calendar.getInstance();
            cal.setTime(dataAtual);
            cal.add(Calendar.MONTH, 3);
            String dataExpiracao = Util.converterDataParaStringSemHora(cal.getTime(), "dd/MM/yyyy");

            novoUsuario.setNomeUsuario(novoUsuarioDTO.getNomeUsuario());
            novoUsuario.setEmail(novoUsuarioDTO.getEmail());
            novoUsuario.setLogin(novoUsuarioDTO.getLogin());
            novoUsuario.setIs_Noivos(novoUsuarioDTO.getIs_Noivos());
            novoUsuario.setIs_Profissional(novoUsuarioDTO.getIs_Profissional());
            novoUsuario.setIs_PrimeiroAcesso(true);
            novoUsuario.setDataCriacao(dataCriacao);
            novoUsuario.setDataExpiracao(dataExpiracao);
            novoUsuario.setIs_Validado(false);

            novoUsuario.setSenha(passwordEncoder.encode(novoUsuarioDTO.getSenha()));
            novoUsuario.setIs_SenhaExpirada(false);
            Random tokenGenerated = new Random();
            Integer tokenRandom = tokenGenerated.nextInt();

            if(tokenRandom < 0){
                tokenRandom = tokenRandom * -1;
            }

            novoUsuario.setRandomToken(tokenRandom);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("exist");
        }

        Integer idNovoUsuario =  ResponseEntity.ok(repositorioUsuario.save(novoUsuario)).getBody().getIdUsuario();

        if(novoUsuario.getIs_Profissional()){
            Profissional novoProfissional = popularDadosProfissional(novoUsuarioDTO, idNovoUsuario);
            ResponseEntity.ok(repositorioProfissional.save(novoProfissional));
        }

        String tokenUsuario = obterTokenPorIdUsuario(idNovoUsuario);

        return ResponseEntity.status(HttpStatus.OK).body(tokenUsuario);
    }

    public Profissional popularDadosProfissional(UsuarioDTO novoUsuarioParam, Integer idUsuarioParam){
        Profissional profissional = new Profissional();

        profissional.setIdUsuario(idUsuarioParam);
        profissional.setNomeEmpresa(novoUsuarioParam.getNomeEmpresa());
        profissional.setEmail(novoUsuarioParam.getEmail());
        profissional.setNumeroContato(novoUsuarioParam.getNumeroContato());
        profissional.setIs_Whatsapp(novoUsuarioParam.getIs_Whatsapp());
        profissional.setCidade(novoUsuarioParam.getCidade());
        profissional.setEstado(novoUsuarioParam.getEstado());
        profissional.setIs_CNPJ(novoUsuarioParam.getIs_CNPJ());
        profissional.setNumeroCNPJ(novoUsuarioParam.getNumeroCNPJ());
        profissional.setNivelConta(novoUsuarioParam.getNivelConta());

        return profissional;
    }

    public DadosResumoPerfilDTO popularDadosResumoPerfil(Usuario usuarioParam, Profissional profissionalParam, Casamento casamentoParam){
        DadosResumoPerfilDTO dadosResumoPerfilDTO = new DadosResumoPerfilDTO();
        String tipoUsuario = "";

        dadosResumoPerfilDTO.setIdUsuario(profissionalParam.getIdUsuario());
        dadosResumoPerfilDTO.setNome(usuarioParam.getNomeUsuario());
        dadosResumoPerfilDTO.setIdProfissional(profissionalParam.getIdProfissional());
        dadosResumoPerfilDTO.setCidade(profissionalParam.getCidade());
        dadosResumoPerfilDTO.setEstado(profissionalParam.getEstado());
        dadosResumoPerfilDTO.setNomeEmpresa(profissionalParam.getNomeEmpresa());
        dadosResumoPerfilDTO.setDescricaoEmpresa(profissionalParam.getDescricaoEmpresa());
        dadosResumoPerfilDTO.setEmail(profissionalParam.getEmail());
        dadosResumoPerfilDTO.setNumeroContato(profissionalParam.getNumeroContato());
        dadosResumoPerfilDTO.setIs_Whatsapp(profissionalParam.getIs_Whatsapp());
        dadosResumoPerfilDTO.setIs_CNPJ(profissionalParam.getIs_CNPJ());
        dadosResumoPerfilDTO.setNumeroCNPJ(profissionalParam.getNumeroCNPJ());
        dadosResumoPerfilDTO.setNivelConta(profissionalParam.getNivelConta());

        if(usuarioParam.getIs_Noivos()){ tipoUsuario = "noivos"; }
        else{ tipoUsuario = "profissional"; }

        dadosResumoPerfilDTO.setTipoUsuario(tipoUsuario);

        return dadosResumoPerfilDTO;
    }

    @GetMapping(path = "/api/usuario/validarAcesso")
    public ResponseEntity<String> validarAcesso(@RequestParam String login, @RequestParam String senha){
        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByLoginOrEmail(login, login);
        if(usuarioOptional == null || !usuarioOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario inválido");
        }

        Usuario usuario  = usuarioOptional.get();
        Boolean isAcessoValido = passwordEncoder.matches(senha, usuario.getSenha());
        String tokenAcesso = "";

        if(isAcessoValido){
            String tipoUsuario;
            if(usuario.getIs_Noivos()){ tipoUsuario = "noivos"; }
            else{ tipoUsuario = "profissional"; }
            tokenAcesso = tipoUsuario +"."+ usuario.getIdUsuario() +"."+ usuario.getNomeUsuario() +"."+ usuario.getNivelConta() +"."+ usuario.getDataCriacao() +"."+ usuario.getRandomToken();
            Date dataAtual = new Date();
            String dataAcesso = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            usuario.setUltimoAcesso(dataAcesso);
            repositorioUsuario.save(usuario);
        }

        HttpStatus status = isAcessoValido ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(tokenAcesso);
    }

    @GetMapping(path = "/api/usuario/obterdadosperfil")
    public ResponseEntity<DadosResumoPerfilDTO> obterDadosResumoPerfilPorIdUsuario(@RequestParam Integer idUsuario, @RequestParam Integer tokenUsuario){
        DadosResumoPerfilDTO dadosResumoPerfilDTO = new DadosResumoPerfilDTO();
        Usuario usuario = new Usuario();
        Profissional profissional;

        ResponseEntity dadosUsuario = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            if(!Objects.equals(tokenUsuario, usuario.getRandomToken())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }

        ResponseEntity dadosProfissional = repositorioProfissional.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(usuario != null && dadosProfissional != null && dadosProfissional.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            profissional = (Profissional) dadosProfissional.getBody();
            dadosResumoPerfilDTO = popularDadosResumoPerfil(usuario, profissional, null);
        }

        return ResponseEntity.ok().body(dadosResumoPerfilDTO);
    }

    @PutMapping(path = "/api/dadosPerfil/atualizarDados/{idUsuario}")
    public String atualizarDadosUsuarioPorIdUsuario(@PathVariable("idUsuario") Integer idUsuario, @RequestBody DadosResumoPerfilDTO dadosAtualizados){
        Usuario usuarioAtualizado = new Usuario();

        ResponseEntity dadosUsuario = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null){
            usuarioAtualizado = (Usuario) dadosUsuario.getBody();
        }
        Profissional profissionalAtualizado = new Profissional();

        usuarioAtualizado.setIdUsuario(dadosAtualizados.getIdUsuario());
        usuarioAtualizado.setNomeUsuario(dadosAtualizados.getNome());
        usuarioAtualizado.setEmail(dadosAtualizados.getEmail());

        profissionalAtualizado.setIdUsuario(dadosAtualizados.getIdUsuario());
        profissionalAtualizado.setIdProfissional(dadosAtualizados.getIdProfissional());
        profissionalAtualizado.setCidade(dadosAtualizados.getCidade());
        profissionalAtualizado.setEstado(dadosAtualizados.getEstado());
        profissionalAtualizado.setNomeEmpresa(dadosAtualizados.getNomeEmpresa());
        profissionalAtualizado.setDescricaoEmpresa(dadosAtualizados.getDescricaoEmpresa());
        profissionalAtualizado.setEmail(dadosAtualizados.getEmail());
        profissionalAtualizado.setNumeroContato(dadosAtualizados.getNumeroContato());
        profissionalAtualizado.setIs_Whatsapp(dadosAtualizados.getIs_Whatsapp());
        profissionalAtualizado.setIs_CNPJ(dadosAtualizados.getIs_CNPJ());
        profissionalAtualizado.setNumeroCNPJ(dadosAtualizados.getNumeroCNPJ());

        repositorioProfissional.save(profissionalAtualizado);
        repositorioUsuario.save(usuarioAtualizado);
        String token = obterTokenPorIdUsuario(idUsuario);
        return token;
    }

    public String obterTokenPorIdUsuario(Integer idUsuario){
        String tokenAcesso = "";
        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(idUsuario);
        Usuario usuario  = usuarioOptional.get();

        if(usuarioOptional != null || usuarioOptional.isPresent()){
            String tipoUsuario;
            if(usuario.getIs_Noivos()){ tipoUsuario = "noivos"; }
            else{ tipoUsuario = "profissional"; }
            tokenAcesso = tipoUsuario +"."+ usuario.getIdUsuario() +"."+ usuario.getNomeUsuario() +"."+ usuario.getNivelConta() +"."+ usuario.getDataCriacao() +"."+ usuario.getRandomToken();
        }

        return tokenAcesso;
    }

    public Boolean isUsuarioExistente(String login, String email){
        ResponseEntity usuarioEncontrato = repositorioUsuario.findAllByLoginOrEmail(login, email)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(usuarioEncontrato != null && usuarioEncontrato.getBody() != null){
            return true;
        }else{
            return false;
        }
    }



}
