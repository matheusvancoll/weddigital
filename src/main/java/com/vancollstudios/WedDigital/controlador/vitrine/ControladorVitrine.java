package com.vancollstudios.WedDigital.controlador.vitrine;

import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoVitrineDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControladorVitrine {

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @GetMapping(path = "/api/detalhesProfissional/{idProfissional}")
    public DadosResumoVitrineDTO obterDadosVitrineProfissional(@PathVariable("idProfissional") Integer idProfissional){
        DadosResumoVitrineDTO dadosResumoVitrineDTO = new DadosResumoVitrineDTO();
        Profissional profissional = new Profissional();

        Optional<Profissional> profissionalOptional = repositorioProfissional.findByidProfissional(idProfissional);
        if(profissionalOptional != null || profissionalOptional.isPresent()){
            profissional = profissionalOptional.get();
        }

        dadosResumoVitrineDTO.setIdProfissional(profissional.getIdProfissional());
        dadosResumoVitrineDTO.setNomeEmpresa(profissional.getNomeEmpresa());

        if(profissional.getCasamentosBemSucedidos() == null){
            dadosResumoVitrineDTO.setCasamentosBemSucedidos(0);
        }else{
            dadosResumoVitrineDTO.setCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());
        }
        dadosResumoVitrineDTO.setClassificacaoProfissional(profissional.getClassificacao());
        dadosResumoVitrineDTO.setNumeroContato(profissional.getNumeroContato());
        dadosResumoVitrineDTO.setEmailContato(profissional.getEmail());
        dadosResumoVitrineDTO.setDescricaoEmpresa(profissional.getDescricaoEmpresa());
        dadosResumoVitrineDTO.setValorMinimo(profissional.getValorMinimo());
        dadosResumoVitrineDTO.setFormasPagamento(profissional.getFormasPagamento());
        dadosResumoVitrineDTO.setRealizaMaisDeUmEventoPorDia(profissional.getMaisDeUmEventoPorDia());
        dadosResumoVitrineDTO.setTrabalhaSozinho(profissional.getTrabalhaSozinho());

        return dadosResumoVitrineDTO;
    }
}
