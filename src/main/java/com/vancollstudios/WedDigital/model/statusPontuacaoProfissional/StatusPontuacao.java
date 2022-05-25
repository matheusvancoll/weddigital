package com.vancollstudios.WedDigital.model.statusPontuacaoProfissional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "NIVEL_STATUS_CONTA")
public class StatusPontuacao {

    @Id
    @GeneratedValue
    private Integer idPontuacao;

    @Column
    private String statusNome;

    @Column
    private Integer pontoMinimo;

    @Column
    private Integer pontoMaximo;

    @Column
    private String proximoNivel;

    public Integer getIdPontuacao() {
        return idPontuacao;
    }

    public void setIdPontuacao(Integer idPontuacao) {
        this.idPontuacao = idPontuacao;
    }

    public String getStatusNome() {
        return statusNome;
    }

    public void setStatusNome(String statusNome) {
        this.statusNome = statusNome;
    }

    public Integer getPontoMinimo() {
        return pontoMinimo;
    }

    public void setPontoMinimo(Integer pontoMinimo) {
        this.pontoMinimo = pontoMinimo;
    }

    public Integer getPontoMaximo() {
        return pontoMaximo;
    }

    public void setPontoMaximo(Integer pontoMaximo) {
        this.pontoMaximo = pontoMaximo;
    }

    public String getProximoNivel() {
        return proximoNivel;
    }

    public void setProximoNivel(String proximoNivel) {
        this.proximoNivel = proximoNivel;
    }
}
