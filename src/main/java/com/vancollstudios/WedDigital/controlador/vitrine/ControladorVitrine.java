package com.vancollstudios.WedDigital.controlador.vitrine;

import com.vancollstudios.WedDigital.controlador.vitrine.DTO.DadosResumoProfissionaisDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoVitrineDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import com.vancollstudios.WedDigital.repositorio.vitrine.RepositorioVitrine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorVitrine {

    private final int LIMITE_ORCAMENTO_FREE = 5;
    private final int NIVEL_CONTA_FREE = 1;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @Autowired
    RepositorioVitrine repositorioVitrine;

    @GetMapping(path = "/api/profissionais/listarTodos/")
    public Collection<DadosResumoProfissionaisDTO> obterListaProfissionais(){
        Collection<DadosResumoProfissionaisDTO> dadosResumoProfissionaisDTO = new ArrayList<>();

        Collection<Profissional> listaProfisisonais = repositorioVitrine.listarProfissionaisPorNivelConta();

        for (Profissional profissional : listaProfisisonais){
            if(profissional.getNivelConta() == NIVEL_CONTA_FREE &&
               profissional.getOrcamentosRecebidos() >= LIMITE_ORCAMENTO_FREE){
                continue;
            }else{
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

    @GetMapping(path = "/api/orcamento/solicitacao")
    public ResponseEntity<String> solicitarOrcamentoVitrine(@RequestParam Integer idProfissional, @RequestParam Integer IdCliente){
        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(IdCliente);
        Optional<Profissional> ProfissionalOptional = repositorioProfissional.findByidProfissional(idProfissional);

        if(usuarioOptional == null || !usuarioOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not user");
        }
        if(ProfissionalOptional == null || !ProfissionalOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not prof");
        }

        Usuario usuario  = usuarioOptional.get();
        Profissional profissional  = ProfissionalOptional.get();


        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }
    public String ob(){
//        orcamentos/solicitacao?idProfissional=${idProfissional}&idCliente=${idCliente}
        return null;
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
