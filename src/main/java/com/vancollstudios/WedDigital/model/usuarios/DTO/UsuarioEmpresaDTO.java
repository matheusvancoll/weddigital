package com.vancollstudios.WedDigital.model.usuarios.DTO;

public class UsuarioEmpresaDTO {
    private Integer idUsuario;
    private String nomeUsuario;
    private String email;
    private String numeroContato;
    private Boolean is_Whatsapp;
    private String login;
    private String senha;
    private String nomeEmpresa;
    private String cidade;
    private String estado;
    private Boolean is_CNPJ;
    private String numeroCNPJ;
    private Integer nivelConta;
    private Boolean is_CadastroPorConvite;
    private Integer idUsuarioConvite;
    private Integer tokenUsuarioConvite;

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

    public Integer getNivelConta() {
        return nivelConta;
    }

    public void setNivelConta(Integer nivelConta) {
        this.nivelConta = nivelConta;
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

    public Integer getTokenUsuarioConvite() {
        return tokenUsuarioConvite;
    }

    public void setTokenUsuarioConvite(Integer tokenUsuarioConvite) {
        this.tokenUsuarioConvite = tokenUsuarioConvite;
    }
}
