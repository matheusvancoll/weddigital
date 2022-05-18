package com.vancollstudios.WedDigital.model.statusPontuacaoProfissional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "DADOS_PONTUACAO")
public class StatusPontuacao {

    @Id
    @GeneratedValue
    private Integer idPontuacao;

    @Column
    private String nivelNome;

    @Column
    private Integer pontoMinimo;

    @Column
    private Integer pontoMaximo;

    public Integer getIdPontuacao() {
        return idPontuacao;
    }

    public void setIdPontuacao(Integer idPontuacao) {
        this.idPontuacao = idPontuacao;
    }

    public String getNivelNome() {
        return nivelNome;
    }

    public void setNivelNome(String nivelNome) {
        this.nivelNome = nivelNome;
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
}
