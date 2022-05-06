package com.vancollstudios.WedDigital.model.usuarios.DTO;

public class UsuarioNoivosDTO {
    private Integer idUsuario;
    private String nomeUsuario;
    private String email;
    private String login;
    private String senha;
    private String cidade;
    private String estado;
    private String dataCasamento;
    private Boolean is_Noiva;
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

    public String getDataCasamento() {
        return dataCasamento;
    }

    public void setDataCasamento(String dataCasamento) {
        this.dataCasamento = dataCasamento;
    }

    public Boolean getIs_Noiva() {
        return is_Noiva;
    }

    public void setIs_Noiva(Boolean is_Noiva) {
        this.is_Noiva = is_Noiva;
    }
}
