package com.vancollstudios.WedDigital.controlador.usuarios;

import com.vancollstudios.WedDigital.controlador.imagens.ControladorImagem;
import com.vancollstudios.WedDigital.model.feedbacks.FeedbackProfissional;
import com.vancollstudios.WedDigital.model.imagens.ImagemPerfil;
import com.vancollstudios.WedDigital.model.sorteios.Sorteio;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoPerfilNoivosDTO;
import com.vancollstudios.WedDigital.repositorio.imagens.RepositorioImagemPerfil;
import com.vancollstudios.WedDigital.repositorio.sorteios.RepositorioSorteio;
import org.springframework.web.multipart.MultipartFile;
import com.vancollstudios.WedDigital.model.usuarios.*;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoPerfilProfissionalDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.UsuarioEmpresaDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.UsuarioNoivosDTO;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioNoivos;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import com.vancollstudios.WedDigital.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorUsuario {

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioNoivos repositorioNoivos;

    @Autowired
    RepositorioImagemPerfil repositorioImagemPerfil;

    @Autowired
    RepositorioSorteio repositorioSorteio;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ControladorImagem controladorImagem;


    /**
     * Função para validar entrada do usuario
     *
     */
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
            Integer idTipoUsuario = 0;

            Optional<Profissional> profissionalOption = repositorioProfissional.findAllByIdUsuario(usuario.getIdUsuario());
            Optional<Noivos> noivosOption = repositorioNoivos.findAllByIdUsuario(usuario.getIdUsuario());

            if(profissionalOption.isPresent()){
                Profissional profissional = profissionalOption.get();
                idTipoUsuario = profissional.getIdProfissional();
            }else{
                if(noivosOption.isPresent()){
                    Noivos noivos = noivosOption.get();
                    idTipoUsuario = noivos.getIdNoivos();
                }else{
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario inválido");
                }
            }

            tokenAcesso = obterTokenPorIdUsuario(usuario.getIdUsuario(), idTipoUsuario);

            Date dataAtual = new Date();
            String dataAcesso = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            usuario.setUltimoAcesso(dataAcesso);
            repositorioUsuario.save(usuario);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Dados inválidos");
        }

        HttpStatus status = isAcessoValido ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(tokenAcesso);
    }

    /**
     * Validar acesso para área de sorteio
     *
     */
    @GetMapping(path = "/api/sorteio/validarAcessoAdmin")
    public ResponseEntity<String> validarAcessoSorteio(@RequestParam String login, @RequestParam String senha){

        if(login.equals("weddigital_user_admin") && senha.equals("S9cyS.qE)*kK)vqj")){
            return ResponseEntity.status(HttpStatus.OK).body("Usuario válido");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario inválido");
        }
    }

    @GetMapping(path = "/cadastro/usuario/confirmacaoEmail")
    public ResponseEntity<String> validarConfirmacaoEmail(@RequestParam Integer idUsuario, @RequestParam Integer tokenUsuario){
        Optional<Usuario> usuarioOptional = repositorioUsuario.findByIdUsuario(idUsuario);
        if(usuarioOptional == null || !usuarioOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario inválido");
        }

        Usuario usuario  = usuarioOptional.get();

        if(usuario.getIs_Validado()){
            return ResponseEntity.status(HttpStatus.OK).body("Email validado");
        }

        if(!usuario.getRandomToken().equals(tokenUsuario)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }

        usuario.setIs_Validado(true);
        repositorioUsuario.save(usuario);

        return ResponseEntity.status(HttpStatus.OK).body("Email validado");
    }



    @PostMapping(path = "/api/dadosPerfil/uploadImagensPerfil/{idUsuario}")
    public String uploadImagensFotoPerfil(@PathVariable("idUsuario") Integer idUsuario, @RequestParam MultipartFile fotoPerfil){
        Usuario usuario = new Usuario();
        String nomeArquivo = "";
        String statusUpload = "";

        ResponseEntity dadosUsuario = repositorioUsuario.findByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        if(dadosUsuario != null && dadosUsuario.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            String extensaoImagem = Util.obterExtensaoImagem(fotoPerfil);
            if(extensaoImagem.equals("jpeg") || extensaoImagem.equals("png") || extensaoImagem.equals("jpg") ||
               extensaoImagem.equals("JPEG") || extensaoImagem.equals("PNG") || extensaoImagem.equals("JPG")){
                nomeArquivo = usuario.getIdUsuario() + "_" + usuario.getNomeUsuario() + "_" + usuario.getRandomToken() + "." + extensaoImagem;
            }else{
                return "falha";
            }
        }

        String caminhoDiretorioFoto = controladorImagem.salvarImagemPerfilUsuario(fotoPerfil, nomeArquivo);
        usuario.setFotoPerfil(nomeArquivo);

        if(caminhoDiretorioFoto != ""){
            ImagemPerfil imagemPerfil = new ImagemPerfil();
            imagemPerfil.setIdUsuario(idUsuario);
            imagemPerfil.setCaminhoImagem(caminhoDiretorioFoto);
            imagemPerfil.setNomeArquivo(nomeArquivo);

            repositorioImagemPerfil.save(imagemPerfil);
            repositorioUsuario.save(usuario);

            statusUpload = "sucesso";
        }else{
            statusUpload = "falha";
        }

        return statusUpload;
    }


    // -----------------------------------------------------------------------------------------------------------------
    // ---------- EMPRESA ----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------

    /**
     * Função para cadastrar novos Profissionais
     *
     */
    @PostMapping(path = "/api/usuario/empresa/novoUsuario")
    public ResponseEntity<String> criarNovoUsuarioEmpresa(@RequestBody UsuarioEmpresaDTO novoUsuarioEmpresaDTO){
        Boolean usuarioExistente = isUsuarioExistente(novoUsuarioEmpresaDTO.getLogin(), novoUsuarioEmpresaDTO.getEmail());
        Usuario novoUsuario = new Usuario();
        Integer tokenRandom = 0;
        if(!usuarioExistente){
            Date dataAtual = new Date();
            String dataCriacao = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            Calendar cal = Calendar.getInstance();
            cal.setTime(dataAtual);
            cal.add(Calendar.MONTH, 3);
            String dataExpiracao = Util.converterDataParaStringSemHora(cal.getTime(), "dd/MM/yyyy");

            novoUsuario.setNomeUsuario(novoUsuarioEmpresaDTO.getNomeUsuario());
            novoUsuario.setEmail(novoUsuarioEmpresaDTO.getEmail());
            novoUsuario.setLogin(novoUsuarioEmpresaDTO.getLogin());
            novoUsuario.setNivelConta(1);
            novoUsuario.setIs_Profissional(true);
            novoUsuario.setIs_Noivos(false);
            novoUsuario.setIs_PrimeiroAcesso(true);
            novoUsuario.setIs_Validado(false);
            novoUsuario.setDataCriacao(dataCriacao);
            novoUsuario.setDataExpiracao(dataExpiracao);

            novoUsuario.setSenha(passwordEncoder.encode(novoUsuarioEmpresaDTO.getSenha()));
            novoUsuario.setIs_SenhaExpirada(false);
            Random tokenSecurityGenerated = new Random();
            tokenRandom = tokenSecurityGenerated.nextInt();

            if(tokenRandom < 0){
                tokenRandom = tokenRandom * -1;
            }

            novoUsuario.setRandomToken(tokenRandom);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("exist");
        }

        Integer idNovoUsuario =  ResponseEntity.ok(repositorioUsuario.save(novoUsuario)).getBody().getIdUsuario();

        Profissional novoProfissional = popularDadosProfissional(novoUsuarioEmpresaDTO, idNovoUsuario);

        String tokenConviteUrl = tokenRandom + "_" + idNovoUsuario;
        novoProfissional.setTokenConvite(tokenRandom);
        novoProfissional.setTokenConviteUrl(tokenConviteUrl);

        if(novoUsuarioEmpresaDTO.getIs_CadastroPorConvite() != null && novoUsuarioEmpresaDTO.getIs_CadastroPorConvite()){
            Boolean isConviteValido = validarTokenConviteProfissional(novoUsuarioEmpresaDTO.getIdUsuarioConvite(), novoUsuarioEmpresaDTO.getTokenUsuarioConvite());
            if(isConviteValido){
                novoProfissional.setIs_CadastroPorConvite(true);
                novoProfissional.setIdUsuarioConvite(novoUsuarioEmpresaDTO.getIdUsuarioConvite());
            }
        }else{
            novoProfissional.setIs_CadastroPorConvite(false);
        }

        Integer idNovoProfissional =  ResponseEntity.ok(repositorioProfissional.save(novoProfissional)).getBody().getIdProfissional();

        String tokenUsuario = obterTokenPorIdUsuario(idNovoUsuario, idNovoProfissional);

        return ResponseEntity.status(HttpStatus.OK).body(tokenUsuario);
    }

    /**
     * Preenche os dados do Profissional
     * através dos parâmetros recebidos
     *
     */
    public Profissional popularDadosProfissional(UsuarioEmpresaDTO novoUsuarioEmpresaParam, Integer idUsuarioParam){
        Profissional profissional = new Profissional();

        profissional.setIdUsuario(idUsuarioParam);
        profissional.setNomeEmpresa(novoUsuarioEmpresaParam.getNomeEmpresa());
        profissional.setSegmento(novoUsuarioEmpresaParam.getSegmento());
        profissional.setEmail(novoUsuarioEmpresaParam.getEmail());
        profissional.setNumeroContato(novoUsuarioEmpresaParam.getNumeroContato());
        profissional.setIs_Whatsapp(novoUsuarioEmpresaParam.getIs_Whatsapp());
        profissional.setCidade(novoUsuarioEmpresaParam.getCidade());
        profissional.setEstado(novoUsuarioEmpresaParam.getEstado());
        profissional.setIs_CNPJ(novoUsuarioEmpresaParam.getIs_CNPJ());
        profissional.setNumeroCPF(novoUsuarioEmpresaParam.getNumeroCPF());
        profissional.setNumeroCNPJ(novoUsuarioEmpresaParam.getNumeroCNPJ());
        profissional.setNivelConta(novoUsuarioEmpresaParam.getNivelConta());
        profissional.setPontosAcumulados(0);
        profissional.setCasamentosBemSucedidos(0);
        profissional.setOrcamentosRecebidos(0);
        profissional.setVisitasVitrine(0);

        if(novoUsuarioEmpresaParam.getIs_CadastroPorConvite() != null && novoUsuarioEmpresaParam.getIs_CadastroPorConvite()){
            profissional.setIs_CadastroPorConvite(novoUsuarioEmpresaParam.getIs_CadastroPorConvite());
            profissional.setIdUsuarioConvite(novoUsuarioEmpresaParam.getIdUsuario());
        }

        return profissional;
    }

    /**
     * Verifica se o convite do usuário é válido
     *
     */
    public Boolean validarTokenConviteProfissional(Integer idProfissionalParam, Integer tokenProfissionalParam){
        Boolean isTokenValido = false;
        Optional<Profissional> profissionalOptional = repositorioProfissional.findAllByIdUsuario(idProfissionalParam);
        if(profissionalOptional == null || !profissionalOptional.isPresent()){
            isTokenValido = false;
        }
        Profissional profissional = profissionalOptional.get();
        if(profissional.getTokenConvite() == tokenProfissionalParam){
            isTokenValido = true;
        }

        return isTokenValido;
    }

    public DadosResumoPerfilProfissionalDTO popularDadosResumoPerfilProfissional(Usuario usuarioParam, Profissional profissionalParam){
        DadosResumoPerfilProfissionalDTO dadosResumoPerfilProfissionalDTO = new DadosResumoPerfilProfissionalDTO();
        String tipoUsuario = "";

        dadosResumoPerfilProfissionalDTO.setIdUsuario(profissionalParam.getIdUsuario());
        dadosResumoPerfilProfissionalDTO.setNomeUsuario(usuarioParam.getNomeUsuario());
        dadosResumoPerfilProfissionalDTO.setFotoPerfil(usuarioParam.getFotoPerfil());
        dadosResumoPerfilProfissionalDTO.setIdProfissional(profissionalParam.getIdProfissional());
        dadosResumoPerfilProfissionalDTO.setCidade(profissionalParam.getCidade());
        dadosResumoPerfilProfissionalDTO.setEstado(profissionalParam.getEstado());
        dadosResumoPerfilProfissionalDTO.setNomeEmpresa(profissionalParam.getNomeEmpresa());
        dadosResumoPerfilProfissionalDTO.setDescricaoEmpresa(profissionalParam.getDescricaoEmpresa());
        dadosResumoPerfilProfissionalDTO.setEmail(profissionalParam.getEmail());
        dadosResumoPerfilProfissionalDTO.setNumeroContato(profissionalParam.getNumeroContato());
        dadosResumoPerfilProfissionalDTO.setIs_Whatsapp(profissionalParam.getIs_Whatsapp());
        dadosResumoPerfilProfissionalDTO.setNumeroCPF(profissionalParam.getNumeroCPF());
        dadosResumoPerfilProfissionalDTO.setIs_CNPJ(profissionalParam.getIs_CNPJ());
        dadosResumoPerfilProfissionalDTO.setNumeroCNPJ(profissionalParam.getNumeroCNPJ());
        dadosResumoPerfilProfissionalDTO.setNivelConta(profissionalParam.getNivelConta());
        dadosResumoPerfilProfissionalDTO.setPontosAcumulados(profissionalParam.getPontosAcumulados());
        dadosResumoPerfilProfissionalDTO.setValorMinimo(profissionalParam.getValorMinimo());
        dadosResumoPerfilProfissionalDTO.setMaisDeUmEventoPorDia(profissionalParam.getMaisDeUmEventoPorDia());
        dadosResumoPerfilProfissionalDTO.setFormasDePagamento(profissionalParam.getFormasPagamento());
        dadosResumoPerfilProfissionalDTO.setTrabalhaSozinho(profissionalParam.getTrabalhaSozinho());
        dadosResumoPerfilProfissionalDTO.setTokenConvite(profissionalParam.getTokenConvite());
        dadosResumoPerfilProfissionalDTO.setCasamentosBemSucedidos(profissionalParam.getCasamentosBemSucedidos());
        dadosResumoPerfilProfissionalDTO.setClassificacao(profissionalParam.getClassificacao());
        dadosResumoPerfilProfissionalDTO.setOrcamentosRecebidos(profissionalParam.getOrcamentosRecebidos());
        dadosResumoPerfilProfissionalDTO.setVisitasVitrine(profissionalParam.getVisitasVitrine());

        if(usuarioParam.getIs_Noivos()){ tipoUsuario = "noivos"; }
        else{ tipoUsuario = "profissional"; }

        dadosResumoPerfilProfissionalDTO.setTipoUsuario(tipoUsuario);

        return dadosResumoPerfilProfissionalDTO;
    }

    @GetMapping(path = "/api/usuario/empresa/obterDadosPerfil")
    public ResponseEntity<DadosResumoPerfilProfissionalDTO> obterDadosResumoPerfilProfissionalPorIdUsuario(@RequestParam Integer idUsuario, @RequestParam Integer idProfissional){
        DadosResumoPerfilProfissionalDTO dadosResumoPerfilProfissionalDTO = new DadosResumoPerfilProfissionalDTO();
        Usuario usuario = new Usuario();
        Profissional profissional;

        ResponseEntity dadosUsuario = repositorioUsuario.findByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());


        ResponseEntity dadosProfissional = repositorioProfissional.findByIdProfissional(idProfissional)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null &&
                dadosProfissional != null && dadosProfissional.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            profissional = (Profissional) dadosProfissional.getBody();

            String nomeUltimoProfissionalSorteado = "--";
            Collection<FeedbackProfissional> listFeedbacksProfissional = new ArrayList<>();
            Sorteio ultimoProfissionalSorteado = repositorioSorteio.obterUltimoProfissionalSorteado();

            if(ultimoProfissionalSorteado != null){
                nomeUltimoProfissionalSorteado = ultimoProfissionalSorteado.getNomeGanhador();
            }

            dadosResumoPerfilProfissionalDTO = popularDadosResumoPerfilProfissional(usuario, profissional);
            dadosResumoPerfilProfissionalDTO.setFeedbacksRecebidos(listFeedbacksProfissional.size());
            dadosResumoPerfilProfissionalDTO.setUltimoGanhadorSorteio(nomeUltimoProfissionalSorteado);

        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok().body(dadosResumoPerfilProfissionalDTO);
    }

    @PutMapping(path = "/api/empresa/dadosPerfil/atualizarDados")
    public String atualizarDadosProfissionalPorIdUsuario(@RequestParam Integer idUsuario, @RequestParam Integer idProfissional, @RequestBody DadosResumoPerfilProfissionalDTO dadosAtualizados){
        Usuario usuarioAtualizado = new Usuario();
        Profissional profissionalAtualizado = new Profissional();

        ResponseEntity dadosUsuario = repositorioUsuario.findByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        ResponseEntity dadosProfissional = repositorioProfissional.findByIdProfissional(idProfissional)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null &&
            dadosProfissional != null && dadosProfissional.getBody() != null){
            usuarioAtualizado = (Usuario) dadosUsuario.getBody();
            profissionalAtualizado = (Profissional) dadosProfissional.getBody();
        }

        usuarioAtualizado.setNomeUsuario(dadosAtualizados.getNomeUsuario());
        usuarioAtualizado.setEmail(dadosAtualizados.getEmail());

        profissionalAtualizado.setCidade(dadosAtualizados.getCidade());
        profissionalAtualizado.setEstado(dadosAtualizados.getEstado());
        profissionalAtualizado.setNomeEmpresa(dadosAtualizados.getNomeEmpresa());
        profissionalAtualizado.setDescricaoEmpresa(dadosAtualizados.getDescricaoEmpresa());
        profissionalAtualizado.setEmail(dadosAtualizados.getEmail());
        profissionalAtualizado.setNumeroContato(dadosAtualizados.getNumeroContato());
        profissionalAtualizado.setIs_Whatsapp(dadosAtualizados.getIs_Whatsapp());
        profissionalAtualizado.setIs_CNPJ(dadosAtualizados.getIs_CNPJ());
        profissionalAtualizado.setNumeroCPF(dadosAtualizados.getNumeroCPF());
        profissionalAtualizado.setNumeroCNPJ(dadosAtualizados.getNumeroCNPJ());
        profissionalAtualizado.setValorMinimo(dadosAtualizados.getValorMinimo());
        profissionalAtualizado.setFormasPagamento(dadosAtualizados.getFormasDePagamento());
        profissionalAtualizado.setMaisDeUmEventoPorDia(dadosAtualizados.getMaisDeUmEventoPorDia());
        profissionalAtualizado.setTrabalhaSozinho(dadosAtualizados.getTrabalhaSozinho());

        repositorioProfissional.save(profissionalAtualizado);
        repositorioUsuario.save(usuarioAtualizado);
        String token = obterTokenPorIdUsuario(idUsuario, dadosAtualizados.getIdProfissional());
        return token;
    }


    public String obterTokenPorIdUsuario(Integer idUsuario, Integer idTipoUsuario){
        String tokenAcesso = "";
        Optional<Usuario> usuarioOptional = repositorioUsuario.findByIdUsuario(idUsuario);
        Usuario usuario  = usuarioOptional.get();

        if(usuarioOptional != null || usuarioOptional.isPresent()){
            String tipoUsuario;
            if(usuario.getIs_Noivos()) { tipoUsuario = "noivos"; }
            else { tipoUsuario = "profissional"; }
            tokenAcesso = tipoUsuario +"."+ usuario.getIdUsuario() +"."+ idTipoUsuario + "."+ usuario.getRandomToken();
        }

        return tokenAcesso;
    }

    public Boolean isUsuarioExistente(String login, String email){
        if (email.equals("")){ email = "@.com"; }
        ResponseEntity usuarioEncontrato = repositorioUsuario.findAllByLoginOrEmail(login, email)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(usuarioEncontrato.getBody() != null){
            return true;
        }else{
            return false;
        }
    }

    public Profissional obterProfissionalPorId(Integer idProfissionalParam){
        ResponseEntity profissionalEncontrato = repositorioProfissional.findAllByIdUsuario(idProfissionalParam)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());


        Profissional profissional = new Profissional();

        if(profissionalEncontrato != null && profissionalEncontrato.getBody() != null){
            profissional = (Profissional) profissionalEncontrato.getBody();
        }else{
            profissional = null;
        }

        return profissional;
    }



    // -----------------------------------------------------------------------------------------------------------------
    // ---------- NOIVOS -----------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------

    @PostMapping(path = "/api/usuario/noivos/novoUsuario")
    public ResponseEntity<String> criarNovoUsuarioNoivos(@RequestBody UsuarioNoivosDTO novoUsuarioNoivosDTO){
        Boolean usuarioExistente = isUsuarioExistente(novoUsuarioNoivosDTO.getLogin(), novoUsuarioNoivosDTO.getEmail());
        Usuario novoUsuario = new Usuario();
        Integer tokenRandom = 0;
        if(!usuarioExistente){
            Date dataAtual = new Date();
            String dataCriacao = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            Calendar cal = Calendar.getInstance();
            cal.setTime(dataAtual);
            cal.add(Calendar.MONTH, 3);
            String dataExpiracao = Util.converterDataParaStringSemHora(cal.getTime(), "dd/MM/yyyy");

            novoUsuario.setNomeUsuario(novoUsuarioNoivosDTO.getNomeUsuario());
            novoUsuario.setEmail(novoUsuarioNoivosDTO.getEmail());
            novoUsuario.setLogin(novoUsuarioNoivosDTO.getLogin());
            novoUsuario.setIs_Profissional(false);
            novoUsuario.setIs_Noivos(true);
            novoUsuario.setIs_PrimeiroAcesso(true);
            novoUsuario.setIs_Validado(false);
            novoUsuario.setDataCriacao(dataCriacao);
            novoUsuario.setDataExpiracao(dataExpiracao);

            novoUsuario.setSenha(passwordEncoder.encode(novoUsuarioNoivosDTO.getSenha()));
            novoUsuario.setIs_SenhaExpirada(false);
            Random tokenSecurityGenerated = new Random();
            tokenRandom = tokenSecurityGenerated.nextInt();

            if(tokenRandom < 0){
                tokenRandom = tokenRandom * -1;
            }

            novoUsuario.setRandomToken(tokenRandom);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("exist");
        }

        Integer idNovoUsuario =  ResponseEntity.ok(repositorioUsuario.save(novoUsuario)).getBody().getIdUsuario();
        Noivos novoNoivos = popularDadosNoivos(novoUsuarioNoivosDTO, idNovoUsuario);

        if(novoUsuarioNoivosDTO.getIs_CadastroPorConvite() != null && novoUsuarioNoivosDTO.getIs_CadastroPorConvite()){
            Boolean isConviteValido = validarTokenConviteProfissional(novoUsuarioNoivosDTO.getIdUsuarioConvite(), novoUsuarioNoivosDTO.getTokenUsuarioConvite());
            if(isConviteValido){
                novoNoivos.setIs_CadastroPorConvite(true);
                novoNoivos.setIdUsuarioConvite(novoUsuarioNoivosDTO.getIdUsuarioConvite());
            }
        }else{
            novoNoivos.setIs_CadastroPorConvite(false);
        }

        Integer idNoivos =  ResponseEntity.ok(repositorioNoivos.save(novoNoivos)).getBody().getIdNoivos();
        String tokenUsuario = obterTokenPorIdUsuario(idNovoUsuario, idNoivos);

        return ResponseEntity.status(HttpStatus.OK).body(tokenUsuario);
    }

    @GetMapping(path = "/api/usuario/noivos/obterDadosPerfil")
    public ResponseEntity<DadosResumoPerfilNoivosDTO> obterDadosResumoPerfilNoivosPorIdUsuario(@RequestParam Integer idUsuario, @RequestParam Integer idNoivos){
        DadosResumoPerfilNoivosDTO dadosResumoPerfilNoivosDTO = new DadosResumoPerfilNoivosDTO();
        Usuario usuario = new Usuario();
        Noivos noivx = new Noivos();

        ResponseEntity dadosUsuario = repositorioUsuario.findByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());


        ResponseEntity dadosNoivx = repositorioNoivos.findAllByIdNoivos(idNoivos)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null &&
                dadosNoivx != null && dadosNoivx.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            noivx = (Noivos) dadosNoivx.getBody();
            dadosResumoPerfilNoivosDTO = popularDadosResumoPerfilNoivosDTO(usuario, noivx);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String nomeUltimoNoivSorteado = "--";
        Sorteio ultimoNoivSorteado = repositorioSorteio.obterUltimoNoivSorteado();

        if(ultimoNoivSorteado != null){
            nomeUltimoNoivSorteado = ultimoNoivSorteado.getNomeGanhador();
        }

        dadosResumoPerfilNoivosDTO.setUltimoGanhadorSorteio(nomeUltimoNoivSorteado);

        return ResponseEntity.ok().body(dadosResumoPerfilNoivosDTO);
    }

    @PutMapping(path = "/api/noivos/dadosPerfil/atualizarDados")
    public String atualizarDadosNoivosPorIdUsuario(@RequestParam Integer idUsuario, @RequestParam Integer idNoivos, @RequestBody DadosResumoPerfilNoivosDTO dadosAtualizados){
        Usuario usuarioAtualizado = new Usuario();
        Noivos noivosAtualizado = new Noivos();

        ResponseEntity dadosUsuario = repositorioUsuario.findByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        ResponseEntity dadosNoivos = repositorioNoivos.findAllByIdNoivos(idNoivos)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null &&
                dadosNoivos != null && dadosNoivos.getBody() != null){
            usuarioAtualizado = (Usuario) dadosUsuario.getBody();
            noivosAtualizado = (Noivos) dadosNoivos.getBody();
        }

        usuarioAtualizado.setNomeUsuario(dadosAtualizados.getNomeUsuario());
        usuarioAtualizado.setEmail(dadosAtualizados.getEmail());

        noivosAtualizado.setCidade(dadosAtualizados.getCidade());
        noivosAtualizado.setEstado(dadosAtualizados.getEstado());
        noivosAtualizado.setEmail(dadosAtualizados.getEmail());
        noivosAtualizado.setNumeroContato(dadosAtualizados.getNumeroContato());
        noivosAtualizado.setIs_Whatsapp(dadosAtualizados.getIs_Whatsapp());

        repositorioNoivos.save(noivosAtualizado);
        repositorioUsuario.save(usuarioAtualizado);
        String token = obterTokenPorIdUsuario(idUsuario, dadosAtualizados.getIdNoivX());
        return token;
    }

    public Noivos popularDadosNoivos(UsuarioNoivosDTO usuarioNoivosDTO, Integer idNoivosParam){
        Noivos noivos = new Noivos();
        noivos.setIdUsuario(idNoivosParam);
        noivos.setNomeNoiv(usuarioNoivosDTO.getNomeUsuario());
        if(usuarioNoivosDTO.getIs_Noiva()){
            noivos.setIs_Noiva(true);
        }else{
            noivos.setIs_Noiva(false);
        }

        noivos.setEmail(usuarioNoivosDTO.getEmail());
        noivos.setCidade(usuarioNoivosDTO.getCidade());
        noivos.setEstado(usuarioNoivosDTO.getEstado());
        noivos.setDataCasamento(usuarioNoivosDTO.getDataCasamento());
        noivos.setPontosAcumulados(0);

        if(usuarioNoivosDTO.getIs_CadastroPorConvite() != null && usuarioNoivosDTO.getIs_CadastroPorConvite()){
            noivos.setIs_CadastroPorConvite(true);
            noivos.setIdUsuarioConvite(usuarioNoivosDTO.getIdUsuarioConvite());
        }else{
            noivos.setIs_CadastroPorConvite(false);
        }

        return noivos;
    }

    public DadosResumoPerfilNoivosDTO popularDadosResumoPerfilNoivosDTO(Usuario usuarioParam, Noivos noivosParam){
        DadosResumoPerfilNoivosDTO dadosResumoPerfilNoivosDTO = new DadosResumoPerfilNoivosDTO();

        dadosResumoPerfilNoivosDTO.setIdUsuario(usuarioParam.getIdUsuario());
        dadosResumoPerfilNoivosDTO.setIdNoivX(noivosParam.getIdNoivos());
        dadosResumoPerfilNoivosDTO.setFotoPerfil(usuarioParam.getFotoPerfil());
        dadosResumoPerfilNoivosDTO.setCidade(noivosParam.getCidade());
        dadosResumoPerfilNoivosDTO.setEstado(noivosParam.getEstado());
        dadosResumoPerfilNoivosDTO.setNomeUsuario(usuarioParam.getNomeUsuario());
        dadosResumoPerfilNoivosDTO.setDataCasamento(noivosParam.getDataCasamento());
        dadosResumoPerfilNoivosDTO.setIs_Whatsapp(noivosParam.getIs_Whatsapp());
        dadosResumoPerfilNoivosDTO.setNumeroContato(noivosParam.getNumeroContato());
        dadosResumoPerfilNoivosDTO.setPontosAcumulados(noivosParam.getPontosAcumulados());
        dadosResumoPerfilNoivosDTO.setEmail(usuarioParam.getEmail());
        dadosResumoPerfilNoivosDTO.setTipoUsuario("");
        dadosResumoPerfilNoivosDTO.setTokenConvite(0);

        return dadosResumoPerfilNoivosDTO;
    }
}
