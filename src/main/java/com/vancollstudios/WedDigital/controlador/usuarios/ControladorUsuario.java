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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

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


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/api/usuarios/buscarTodos")
    public Iterable<Usuario> buscarTodosUsuarios(){
        return repositorioUsuario.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/api/usuario/{idUsuario}")
    public Usuario consultarUsuarioPorId(@PathVariable("idUsuario") Integer idUsuario){
        ResponseEntity usuarioEncontrato = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        Object ussssssss =  usuarioEncontrato.getBody();
        Usuario ussssseerrr = (Usuario) ussssssss;

        return ussssseerrr;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/api/tipousuario/{idUsuario}")
    public TipoUsuario consultarTipoUsuarioPeloIdUsuario(@PathVariable("idUsuario") Integer idUsuario){
        ResponseEntity tipoUsuarioEncontrato = repositorioTipoUsuario.findAllByIdTipoUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        Object teste = tipoUsuarioEncontrato.getBody();
        TipoUsuario hue = (TipoUsuario) teste;
        Usuario userr = consultarUsuarioPorId(51);
        hue.setDescricaoTipo(userr.getNomeCompleto());
        return hue;
    }



    @CrossOrigin(origins = "http://localhost:3000")
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

        if(usuario != null){
            ResponseEntity dadosTipoUsuario = repositorioTipoUsuario.findAllByIdTipoUsuario(usuario.getTipoUsuario())
                    .map(registro -> ResponseEntity.ok().body(registro)).orElse(ResponseEntity.notFound().build());
            tipoUsuario = (TipoUsuario) dadosTipoUsuario.getBody();

            ResponseEntity dadosAnuncio = repositorioAnuncio.findAllByIdUsuarioFornecedor(usuario.getTipoUsuario())
                    .map(registro -> ResponseEntity.ok().body(registro)).orElse(ResponseEntity.notFound().build());
            anuncios = (Collection<Anuncio>) dadosAnuncio.getBody();

            dadosResumoPerfil.setUsuario(usuario);
        }

        if(tipoUsuario != null){
            dadosResumoPerfil.setTipoUsuario(tipoUsuario.getDescricaoTipo());
        }

        dadosResumoPerfil.setDadosCasamento(casamento);
        dadosResumoPerfil.setListaAnuncios(anuncios);

        return dadosResumoPerfil;
    }



















    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/api/usuario/salvar")
    public Usuario criarUsuario(@RequestBody Usuario novoUsuario){
        return repositorioUsuario.save(novoUsuario);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/api/tipousuario/salvar")
    public TipoUsuario criarTipoUsuario(@RequestBody TipoUsuario novoTipoUsuario){
        return repositorioTipoUsuario.save(novoTipoUsuario);
    }


}
