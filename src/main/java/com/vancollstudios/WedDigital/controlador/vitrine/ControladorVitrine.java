package com.vancollstudios.WedDigital.controlador.vitrine;

import com.vancollstudios.WedDigital.controlador.vitrine.DTO.DadosResumoProfissionaisDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoVitrineDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControladorVitrine {

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @GetMapping(path = "/api/profissionais/listarTodos/")
    public Collection<DadosResumoProfissionaisDTO> obterListaProfissionais(){
        Collection<DadosResumoProfissionaisDTO> dadosResumoProfissionaisDTO = new ArrayList<>();

        Iterable<Profissional> listaProfisisonais = repositorioProfissional.findAll();
        for (Profissional profissional : listaProfisisonais){
            DadosResumoProfissionaisDTO dadosProfissional = new DadosResumoProfissionaisDTO();
            dadosProfissional.setIdProfissional(profissional.getIdProfissional());
            dadosProfissional.setNomeEmpresa(profissional.getNomeEmpresa());
            dadosProfissional.setCidade(profissional.getCidade());
            dadosProfissional.setEstado(profissional.getEstado());
            dadosProfissional.setCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());
            dadosProfissional.setClassificacao(profissional.getClassificacao());
            dadosProfissional.setSegmento(profissional.getSegmento());
            dadosProfissional.setValorMinimo(profissional.getValorMinimo());
            dadosResumoProfissionaisDTO.add(dadosProfissional);
        }

        return dadosResumoProfissionaisDTO;
    }

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
        if(profissional.getVisitasVitrine() == null){
            profissional.setVisitasVitrine(1);
        }else{
            profissional.setVisitasVitrine(profissional.getVisitasVitrine()+1);
        }

        repositorioProfissional.save(profissional);

        return dadosResumoVitrineDTO;
    }

    @GetMapping(path = "/api/obterEmailUsuario/{idUsuario}")
    public String obterEmailUsuarioPorId(@PathVariable("idUsuario") Integer idUsuario){
        String emailUsuario = "";
        Optional<Usuario> usuario = repositorioUsuario.findAllByIdUsuario(idUsuario);
        if(usuario != null && usuario.get() != null){
            emailUsuario = usuario.get().getEmail();
        }

        return emailUsuario;
    }
}
