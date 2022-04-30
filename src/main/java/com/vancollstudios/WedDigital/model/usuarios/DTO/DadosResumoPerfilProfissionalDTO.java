package com.vancollstudios.WedDigital.model.usuarios.DTO;

import java.math.BigDecimal;

public class DadosResumoPerfilProfissionalDTO {

    private Integer idUsuario;
    private String nomeUsuario;
    private String tipoUsuario;
    private Integer idProfissional;
    private String cidade;
    private String estado;
    private String nomeEmpresa;
    private String descricaoEmpresa;
    private String email;
    private String numeroContato;
    private Boolean is_Whatsapp;
    private Boolean is_CNPJ;
    private String numeroCNPJ;

    private String valorMinimo;
    private Boolean maisDeUmEventoPorDia;
    private String formasDePagamento;
    private Boolean trabalhaSozinho;
    private Integer pontosAcumulados;
    private Double classificacao;
    private Integer casamentosBemSucedidos;
    private Integer tokenConvite;
    private Integer nivelConta;

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Integer getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(Integer idProfissional) {
        this.idProfissional = idProfissional;
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

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public String getDescricaoEmpresa() {
        return descricaoEmpresa;
    }

    public void setDescricaoEmpresa(String descricaoEmpresa) {
        this.descricaoEmpresa = descricaoEmpresa;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumeroContato() {
        return numeroContato;
    }

    public void setNumeroContato(String numeroContato) {
        this.numeroContato = numeroContato;
    }

    public Boolean getIs_Whatsapp() {
        return is_Whatsapp;
    }

    public void setIs_Whatsapp(Boolean is_Whatsapp) {
        this.is_Whatsapp = is_Whatsapp;
    }

    public Boolean getIs_CNPJ() {
        return is_CNPJ;
    }

    public void setIs_CNPJ(Boolean is_CNPJ) {
        this.is_CNPJ = is_CNPJ;
    }

    public String getNumeroCNPJ() {
        return numeroCNPJ;
    }

    public void setNumeroCNPJ(String numeroCNPJ) {
        this.numeroCNPJ = numeroCNPJ;
    }

    public Integer getNivelConta() {
        return nivelConta;
    }

    public void setNivelConta(Integer nivelConta) {
        this.nivelConta = nivelConta;
    }

    public String getValorMinimo() {
        return valorMinimo;
    }

    public void setValorMinimo(String valorMinimo) {
        this.valorMinimo = valorMinimo;
    }

    public Boolean getMaisDeUmEventoPorDia() {
        return maisDeUmEventoPorDia;
    }

    public void setMaisDeUmEventoPorDia(Boolean maisDeUmEventoPorDia) {
        this.maisDeUmEventoPorDia = maisDeUmEventoPorDia;
    }

    public String getFormasDePagamento() {
        return formasDePagamento;
    }

    public void setFormasDePagamento(String formasDePagamento) {
        this.formasDePagamento = formasDePagamento;
    }

    public Boolean getTrabalhaSozinho() {
        return trabalhaSozinho;
    }

    public void setTrabalhaSozinho(Boolean trabalhaSozinho) {
        this.trabalhaSozinho = trabalhaSozinho;
    }

    public Integer getPontosAcumulados() {
        return pontosAcumulados;
    }

    public void setPontosAcumulados(Integer pontosAcumulados) {
        this.pontosAcumulados = pontosAcumulados;
    }

    public Double getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(Double classificacao) {
        this.classificacao = classificacao;
    }

    public Integer getCasamentosBemSucedidos() {
        return casamentosBemSucedidos;
    }

    public void setCasamentosBemSucedidos(Integer casamentosBemSucedidos) {
        this.casamentosBemSucedidos = casamentosBemSucedidos;
    }

    public Integer getTokenConvite() {
        return tokenConvite;
    }

    public void setTokenConvite(Integer tokenConvite) {
        this.tokenConvite = tokenConvite;
    }
}
