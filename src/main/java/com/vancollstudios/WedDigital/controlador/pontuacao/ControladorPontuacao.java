package com.vancollstudios.WedDigital.controlador.pontuacao;

import com.vancollstudios.WedDigital.model.sorteios.DadosResumoSorteioDTO;
import com.vancollstudios.WedDigital.model.sorteios.Sorteio;
import com.vancollstudios.WedDigital.model.usuarios.Noivos;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.sorteios.RepositorioSorteio;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioNoivos;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorPontuacao {

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioNoivos repositorioNoivos;

    @Autowired
    RepositorioSorteio repositorioSorteio;

    @Autowired
    RepositorioUsuario repositorioUsuario;

    @GetMapping(path = "/api/pontuacao/sorteioProfissional/gerar")
    public DadosResumoSorteioDTO gerarSorteioProfissional() {

        Collection<Profissional> listaProfissionais = new ArrayList<Profissional>();
        Collection<Profissional> listaSorteioProfissionais = new ArrayList<Profissional>();

        listaProfissionais = (Collection<Profissional>) repositorioProfissional.findAll();

        for(Profissional profissional : listaProfissionais){
            if (profissional.getPontosAcumulados() != null && profissional.getPontosAcumulados() > 0){
                for (int i = 0; i < profissional.getPontosAcumulados(); i++) {
                    listaSorteioProfissionais.add(profissional);
                }
            }else {
                listaSorteioProfissionais.add(profissional);
            }
        }

        int numeroSorteado = 0;
        boolean isNumeroValido = false;
        Random geradorNumeroAleatorio = new Random();

        do {
            numeroSorteado = geradorNumeroAleatorio.nextInt(listaSorteioProfissionais.size());

            if(numeroSorteado >= 0 && numeroSorteado < listaSorteioProfissionais.size()){
                isNumeroValido = true;
            }
        }while (!isNumeroValido);

        Object[] listaSorteioProfissionaisArr = listaSorteioProfissionais.toArray();
        Object profissionalSorteado = listaSorteioProfissionaisArr[numeroSorteado];
        Profissional profissional = (Profissional) profissionalSorteado;

        Sorteio sorteio = new Sorteio();
        sorteio.setDataSorteio(LocalDateTime.now());
        sorteio.setNomeGanhador(profissional.getNomeEmpresa());
        sorteio.setProfissional(true);
        sorteio.setNoivos(false);
        sorteio.setIdGanhador(profissional.getIdUsuario());
        repositorioSorteio.save(sorteio);

        Optional<Usuario> usuarioOptional = repositorioUsuario.findByIdUsuario(profissional.getIdUsuario());
        DadosResumoSorteioDTO dadosResumoSorteioDTO = new DadosResumoSorteioDTO();
        Usuario usuario = new Usuario();

        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
            dadosResumoSorteioDTO.setDataCriacao(usuario.getDataCriacao());
            dadosResumoSorteioDTO.setImagemPefil(usuario.getFotoPerfil());
        }else{
            dadosResumoSorteioDTO.setImagemPefil("");
            dadosResumoSorteioDTO.setDataCriacao("");
        }

        Date dataHoraAtual = new Date();
        String data = new SimpleDateFormat("dd/MM/yyyy").format(dataHoraAtual);
        String hora = new SimpleDateFormat("HH:mm:ss").format(dataHoraAtual);

        String dataHoraSorteio = data + " " + hora;

        dadosResumoSorteioDTO.setNomeGanhador(profissional.getNomeEmpresa());
        dadosResumoSorteioDTO.setDataHoraSorteio(dataHoraSorteio);
        dadosResumoSorteioDTO.setPontosAcumulados(profissional.getPontosAcumulados());
        dadosResumoSorteioDTO.setNoivos(false);
        dadosResumoSorteioDTO.setNomeConjuge(null);

        return dadosResumoSorteioDTO;
    }

    @GetMapping(path = "/api/pontuacao/sorteioNoivos/gerar")
    public DadosResumoSorteioDTO gerarSorteioNoivos() {
        Collection<Noivos> listaNoivos = new ArrayList<Noivos>();
        Collection<Noivos> listaSorteioNoivos = new ArrayList<Noivos>();

        listaNoivos = (Collection<Noivos>) repositorioNoivos.findAll();

        for(Noivos noivos : listaNoivos){
            if (noivos.getPontosAcumulados() != null && noivos.getPontosAcumulados() > 0){
                for (int i = 0; i < noivos.getPontosAcumulados(); i++) {
                    listaSorteioNoivos.add(noivos);
                }
            }else {
                listaSorteioNoivos.add(noivos);
            }
        }

        int numeroSorteado = 0;
        boolean isNumeroValido = false;
        Random geradorNumeroAleatorio = new Random();

        do {
            numeroSorteado = geradorNumeroAleatorio.nextInt(listaSorteioNoivos.size());

            if(numeroSorteado >= 0 && numeroSorteado < listaSorteioNoivos.size()){
                isNumeroValido = true;
            }
        }while (!isNumeroValido);

        Object[] listaSorteioNoivosArr = listaSorteioNoivos.toArray();
        Object NoivosSorteado = listaSorteioNoivosArr[numeroSorteado];

        Noivos noivos = (Noivos) NoivosSorteado;

        Sorteio sorteio = new Sorteio();
        sorteio.setDataSorteio(LocalDateTime.now());
        sorteio.setNomeGanhador(noivos.getNomeNoiv());
        sorteio.setProfissional(false);
        sorteio.setNoivos(true);
        sorteio.setIdGanhador(noivos.getIdUsuario());
        repositorioSorteio.save(sorteio);

        Optional<Usuario> usuarioOptional = repositorioUsuario.findByIdUsuario(noivos.getIdUsuario());
        DadosResumoSorteioDTO dadosResumoSorteioDTO = new DadosResumoSorteioDTO();
        Usuario usuario = new Usuario();

        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
            dadosResumoSorteioDTO.setDataCriacao(usuario.getDataCriacao());
            dadosResumoSorteioDTO.setImagemPefil(usuario.getFotoPerfil());
        }else{
            dadosResumoSorteioDTO.setImagemPefil("");
            dadosResumoSorteioDTO.setDataCriacao("");
        }

        Date dataHoraAtual = new Date();
        String data = new SimpleDateFormat("dd/MM/yyyy").format(dataHoraAtual);
        String hora = new SimpleDateFormat("HH:mm:ss").format(dataHoraAtual);

        String dataHoraSorteio = data + " " + hora;

        dadosResumoSorteioDTO.setNomeGanhador(noivos.getNomeNoiv());
        dadosResumoSorteioDTO.setDataHoraSorteio(dataHoraSorteio);
        dadosResumoSorteioDTO.setPontosAcumulados(noivos.getPontosAcumulados());
        dadosResumoSorteioDTO.setNoivos(true);
        dadosResumoSorteioDTO.setNomeConjuge(noivos.getNomeConjuge());

        return dadosResumoSorteioDTO;
    }


}
