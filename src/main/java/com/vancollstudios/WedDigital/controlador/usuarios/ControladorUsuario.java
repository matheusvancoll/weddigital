package com.vancollstudios.WedDigital.controlador.usuarios;

import com.vancollstudios.WedDigital.controlador.casamentos.ControladorCasamento;
import com.vancollstudios.WedDigital.model.anuncios.Anuncio;
import com.vancollstudios.WedDigital.model.casamentos.Casamento;
import com.vancollstudios.WedDigital.model.usuarios.DadosResumoPerfil;
import com.vancollstudios.WedDigital.model.usuarios.TipoUsuario;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.anuncios.RepositorioAnuncio;
import com.vancollstudios.WedDigital.repositorio.casamentos.RepositorioCasamento;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioTipoUsuario;
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
    RepositorioTipoUsuario repositorioTipoUsuario;

    @Autowired
    RepositorioCasamento repositorioCasamento;

    @Autowired
    RepositorioAnuncio repositorioAnuncio;

    @Autowired
    ControladorCasamento controladorCasamento;

    @Autowired
    PasswordEncoder passwordEncoder;


    @GetMapping(path = "/api/usuario/buscarTodosUsuarios")
    public Iterable<Usuario> buscarTodosUsuarios(){
        return repositorioUsuario.findAll();
    }













    @GetMapping(path = "/api/usuario/{idUsuario}")
    public Usuario consultarUsuarioPorId(@PathVariable("idUsuario") Integer idUsuario){
        ResponseEntity usuarioEncontrato = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        Object ussssssss =  usuarioEncontrato.getBody();
        Usuario ussssseerrr = (Usuario) ussssssss;

        return ussssseerrr;
    }

    @GetMapping(path = "/api/tipousuario/{idUsuario}")
    public TipoUsuario consultarTipoUsuarioPeloIdUsuario(@PathVariable("idUsuario") Integer idUsuario){
        ResponseEntity tipoUsuarioEncontrato = repositorioTipoUsuario.findAllByIdTipoUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        Object teste = tipoUsuarioEncontrato.getBody();
        TipoUsuario hue = (TipoUsuario) teste;
        Usuario userr = consultarUsuarioPorId(idUsuario);
        hue.setDescricaoTipo(userr.getNomeUsuario());
        return hue;
    }


    @GetMapping(path = "/api/perfilusuario/{idUsuario}")
    public DadosResumoPerfil consultarDadosPerfilPorIdUsuario(@PathVariable("idUsuario") Integer idUsuario){
        Usuario usuario;
        Casamento casamento;
        DadosResumoPerfil dadosResumoPerfil = new DadosResumoPerfil();
        Collection<Anuncio> anuncios = null;
        TipoUsuario tipoUsuario = null;

        ResponseEntity dadosUsuario = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro)).orElse(ResponseEntity.notFound().build());
        usuario = (Usuario) dadosUsuario.getBody();

        casamento = controladorCasamento.consultarCasamentoPorIdUsuario(idUsuario);

        if(tipoUsuario != null){
            dadosResumoPerfil.setTipoUsuario(tipoUsuario.getDescricaoTipo());
        }

        dadosResumoPerfil.setDadosCasamento(casamento);
        dadosResumoPerfil.setListaAnuncios(anuncios);

        return dadosResumoPerfil;
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


    @PostMapping(path = "/api/usuario/novoUsuario")
    public ResponseEntity<String> criarNovoUsuario(@RequestBody Usuario novoUsuario){
        Boolean usuarioExistente = isUsuarioExistente(novoUsuario.getLogin(), novoUsuario.getEmail());
        if(!usuarioExistente){
            Date dataAtual = new Date();
            String dataCriacao = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            Calendar cal = Calendar.getInstance();
            cal.setTime(dataAtual);
            cal.add(Calendar.MONTH, 3);
            String dataExpiracao = Util.converterDataParaStringSemHora(cal.getTime(), "dd/MM/yyyy");

            novoUsuario.setDataCriacao(dataCriacao);
            novoUsuario.setDataExpiracao(dataExpiracao);
            novoUsuario.setIs_Validado(false);

            novoUsuario.setSenha(passwordEncoder.encode(novoUsuario.getSenha()));
            novoUsuario.setIs_SenhaExpirada(false);
            Integer tokenGenerated = Math.round(1);
            novoUsuario.setRandomToken(tokenGenerated);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("fdifub");
        }

        ResponseEntity.ok(repositorioUsuario.save(novoUsuario));
        return ResponseEntity.status(HttpStatus.OK).body("Usuario Cadastrado");
    }

    @GetMapping(path = "/api/usuario/validarAcesso")
    public ResponseEntity<String> validarAcesso(@RequestParam String login, @RequestParam String senha){
        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByLoginOrEmail(login, login);
        if(usuarioOptional == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario inválido");
        }
        
        Usuario usuario  = usuarioOptional.get();
        Boolean isAcessoValido = passwordEncoder.matches(senha, usuario.getSenha());
        String tokenAcesso = "";

        if(isAcessoValido){
            String tipoUsuario;
            if(usuario.getIs_Noivos()){ tipoUsuario = "noivos"; }
            else{ tipoUsuario = "profissional"; }
            tokenAcesso = tipoUsuario +"."+ usuario.getIdUsuario() +"."+ usuario.getNivelConta() +"."+ usuario.getDataCriacao() +"."+ usuario.getRandomToken();
        }

        HttpStatus status = isAcessoValido ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(tokenAcesso);
    }

    @PostMapping(path = "/api/tipousuario/salvar")
    public TipoUsuario criarTipoUsuario(@RequestBody TipoUsuario novoTipoUsuario){
        return repositorioTipoUsuario.save(novoTipoUsuario);
    }


}
