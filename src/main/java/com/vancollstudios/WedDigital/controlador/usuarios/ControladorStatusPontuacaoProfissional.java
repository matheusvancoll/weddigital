package com.vancollstudios.WedDigital.controlador.usuarios;

import com.vancollstudios.WedDigital.model.statusPontuacaoProfissional.StatusPontuacao;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoStatusPontuacaoDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.UsuarioEmpresaDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional.RepositorioStatusPontuacao;
import com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional.RepositorioStatusPontuacaoProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorStatusPontuacaoProfissional {

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

        ResponseEntity dadosProfissional = repositorioProfissional.findByidProfissional(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        if(dadosProfissional != null && dadosProfissional.getBody() != null){
            profissional = (Profissional) dadosProfissional.getBody();
            String nivelConta = "";

            if(profissional.getNivelConta() > 1){
                statusPontuacao = repositorioStatusPontuacaoProfissional.obterStatusPontuacaoPorCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());

                dadosStatusDTO.setIdPontuacao(statusPontuacao.getIdPontuacao());
                dadosStatusDTO.setPontoMinimo(statusPontuacao.getPontoMinimo());
                dadosStatusDTO.setPontoMaximo(statusPontuacao.getPontoMaximo());
                dadosStatusDTO.setNumeroCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());

                if(profissional.getNivelConta() == 2){
                    nivelConta = "Prata";
                }
                if(profissional.getNivelConta() == 3){
                    nivelConta = "Ouro";
                }

                dadosStatusDTO.setNivelStatusNome(statusPontuacao.getNivelNome());
            }else{
                nivelConta = "Bronze";
            }

            dadosStatusDTO.setNivelContaNome(nivelConta);
        }

        return ResponseEntity.ok().body(dadosStatusDTO);
    }


}
