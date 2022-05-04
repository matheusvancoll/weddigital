package com.vancollstudios.WedDigital.controlador.usuarios;

import com.vancollstudios.WedDigital.controlador.casamentos.ControladorCasamento;
import com.vancollstudios.WedDigital.model.usuarios.*;
import com.vancollstudios.WedDigital.model.usuarios.DTO.DadosResumoPerfilProfissionalDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.UsuarioEmpresaDTO;
import com.vancollstudios.WedDigital.model.usuarios.DTO.UsuarioNoivosDTO;
import com.vancollstudios.WedDigital.repositorio.casamentos.RepositorioCasamento;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControladorUsuario {

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioNoivos repositorioNoivos;

    @Autowired
    RepositorioCasamento repositorioCasamento;

    @Autowired
    ControladorCasamento controladorCasamento;

    @Autowired
    PasswordEncoder passwordEncoder;


//    @GetMapping(path = "/api/usuario/buscarTodosUsuarios")
//    public Iterable<Usuario> buscarTodosUsuarios(){
//        return repositorioUsuario.findAll();
//    }


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
            String tipoUsuario;
            if(usuario.getIs_Noivos()){ tipoUsuario = "noivos"; }
            else{ tipoUsuario = "profissional"; }
            tokenAcesso = tipoUsuario +"."+ usuario.getIdUsuario() +"."+ usuario.getNomeUsuario() +"."+ usuario.getNivelConta() +"."+ usuario.getDataCriacao() +"."+ usuario.getRandomToken();
            Date dataAtual = new Date();
            String dataAcesso = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            usuario.setUltimoAcesso(dataAcesso);
            repositorioUsuario.save(usuario);
        }

        HttpStatus status = isAcessoValido ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return ResponseEntity.status(status).body(tokenAcesso);
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

        ResponseEntity.ok(repositorioProfissional.save(novoProfissional));

        String tokenUsuario = obterTokenPorIdUsuario(idNovoUsuario);

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
        profissional.setNumeroCNPJ(novoUsuarioEmpresaParam.getNumeroCNPJ());
        profissional.setNivelConta(novoUsuarioEmpresaParam.getNivelConta());
        profissional.setPontosAcumulados(0);
        profissional.setCasamentosBemSucedidos(0);
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
        dadosResumoPerfilProfissionalDTO.setIdProfissional(profissionalParam.getIdProfissional());
        dadosResumoPerfilProfissionalDTO.setCidade(profissionalParam.getCidade());
        dadosResumoPerfilProfissionalDTO.setEstado(profissionalParam.getEstado());
        dadosResumoPerfilProfissionalDTO.setNomeEmpresa(profissionalParam.getNomeEmpresa());
        dadosResumoPerfilProfissionalDTO.setDescricaoEmpresa(profissionalParam.getDescricaoEmpresa());
        dadosResumoPerfilProfissionalDTO.setEmail(profissionalParam.getEmail());
        dadosResumoPerfilProfissionalDTO.setNumeroContato(profissionalParam.getNumeroContato());
        dadosResumoPerfilProfissionalDTO.setIs_Whatsapp(profissionalParam.getIs_Whatsapp());
        dadosResumoPerfilProfissionalDTO.setIs_CNPJ(profissionalParam.getIs_CNPJ());
        dadosResumoPerfilProfissionalDTO.setNumeroCNPJ(profissionalParam.getNumeroCNPJ());
        dadosResumoPerfilProfissionalDTO.setNivelConta(profissionalParam.getNivelConta());
        dadosResumoPerfilProfissionalDTO.setPontosAcumulados(profissionalParam.getPontosAcumulados());
        dadosResumoPerfilProfissionalDTO.setCasamentosBemSucedidos(profissionalParam.getCasamentosBemSucedidos());
        dadosResumoPerfilProfissionalDTO.setValorMinimo(profissionalParam.getValorMinimo());
        dadosResumoPerfilProfissionalDTO.setMaisDeUmEventoPorDia(profissionalParam.getMaisDeUmEventoPorDia());
        dadosResumoPerfilProfissionalDTO.setFormasDePagamento(profissionalParam.getFormasPagamento());
        dadosResumoPerfilProfissionalDTO.setTrabalhaSozinho(profissionalParam.getTrabalhaSozinho());
        dadosResumoPerfilProfissionalDTO.setClassificacao(profissionalParam.getClassificacao());
        dadosResumoPerfilProfissionalDTO.setTokenConvite(profissionalParam.getTokenConvite());

        if(usuarioParam.getIs_Noivos()){ tipoUsuario = "noivos"; }
        else{ tipoUsuario = "profissional"; }

        dadosResumoPerfilProfissionalDTO.setTipoUsuario(tipoUsuario);

        return dadosResumoPerfilProfissionalDTO;
    }

    @GetMapping(path = "/api/usuario/empresa/obterDadosPerfil")
    public ResponseEntity<DadosResumoPerfilProfissionalDTO> obterDadosResumoPerfilPorIdUsuario(@RequestParam Integer idUsuario, @RequestParam Integer tokenUsuario){
        DadosResumoPerfilProfissionalDTO dadosResumoPerfilProfissionalDTO = new DadosResumoPerfilProfissionalDTO();
        Usuario usuario = new Usuario();
        Profissional profissional;

        ResponseEntity dadosUsuario = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            if(!Objects.equals(tokenUsuario, usuario.getRandomToken())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }

        ResponseEntity dadosProfissional = repositorioProfissional.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(usuario != null && dadosProfissional != null && dadosProfissional.getBody() != null){
            usuario = (Usuario) dadosUsuario.getBody();
            profissional = (Profissional) dadosProfissional.getBody();
            dadosResumoPerfilProfissionalDTO = popularDadosResumoPerfilProfissional(usuario, profissional);
        }

        return ResponseEntity.ok().body(dadosResumoPerfilProfissionalDTO);
    }

    @PutMapping(path = "/api/dadosPerfil/atualizarDados/{idUsuario}")
    public String atualizarDadosUsuarioPorIdUsuario(@PathVariable("idUsuario") Integer idUsuario, @RequestBody DadosResumoPerfilProfissionalDTO dadosAtualizados){
        Usuario usuarioAtualizado = new Usuario();

        ResponseEntity dadosUsuario = repositorioUsuario.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());

        if(dadosUsuario != null && dadosUsuario.getBody() != null){
            usuarioAtualizado = (Usuario) dadosUsuario.getBody();
        }

        Profissional profissionalAtualizado = new Profissional();

        usuarioAtualizado.setIdUsuario(dadosAtualizados.getIdUsuario());
        usuarioAtualizado.setNomeUsuario(dadosAtualizados.getNomeUsuario());
        usuarioAtualizado.setEmail(dadosAtualizados.getEmail());

        profissionalAtualizado.setIdUsuario(dadosAtualizados.getIdUsuario());
        profissionalAtualizado.setIdProfissional(dadosAtualizados.getIdProfissional());
        profissionalAtualizado.setCidade(dadosAtualizados.getCidade());
        profissionalAtualizado.setEstado(dadosAtualizados.getEstado());
        profissionalAtualizado.setNomeEmpresa(dadosAtualizados.getNomeEmpresa());
        profissionalAtualizado.setDescricaoEmpresa(dadosAtualizados.getDescricaoEmpresa());
        profissionalAtualizado.setEmail(dadosAtualizados.getEmail());
        profissionalAtualizado.setNumeroContato(dadosAtualizados.getNumeroContato());
        profissionalAtualizado.setIs_Whatsapp(dadosAtualizados.getIs_Whatsapp());
        profissionalAtualizado.setIs_CNPJ(dadosAtualizados.getIs_CNPJ());
        profissionalAtualizado.setNumeroCNPJ(dadosAtualizados.getNumeroCNPJ());
        profissionalAtualizado.setValorMinimo(dadosAtualizados.getValorMinimo());
        profissionalAtualizado.setFormasPagamento(dadosAtualizados.getFormasDePagamento());
        profissionalAtualizado.setMaisDeUmEventoPorDia(dadosAtualizados.getMaisDeUmEventoPorDia());
        profissionalAtualizado.setTrabalhaSozinho(dadosAtualizados.getTrabalhaSozinho());

        repositorioProfissional.save(profissionalAtualizado);
        repositorioUsuario.save(usuarioAtualizado);
        String token = obterTokenPorIdUsuario(idUsuario);
        return token;
    }

    public String obterTokenPorIdUsuario(Integer idUsuario){
        String tokenAcesso = "";
        Optional<Usuario> usuarioOptional = repositorioUsuario.findAllByIdUsuario(idUsuario);
        Usuario usuario  = usuarioOptional.get();

        if(usuarioOptional != null || usuarioOptional.isPresent()){
            String tipoUsuario;
            if(usuario.getIs_Noivos()){ tipoUsuario = "noivos"; }
            else{ tipoUsuario = "profissional"; }
            tokenAcesso = tipoUsuario +"."+ usuario.getIdUsuario() +"."+ usuario.getNomeUsuario() +"."+ usuario.getNivelConta() +"."+ usuario.getDataCriacao() +"."+ usuario.getRandomToken();
        }

        return tokenAcesso;
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

        ResponseEntity.ok(repositorioNoivos.save(novoNoivos));
        String tokenUsuario = obterTokenPorIdUsuario(idNovoUsuario);

        return ResponseEntity.status(HttpStatus.OK).body(tokenUsuario);
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

        if(usuarioNoivosDTO.getIs_CadastroPorConvite() != null && usuarioNoivosDTO.getIs_CadastroPorConvite()){
            noivos.setIs_CadastroPorConvite(true);
            noivos.setIdUsuarioConvite(usuarioNoivosDTO.getIdUsuarioConvite());
        }else{
            noivos.setIs_CadastroPorConvite(false);
        }

        return noivos;
    }
}
