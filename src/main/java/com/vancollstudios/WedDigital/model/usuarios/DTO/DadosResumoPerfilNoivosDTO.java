package com.vancollstudios.WedDigital.model.usuarios.DTO;

import com.vancollstudios.WedDigital.model.usuarios.Profissional;

import java.util.Collection;

public class DadosResumoPerfilNoivosDTO {

    private Integer idUsuario;
    private String nomeUsuario;
    private String fotoPerfil;
    private String tipoUsuario;
    private Integer idNoivX;
    private String cidade;
    private String estado;
    private String email;
    private String numeroContato;
    private String dataCasamento;
    private Boolean is_Whatsapp;
    private String numeroCPF;
    private Integer pontosAcumulados;
    private String ultimoGanhadorSorteio;
    private Integer tokenConvite;
    private Collection<Profissional> profissionaisContratados;

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

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Integer getIdNoivX() {
        return idNoivX;
    }

    public void setIdNoivX(Integer idNoivX) {
        this.idNoivX = idNoivX;
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

    public String getDataCasamento() {
        return dataCasamento;
    }

    public void setDataCasamento(String dataCasamento) {
        this.dataCasamento = dataCasamento;
    }

    public Boolean getIs_Whatsapp() {
        return is_Whatsapp;
    }

    public void setIs_Whatsapp(Boolean is_Whatsapp) {
        this.is_Whatsapp = is_Whatsapp;
    }

    public String getNumeroCPF() {
        return numeroCPF;
    }

    public void setNumeroCPF(String numeroCPF) {
        this.numeroCPF = numeroCPF;
    }

    public Integer getPontosAcumulados() {
        return pontosAcumulados;
    }

    public void setPontosAcumulados(Integer pontosAcumulados) {
        this.pontosAcumulados = pontosAcumulados;
    }

    public String getUltimoGanhadorSorteio() {
        return ultimoGanhadorSorteio;
    }

    public void setUltimoGanhadorSorteio(String ultimoGanhadorSorteio) {
        this.ultimoGanhadorSorteio = ultimoGanhadorSorteio;
    }

    public Integer getTokenConvite() {
        return tokenConvite;
    }

    public void setTokenConvite(Integer tokenConvite) {
        this.tokenConvite = tokenConvite;
    }

    public Collection<Profissional> getProfissionaisContratados() {
        return profissionaisContratados;
    }

    public void setProfissionaisContratados(Collection<Profissional> profissionaisContratados) {
        this.profissionaisContratados = profissionaisContratados;
    }
}
