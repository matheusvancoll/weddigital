package com.vancollstudios.WedDigital.controlador.usuarios;

import com.vancollstudios.WedDigital.model.statusPontuacaoProfissional.StatusPontuacao;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoStatusPontuacaoDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional.RepositorioStatusPontuacao;
import com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional.RepositorioStatusPontuacaoProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorStatusPontuacaoProfissional {

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioStatusPontuacao repositorioStatusPontuacao;
    @Autowired
    RepositorioStatusPontuacaoProfissional repositorioStatusPontuacaoProfissional;


    @PostMapping(path = "/api/usuario/empresa/novoStatusPontuacao")
    public ResponseEntity<String> criarNovoStatusPontuacao(@RequestBody StatusPontuacao statusPontuacaoParam){
        StatusPontuacao statusPontuacao = new StatusPontuacao();

        repositorioStatusPontuacao.save(statusPontuacaoParam);

        return ResponseEntity.status(HttpStatus.OK).body("okay");
    }


    @GetMapping(path = "/api/usuario/empresa/obterDadosPontuacao/{idUsuario}")
    public ResponseEntity<DadosResumoStatusPontuacaoDTO> obterDadosResumoStatusPontuacaoPorIdProfissional(@PathVariable("idUsuario") Integer idUsuario){
        DadosResumoStatusPontuacaoDTO dadosStatusDTO = new DadosResumoStatusPontuacaoDTO();
        StatusPontuacao statusPontuacao = new StatusPontuacao();
        Profissional profissional = new Profissional();
        Usuario usuario = new Usuario();
        String nivelConta = "";

        ResponseEntity dadosUsuario = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        ResponseEntity dadosProfissinal = repositorioProfissional.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            profissional = (Profissional) dadosProfissinal.getBody();

            if(usuario.getIs_Profissional() && (profissional.getIdUsuario() == usuario.getIdUsuario())){
                statusPontuacao = repositorioStatusPontuacaoProfissional.obterStatusPontuacaoPorCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());

                if(profissional.getNivelConta() == 1) { nivelConta = "Bronze"; }
                if(profissional.getNivelConta() == 2) { nivelConta = "Ouro"; }
                if(profissional.getNivelConta() == 3) { nivelConta = "Diamante"; }

                dadosStatusDTO.setIdPontuacao(statusPontuacao.getIdPontuacao());
                dadosStatusDTO.setPontoMinimo(statusPontuacao.getPontoMinimo());
                dadosStatusDTO.setPontoMaximo(statusPontuacao.getPontoMaximo());
                dadosStatusDTO.setNumeroCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());
                dadosStatusDTO.setNivelContaNome(nivelConta);
                dadosStatusDTO.setNivelStatusNome(statusPontuacao.getStatusNome());
                dadosStatusDTO.setProximoNivel(statusPontuacao.getProximoNivel());
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok().body(dadosStatusDTO);
    }


}
