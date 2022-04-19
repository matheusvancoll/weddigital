package com.vancollstudios.WedDigital.model.usuarios;

import javax.persistence.*;

@Entity(name = "usuario")
public class Usuario {

    @Id @GeneratedValue
    private Integer idUsuario;

    @Column(nullable = false, length = 128)
    private String nomeCompleto;

    @Column(nullable = false, length = 32)
    private String login;

    @Column(nullable = false, length = 128)
    private String senha;

    @Column(nullable = false, length = 32)
    private Integer tipoUsuario;

    @Column(nullable = false, length = 11)
    private String ultimoAcesso;

    @Column(nullable = false, length = 1)
    private Boolean senhaExpirada;

    @Column(nullable = false, length = 11)
    private String dataExpiracao;

    @Column(nullable = false, length = 1)
    private Boolean primeiroAcesso;

    @Column(nullable = false, length = 11)
    private String dataCriacao;

    @Column(nullable = true, length = 128)
    private String cidade;

    @Column(nullable = true, length = 2)
    private String estado;

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
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

    public Integer getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(Integer tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getUltimoAcesso() {
        return ultimoAcesso;
    }

    public void setUltimoAcesso(String ultimoAcesso) {
        this.ultimoAcesso = ultimoAcesso;
    }

    public Boolean getSenhaExpirada() {
        return senhaExpirada;
    }

    public void setSenhaExpirada(Boolean senhaExpirada) {
        this.senhaExpirada = senhaExpirada;
    }

    public String getDataExpiracao() {
        return dataExpiracao;
    }

    public void setDataExpiracao(String dataExpiracao) {
        this.dataExpiracao = dataExpiracao;
    }

    public Boolean getPrimeiroAcesso() {
        return primeiroAcesso;
    }

    public void setPrimeiroAcesso(Boolean primeiroAcesso) {
        this.primeiroAcesso = primeiroAcesso;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
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
}
