package com.vancollstudios.WedDigital.controlador.pontuacao;

import com.vancollstudios.WedDigital.model.usuarios.Noivos;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioNoivos;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorPontuacao {

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @Autowired
    RepositorioNoivos repositorioNoivos;

    @GetMapping(path = "/api/pontuacao/sorteioProfissional/gerar")
    public Profissional gerarSorteioProfissional() {

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

        return (Profissional) profissionalSorteado;
    }

    @GetMapping(path = "/api/pontuacao/sorteioNoivos/gerar")
    public Noivos gerarSorteioNoivos() {
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

        return (Noivos) NoivosSorteado;
    }
}
