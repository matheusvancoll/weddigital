package com.vancollstudios.WedDigital.controlador.vitrine;

import com.vancollstudios.WedDigital.controlador.vitrine.DTO.DadosResumoProfissionaisDTO;
import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.orcamentos.DTO.DadosResumoOrcamentoDTO;
import com.vancollstudios.WedDigital.model.orcamentos.Orcamento;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoVitrineDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.chat.RepositorioMensagens;
import com.vancollstudios.WedDigital.repositorio.orcamentos.RepositorioOrcamento;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import com.vancollstudios.WedDigital.repositorio.vitrine.RepositorioVitrine;
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
public class ControladorVitrine {

    private final int LIMITE_ORCAMENTO_FREE = 3;
    private final int NIVEL_CONTA_FREE = 1;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @Autowired
    RepositorioVitrine repositorioVitrine;

    @Autowired
    RepositorioOrcamento repositorioOrcamento;

    @Autowired
    RepositorioMensagens repositorioMensagens;

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

    @PostMapping(path = "/api/orcamento/solicitacao")
    public ResponseEntity<String> solicitarOrcamentoVitrine(@RequestBody DadosResumoOrcamentoDTO dadosResumoOrcamentoDTO){
        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(dadosResumoOrcamentoDTO.getIdCliente());
        Optional<Profissional> ProfissionalOptional = repositorioProfissional.findByidProfissional(dadosResumoOrcamentoDTO.getIdProfissional());

        if(usuarioOptional == null || !usuarioOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not user");
        }
        if(ProfissionalOptional == null || !ProfissionalOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not prof");
        }

        Usuario usuario  = usuarioOptional.get();
        Profissional profissional  = ProfissionalOptional.get();
        Orcamento orcamento = new Orcamento();
        Mensagem mensagem = new Mensagem();

        orcamento.setIdProfissional(profissional.getIdProfissional());
        orcamento.setIdCliente(usuario.getIdUsuario());
        mensagem.setIdProfissional(profissional.getIdProfissional());
        mensagem.setIdCliente(usuario.getIdUsuario());
        mensagem.setCorpoMensagem(dadosResumoOrcamentoDTO.getCorpoMensagem());
        mensagem.setEnviadoPorCliente(true);
        mensagem.setEnviadoPorProfissional(false);

        Long datetime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(datetime);
        mensagem.setDataEnvioMensagem(timestamp);

        profissional.setOrcamentosRecebidos(profissional.getOrcamentosRecebidos()+1);

        repositorioOrcamento.save(orcamento);
        repositorioMensagens.save(mensagem);
        repositorioProfissional.save(profissional);

        return ResponseEntity.status(HttpStatus.OK).body("ok");
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
