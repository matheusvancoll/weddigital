package com.vancollstudios.WedDigital.model.usuarios.DTO;

public class DadosResumoStatusPontuacaoDTO {
    private Integer idPontuacao;
    private String nivelContaNome;
    private String nivelStatusNome;
    private Integer pontoMinimo;
    private Integer pontoMaximo;
    private Integer numeroCasamentosBemSucedidos;
    private String proximoNivel;

    public Integer getIdPontuacao() {
        return idPontuacao;
    }

    public void setIdPontuacao(Integer idPontuacao) {
        this.idPontuacao = idPontuacao;
    }



    public Integer getNumeroCasamentosBemSucedidos() {
        return numeroCasamentosBemSucedidos;
    }

    public void setNumeroCasamentosBemSucedidos(Integer numeroCasamentosBemSucedidos) {
        this.numeroCasamentosBemSucedidos = numeroCasamentosBemSucedidos;
    }

    public String getNivelContaNome() {
        return nivelContaNome;
    }

    public void setNivelContaNome(String nivelContaNome) {
        this.nivelContaNome = nivelContaNome;
    }

    public String getNivelStatusNome() {
        return nivelStatusNome;
    }

    public void setNivelStatusNome(String nivelStatusNome) {
        this.nivelStatusNome = nivelStatusNome;
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
