package com.vancollstudios.WedDigital.model.casamentos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "casamentos")
public class Casamento {

    @Id
    @GeneratedValue
    private Integer idCasamento;

    @Column(length = 10)
    private String dataCasamento;

    @Column(nullable = false)
    private Integer idUsuario;

    @Column
    private Integer idRecepcao;

    @Column
    private Integer idBuffet;

    @Column
    private Integer idMusico;

    @Column
    private Integer idFotografia;

    @Column
    private Integer idVestido;


    public Integer getIdCasamento() {
        return idCasamento;
    }

    public void setIdCasamento(Integer idCasamento) {
        this.idCasamento = idCasamento;
    }

    public String getDataCasamento() {
        return dataCasamento;
    }

    public void setDataCasamento(String dataCasamento) {
        this.dataCasamento = dataCasamento;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Integer getIdRecepcao() {
        return idRecepcao;
    }

    public void setIdRecepcao(Integer idRecepcao) {
        this.idRecepcao = idRecepcao;
    }

    public Integer getIdBuffet() {
        return idBuffet;
    }

    public void setIdBuffet(Integer idBuffet) {
        this.idBuffet = idBuffet;
    }

    public Integer getIdMusico() {
        return idMusico;
    }

    public void setIdMusico(Integer idMusico) {
        this.idMusico = idMusico;
    }

    public Integer getIdFotografia() {
        return idFotografia;
    }

    public void setIdFotografia(Integer idFotografia) {
        this.idFotografia = idFotografia;
    }

    public Integer getIdVestido() {
        return idVestido;
    }

    public void setIdVestido(Integer idVestido) {
        this.idVestido = idVestido;
    }
}
