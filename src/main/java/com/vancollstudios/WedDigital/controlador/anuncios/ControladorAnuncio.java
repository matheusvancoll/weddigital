package com.vancollstudios.WedDigital.controlador.anuncios;

import com.vancollstudios.WedDigital.model.anuncios.Anuncio;
import com.vancollstudios.WedDigital.repositorio.anuncios.RepositorioAnuncio;
import com.vancollstudios.WedDigital.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

@RestController
public class ControladorAnuncio {

    @Autowired
    RepositorioAnuncio repositorioAnuncio;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/api/anuncio/buscarTodos")
    public Iterable<Anuncio> buscarTodosAnuncios(){
        return repositorioAnuncio.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/api/anuncio/{idAnuncio}")
    public ResponseEntity buscarAnuncioPeloIdFornecedor(@PathVariable("idAnuncio") Integer idAnuncio){
        ResponseEntity anuncioEncontrado = repositorioAnuncio.findAllByIdAnuncio(idAnuncio)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
        return anuncioEncontrado;
    }

    @PostMapping(path = "/api/anuncio/salvar")
    public Anuncio criarNovoAnuncio(@RequestBody Anuncio novoAnuncioParam){
        Anuncio novoAnuncio = novoAnuncioParam;

        if (novoAnuncio != null){
            Date dataAtual = new Date();
            String dataCriacao = Util.converterDataParaStringSemHora(dataAtual, "dd/MM/yyyy");
            String dataExpiracao = "";

            if (novoAnuncio.getDataExpiracao() == null || dataCriacao != ""){
                Calendar cal = Calendar.getInstance();
                cal.setTime(dataAtual);
                cal.add(Calendar.MONTH, 3);
                dataExpiracao = Util.converterDataParaStringSemHora(cal.getTime(), "dd/MM/yyyy");
            }
            novoAnuncio.setDataCriacao(dataCriacao);
            novoAnuncio.setDataExpiracao(dataExpiracao);

            if (novoAnuncio.getEmail() == null){
                novoAnuncio.setEmail("");
            }

        }

        return repositorioAnuncio.save(novoAnuncio);
    }

}
