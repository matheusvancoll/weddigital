package com.vancollstudios.WedDigital.model.usuarios;

import javax.persistence.*;

@Entity(name = "DADOS_USUARIO")
public class Usuario {

    @Id @GeneratedValue
    private Integer idUsuario;

    @Column(nullable = false)
    private String nomeUsuario;

    @Column(nullable = false)
    private String email;

    @Column
    private String numeroContato;

    @Column
    private Boolean is_Whatsapp;

    @Column
    private String login;

    @Column(nullable = false)
    private String senha;

    @Column
    private Boolean is_Noivos;

    @Column
    private Boolean is_Profissional;

    @Column
    private Boolean is_Admin;

    @Column
    private String nomeEmpresa;

    @Column
    private String cidade;

    @Column
    private String estado;

    @Column
    private Boolean is_CNPJ;

    @Column
    private String numeroCNPJ;

    @Column
    private String dataCriacao;

    @Column
    private Boolean is_PrimeiroAcesso;

    @Column
    private Boolean is_Validado;

    @Column
    private Integer nivelConta;

    @Column
    private String ultimoAcesso;

    @Column
    private Boolean is_SenhaExpirada;

    @Column
    private String dataExpiracao;

    @Column
    private Integer randomToken;

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

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Boolean getIs_Noivos() {
        return is_Noivos;
    }

    public void setIs_Noivos(Boolean is_Noivos) {
        this.is_Noivos = is_Noivos;
    }

    public Boolean getIs_Profissional() {
        return is_Profissional;
    }

    public void setIs_Profissional(Boolean is_Profissional) {
        this.is_Profissional = is_Profissional;
    }

    public Boolean getIs_Admin() {
        return is_Admin;
    }

    public void setIs_Admin(Boolean is_Admin) {
        this.is_Admin = is_Admin;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
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

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Boolean getIs_PrimeiroAcesso() {
        return is_PrimeiroAcesso;
    }

    public void setIs_PrimeiroAcesso(Boolean is_PrimeiroAcesso) {
        this.is_PrimeiroAcesso = is_PrimeiroAcesso;
    }

    public Boolean getIs_Validado() {
        return is_Validado;
    }

    public void setIs_Validado(Boolean is_Validado) {
        this.is_Validado = is_Validado;
    }

    public String getUltimoAcesso() {
        return ultimoAcesso;
    }

    public void setUltimoAcesso(String ultimoAcesso) {
        this.ultimoAcesso = ultimoAcesso;
    }

    public Boolean getIs_SenhaExpirada() {
        return is_SenhaExpirada;
    }

    public void setIs_SenhaExpirada(Boolean is_SenhaExpirada) {
        this.is_SenhaExpirada = is_SenhaExpirada;
    }

    public String getDataExpiracao() {
        return dataExpiracao;
    }

    public void setDataExpiracao(String dataExpiracao) {
        this.dataExpiracao = dataExpiracao;
    }

    public Integer getRandomToken() {
        return randomToken;
    }

    public void setRandomToken(Integer randomToken) {
        this.randomToken = randomToken;
    }

    public Integer getNivelConta() {
        return nivelConta;
    }

    public void setNivelConta(Integer nivelConta) {
        this.nivelConta = nivelConta;
    }
}
