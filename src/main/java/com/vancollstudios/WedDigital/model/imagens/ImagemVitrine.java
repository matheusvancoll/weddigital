package com.vancollstudios.WedDigital.model.imagens;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "IMAGENS_VITRINE")
public class ImagemVitrine {

    @Id
    @GeneratedValue
    private Integer idImagem;
    private String nomeImagem;
    private Integer idProfissional;

    public Integer getIdImagem() {
        return idImagem;
    }

    public void setIdImagem(Integer idImagem) {
        this.idImagem = idImagem;
    }

    public String getNomeImagem() {
        return nomeImagem;
    }

    public void setNomeImagem(String nomeImagem) {
        this.nomeImagem = nomeImagem;
    }

    public Integer getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(Integer idProfissional) {
        this.idProfissional = idProfissional;
    }
}
