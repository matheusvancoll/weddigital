package com.vancollstudios.WedDigital.model.cursos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "CURSOS_PROFISSIONAL")
public class AulasProfissional {

    @Id
    @GeneratedValue
    private Integer idCurso;

    @Column
    private String nomeCurso;

    @Column
    private String capaCurso;

    @Column
    private String descricao;

    @Column
    private String link;

    @Column
    private Integer restrincao;

    public Integer getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    public String getNomeCurso() {
        return nomeCurso;
    }

    public void setNomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
    }

    public String getCapaCurso() {
        return capaCurso;
    }

    public void setCapaCurso(String capaCurso) {
        this.capaCurso = capaCurso;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Integer getRestrincao() {
        return restrincao;
    }

    public void setRestrincao(Integer restrincao) {
        this.restrincao = restrincao;
    }
}
