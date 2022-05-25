package com.vancollstudios.WedDigital.model.imagens;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "IMAGENS_PERFIL")
public class ImagemPerfil {
    @Id
    @GeneratedValue
    private Integer idImagem;

    @Column
    private Integer idUsuario;

    @Column
    private String caminhoImagem;

    @Column
    private String nomeArquivo;

    public Integer getIdImagem() {
        return idImagem;
    }

    public void setIdImagem(Integer idImagem) {
        this.idImagem = idImagem;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getCaminhoImagem() {
        return caminhoImagem;
    }

    public void setCaminhoImagem(String caminhoImagem) {
        this.caminhoImagem = caminhoImagem;
    }

    public String getNomeArquivo() {
        return nomeArquivo;
    }

    public void setNomeArquivo(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }
}
