package com.vancollstudios.WedDigital.controlador.vitrine.DTO;

public class DadosResumoProfissionaisDTO {

    private Integer idProfissional;
    private String nomeEmpresa;
    private Integer casamentosBemSucedidos;
    private String nivelStatusConta;
    private Double classificacao;
    private String cidade;
    private String estado;
    private String segmento;
    private String valorMinimo;

    public Integer getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(Integer idProfissional) {
        this.idProfissional = idProfissional;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public Integer getCasamentosBemSucedidos() {
        return casamentosBemSucedidos;
    }

    public void setCasamentosBemSucedidos(Integer casamentosBemSucedidos) {
        this.casamentosBemSucedidos = casamentosBemSucedidos;
    }

    public String getNivelStatusConta() {
        return nivelStatusConta;
    }

    public void setNivelStatusConta(String nivelStatusConta) {
        this.nivelStatusConta = nivelStatusConta;
    }

    public Double getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(Double classificacao) {
        this.classificacao = classificacao;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getSegmento() {
        return segmento;
    }

    public void setSegmento(String segmento) {
        this.segmento = segmento;
    }

    public String getValorMinimo() {
        return valorMinimo;
    }

    public void setValorMinimo(String valorMinimo) {
        this.valorMinimo = valorMinimo;
    }
}
