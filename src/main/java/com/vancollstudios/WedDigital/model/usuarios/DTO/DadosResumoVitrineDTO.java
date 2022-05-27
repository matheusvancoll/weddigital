package com.vancollstudios.WedDigital.model.usuarios.DTO;

public class DadosResumoVitrineDTO {

    private Integer idProfissional;
    private String nomeEmpresa;
    private Integer casamentosBemSucedidos;
    private Double classificacaoProfissional;
    private String nivelStatusConta;
    private String numeroContato;
    private String emailContato;
    private String descricaoEmpresa;
    private String valorMinimo;
    private String formasPagamento;
    private Boolean realizaMaisDeUmEventoPorDia;
    private Boolean trabalhaSozinho;

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

    public Double getClassificacaoProfissional() {
        return classificacaoProfissional;
    }

    public void setClassificacaoProfissional(Double classificacaoProfissional) {
        this.classificacaoProfissional = classificacaoProfissional;
    }

    public String getNivelStatusConta() {
        return nivelStatusConta;
    }

    public void setNivelStatusConta(String nivelStatusConta) {
        this.nivelStatusConta = nivelStatusConta;
    }

    public String getNumeroContato() {
        return numeroContato;
    }

    public void setNumeroContato(String numeroContato) {
        this.numeroContato = numeroContato;
    }

    public String getEmailContato() {
        return emailContato;
    }

    public void setEmailContato(String emailContato) {
        this.emailContato = emailContato;
    }

    public String getDescricaoEmpresa() {
        return descricaoEmpresa;
    }

    public void setDescricaoEmpresa(String descricaoEmpresa) {
        this.descricaoEmpresa = descricaoEmpresa;
    }

    public String getValorMinimo() {
        return valorMinimo;
    }

    public void setValorMinimo(String valorMinimo) {
        this.valorMinimo = valorMinimo;
    }

    public String getFormasPagamento() {
        return formasPagamento;
    }

    public void setFormasPagamento(String formasPagamento) {
        this.formasPagamento = formasPagamento;
    }

    public Boolean getRealizaMaisDeUmEventoPorDia() {
        return realizaMaisDeUmEventoPorDia;
    }

    public void setRealizaMaisDeUmEventoPorDia(Boolean realizaMaisDeUmEventoPorDia) {
        this.realizaMaisDeUmEventoPorDia = realizaMaisDeUmEventoPorDia;
    }

    public Boolean getTrabalhaSozinho() {
        return trabalhaSozinho;
    }

    public void setTrabalhaSozinho(Boolean trabalhaSozinho) {
        this.trabalhaSozinho = trabalhaSozinho;
    }
}
