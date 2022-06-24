package com.vancollstudios.WedDigital.model.sorteios;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Date;

@Entity(name = "SORTEIOS")
public class Sorteio {

    @Id
    @GeneratedValue
    private Integer idSorteio;

    @Column
    private Date dataSorteio;

    @Column
    private Integer idGanhador;

    @Column
    private String nomeGanhador;

    @Column
    private Boolean isProfissional;

    @Column
    private Boolean isNoivos;

    public Integer getIdSorteio() {
        return idSorteio;
    }

    public void setIdSorteio(Integer idSorteio) {
        this.idSorteio = idSorteio;
    }

    public Date getDataSorteio() {
        return dataSorteio;
    }

    public void setDataSorteio(Date dataSorteio) {
        this.dataSorteio = dataSorteio;
    }

    public Integer getIdGanhador() {
        return idGanhador;
    }

    public void setIdGanhador(Integer idGanhador) {
        this.idGanhador = idGanhador;
    }

    public String getNomeGanhador() {
        return nomeGanhador;
    }

    public void setNomeGanhador(String nomeGanhador) {
        this.nomeGanhador = nomeGanhador;
    }

    public Boolean getProfissional() {
        return isProfissional;
    }

    public void setProfissional(Boolean profissional) {
        isProfissional = profissional;
    }

    public Boolean getNoivos() {
        return isNoivos;
    }

    public void setNoivos(Boolean noivos) {
        isNoivos = noivos;
    }
}
