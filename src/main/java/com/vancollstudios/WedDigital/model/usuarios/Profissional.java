package com.vancollstudios.WedDigital.model.usuarios;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity(name = "DADOS_PROFISSIONAL")
public class Profissional {

    @Id @GeneratedValue
    private Integer idProfissional;

    @Column
    private Integer idUsuario;

    @Column(nullable = false)
    private String nomeEmpresa;

    @Column(nullable = false)
    private String email;

    @Column
    private String numeroContato;

    @Column
    private Boolean is_Whatsapp;

    @Column
    private String cidade;

    @Column
    private String estado;

    @Column
    private Boolean is_CNPJ;

    @Column
    private String numeroCNPJ;

    @Column(length = 3000)
    private String descricaoEmpresa;

    @Column
    private String segmento;

    @Column
    private String valorMinimo;

    @Column
    private Boolean maisDeUmEventoPorDia;

    @Column
    private String formasPagamento;

    @Column
    private Boolean trabalhaSozinho;

    @Column
    private Integer nivelConta;

    @Column
    private Integer pontosAcumulados;

    @Column
    private Double classificacao;

    @Column
    private Integer visitasVitrine;

    @Column
    private Integer orcamentosRecebidos;

    @Column
    private Integer casamentosBemSucedidos;

    @Column
    private Integer tokenConvite;

    @Column
    private String tokenConviteUrl;

    @Column
    private Boolean is_CadastroPorConvite;

    @Column
    private Integer idUsuarioConvite;


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

    public String getDescricaoEmpresa() {
        return descricaoEmpresa;
    }

    public void setDescricaoEmpresa(String descricaoEmpresa) {
        this.descricaoEmpresa = descricaoEmpresa;
    }

    public Integer getNivelConta() {
        return nivelConta;
    }

    public void setNivelConta(Integer nivelConta) {
        this.nivelConta = nivelConta;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
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

    public String getFormasPagamento() {
        return formasPagamento;
    }

    public void setFormasPagamento(String formasPagamento) {
        this.formasPagamento = formasPagamento;
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

    public Integer getOrcamentosRecebidos() {
        return orcamentosRecebidos;
    }

    public void setOrcamentosRecebidos(Integer orcamentosRecebidos) {
        this.orcamentosRecebidos = orcamentosRecebidos;
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

    public String getTokenConviteUrl() {
        return tokenConviteUrl;
    }

    public void setTokenConviteUrl(String tokenConviteUrl) {
        this.tokenConviteUrl = tokenConviteUrl;
    }

    public Integer getVisitasVitrine() {
        return visitasVitrine;
    }

    public void setVisitasVitrine(Integer visitasVitrine) {
        this.visitasVitrine = visitasVitrine;
    }

    public Boolean getIs_CadastroPorConvite() {
        return is_CadastroPorConvite;
    }

    public void setIs_CadastroPorConvite(Boolean is_CadastroPorConvite) {
        this.is_CadastroPorConvite = is_CadastroPorConvite;
    }

    public Integer getIdUsuarioConvite() {
        return idUsuarioConvite;
    }

    public void setIdUsuarioConvite(Integer idUsuarioConvite) {
        this.idUsuarioConvite = idUsuarioConvite;
    }
}
