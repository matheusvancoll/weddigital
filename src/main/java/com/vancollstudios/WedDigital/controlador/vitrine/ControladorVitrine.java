package com.vancollstudios.WedDigital.controlador.vitrine;

import com.vancollstudios.WedDigital.controlador.imagens.ControladorImagem;
import com.vancollstudios.WedDigital.controlador.usuarios.ControladorStatusPontuacaoProfissional;
import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.imagens.ImagemVitrine;
import com.vancollstudios.WedDigital.model.orcamentos.DTO.DadosResumoOrcamentoDTO;
import com.vancollstudios.WedDigital.model.orcamentos.Orcamento;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoProfissionaisDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoVitrineDTO;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.chat.RepositorioMensagens;
import com.vancollstudios.WedDigital.repositorio.imagens.RepositorioImagemVitrine;
import com.vancollstudios.WedDigital.repositorio.orcamentos.RepositorioOrcamento;
import com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional.RepositorioStatusPontuacaoProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import com.vancollstudios.WedDigital.repositorio.vitrine.RepositorioVitrine;
import com.vancollstudios.WedDigital.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorVitrine {

    private final int LIMITE_ORCAMENTO_FREE = 3;
    private final int NIVEL_CONTA_FREE = 1;

    private final int LIMITE_UPLOAD_IMAGENS_VITRINE = 20;

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

    @Autowired
    RepositorioStatusPontuacaoProfissional repositorioStatusPontuacaoProfissional;

    @Autowired
    RepositorioImagemVitrine repositorioImagemVitrine;

    @Autowired
    ControladorStatusPontuacaoProfissional controladorStatusPontuacaoProfissional;

    @Autowired
    ControladorImagem controladorImagem;

    @GetMapping(path = "/api/profissionais/listarTodos/")
    public Collection<DadosResumoProfissionaisDTO> obterListaProfissionais(){
        Collection<DadosResumoProfissionaisDTO> dadosResumoProfissionaisDTO = new ArrayList<>();

        Collection<Profissional> listaProfisisonais = repositorioVitrine.listarProfissionaisPorNivelConta();

        for (Profissional profissional : listaProfisisonais){
            if(profissional.getNivelConta() == NIVEL_CONTA_FREE && profissional.getOrcamentosRecebidos() >= LIMITE_ORCAMENTO_FREE){
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

                if(profissional.getNivelConta() > 1){
                    String nivelConta = Util.converterNivelContaParaString(profissional.getNivelConta());
                    String statusConta = controladorStatusPontuacaoProfissional.obterStatusContaPorCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());
                    dadosProfissional.setNivelStatusConta(nivelConta + " " + statusConta);
                }

                String imagemPrincipalVitrine = repositorioImagemVitrine.obterNomePrimeiraImagemVitrineProfissional(dadosProfissional.getIdProfissional());
                dadosProfissional.setImagemMarketplace(imagemPrincipalVitrine);

                dadosResumoProfissionaisDTO.add(dadosProfissional);
            }
        }

        return dadosResumoProfissionaisDTO;
    }

    @GetMapping(path = "/api/detalhesProfissional/{idProfissional}")
    public DadosResumoVitrineDTO obterDadosVitrineProfissional(@PathVariable("idProfissional") Integer idProfissional){

        DadosResumoVitrineDTO dadosResumoVitrineDTO = new DadosResumoVitrineDTO();
        Profissional profissional = new Profissional();

        Optional<Profissional> profissionalOptional = repositorioProfissional.findAllByIdProfissional(idProfissional);

        if(profissionalOptional == null || !profissionalOptional.isPresent()){
            return null;
        }

        profissional = profissionalOptional.get();
        dadosResumoVitrineDTO = popularDadosResumoVitrineDtoPorProfissional(profissional);

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
        Optional<Profissional> ProfissionalOptional = repositorioProfissional.findAllByIdProfissional(dadosResumoOrcamentoDTO.getIdProfissional());

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


    public DadosResumoVitrineDTO popularDadosResumoVitrineDtoPorProfissional(Profissional profissional){
        DadosResumoVitrineDTO dadosResumoVitrineDTO = new DadosResumoVitrineDTO();

        dadosResumoVitrineDTO.setIdProfissional(profissional.getIdProfissional());
        dadosResumoVitrineDTO.setNomeEmpresa(profissional.getNomeEmpresa());
        dadosResumoVitrineDTO.setClassificacaoProfissional(profissional.getClassificacao());
        dadosResumoVitrineDTO.setNumeroContato(profissional.getNumeroContato());
        dadosResumoVitrineDTO.setEmailContato(profissional.getEmail());
        dadosResumoVitrineDTO.setDescricaoEmpresa(profissional.getDescricaoEmpresa());
        dadosResumoVitrineDTO.setValorMinimo(profissional.getValorMinimo());
        dadosResumoVitrineDTO.setFormasPagamento(profissional.getFormasPagamento());
        dadosResumoVitrineDTO.setRealizaMaisDeUmEventoPorDia(profissional.getMaisDeUmEventoPorDia());
        dadosResumoVitrineDTO.setTrabalhaSozinho(profissional.getTrabalhaSozinho());

        if(profissional.getCasamentosBemSucedidos() == null){
            dadosResumoVitrineDTO.setCasamentosBemSucedidos(0);
        }else{
            dadosResumoVitrineDTO.setCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());
        }

        String nivelConta = Util.converterNivelContaParaString(profissional.getNivelConta());
        String statusConta = controladorStatusPontuacaoProfissional.obterStatusContaPorCasamentosBemSucedidos(profissional.getCasamentosBemSucedidos());
        dadosResumoVitrineDTO.setNivelStatusConta(nivelConta + statusConta);

        dadosResumoVitrineDTO.setImagensProfissional(this.obterImagensVitrinePorIdUsuario(profissional.getIdProfissional()));

        return dadosResumoVitrineDTO;
    }

    @PostMapping(path = "/api/imagens/uploadImagensVitrine/{idProfissional}")
    public String uploadImagemVitrine(@PathVariable("idProfissional") Integer idProfissional, @RequestParam MultipartFile arquivoImagemVitrine){
        Profissional profissional = new Profissional();
        String nomeArquivo = "";
        String statusUpload = "";
        Integer qtdImagensJaEnviadas = 0;


        ResponseEntity dadosProfissional = repositorioProfissional.findByIdProfissional(idProfissional)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        if(dadosProfissional != null && dadosProfissional.getBody() != null){
            profissional = (Profissional) dadosProfissional.getBody();
            String extensaoImagem = Util.obterExtensaoImagem(arquivoImagemVitrine);

            if(extensaoImagem.equals("jpeg") || extensaoImagem.equals("png") || extensaoImagem.equals("jpg") ||
                    extensaoImagem.equals("JPEG") || extensaoImagem.equals("PNG") || extensaoImagem.equals("JPG")){
                qtdImagensJaEnviadas = repositorioImagemVitrine.obterQuantidadeImagensVitrineSalvosPorIdProfissional(idProfissional);
                nomeArquivo = profissional.getIdUsuario() + "_" + profissional.getNomeEmpresa() + "_" + (qtdImagensJaEnviadas+1) + "." + extensaoImagem;
            }else{
                return "falha";
            }
        }else{
            return "falha";
        }

        if(qtdImagensJaEnviadas < LIMITE_UPLOAD_IMAGENS_VITRINE){

            String caminhoDiretorioImagem = controladorImagem.salvarImagemVitrine(arquivoImagemVitrine, nomeArquivo);

            if(caminhoDiretorioImagem != ""){
                ImagemVitrine imagemVitrine = new ImagemVitrine();
                imagemVitrine.setNomeImagem(nomeArquivo);
                imagemVitrine.setIdProfissional(idProfissional);

                repositorioImagemVitrine.save(imagemVitrine);
                statusUpload = "sucesso";
            }else{
                statusUpload = "falha";
            }
        }else{
            return "limite";
        }

        return statusUpload;
    }

    @GetMapping(path = "/api/imagens/deletarImagemVitrine/{idProfissional}")
    public String deletarImagemVitrine(@PathVariable("idProfissional") Integer idProfissional, @RequestParam Integer idImagem){
        ImagemVitrine imagemVitrine = new ImagemVitrine();

        Optional<ImagemVitrine> imagemVitrineOptional = repositorioImagemVitrine.findById(idImagem);
        if(imagemVitrineOptional != null && imagemVitrineOptional.isPresent()) {

            imagemVitrine = imagemVitrineOptional.get();

            if (imagemVitrine.getIdProfissional().equals(idProfissional)) {
                controladorImagem.deletarImagemVitrine(imagemVitrineOptional.get().getNomeImagem());
                repositorioImagemVitrine.deleteById(imagemVitrine.getIdImagem());
            } else {
                return "profissional inválido";
            }
        }else{
            return "imagem não localizada";
        }

        return "Imagem deletada";
    }

    @GetMapping(path = "/api/obterImagensVitrine/{idProfissional}")
    public Collection<ImagemVitrine> obterImagensVitrinePorIdUsuario(@PathVariable("idProfissional") Integer idProfissional){
        Collection<ImagemVitrine> imagensVitrine = repositorioImagemVitrine.findAllByIdProfissional(idProfissional);

        return imagensVitrine;
    }

}
