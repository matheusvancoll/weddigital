package com.vancollstudios.WedDigital.model.usuarios;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "DADOS_NOIVOS")
public class Noivos {

    @Id @GeneratedValue
    private Integer idNoivos;

    @Column
    private Integer idUsuario;

    @Column
    private String nomeNoiv;

    @Column
    private Boolean Is_Noiva;

    @Column
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
    private String nomeConjuge;

    @Column
    private String dataCasamento;

    @Column
    private Integer idCasamento;

    @Column
    private Integer pontosAcumulados;

    @Column
    private Boolean is_CadastroPorConvite;

    @Column
    private Integer idUsuarioConvite;

    public Integer getIdNoivos() {
        return idNoivos;
    }

    public void setIdNoivos(Integer idNoivos) {
        this.idNoivos = idNoivos;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
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

    public String getNomeConjuge() {
        return nomeConjuge;
    }

    public void setNomeConjuge(String nomeConjuge) {
        this.nomeConjuge = nomeConjuge;
    }

    public String getDataCasamento() {
        return dataCasamento;
    }

    public void setDataCasamento(String dataCasamento) {
        this.dataCasamento = dataCasamento;
    }

    public Integer getIdCasamento() {
        return idCasamento;
    }

    public void setIdCasamento(Integer idCasamento) {
        this.idCasamento = idCasamento;
    }

    public Integer getPontosAcumulados() {
        return pontosAcumulados;
    }

    public void setPontosAcumulados(Integer pontosAcumulados) {
        this.pontosAcumulados = pontosAcumulados;
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

    public String getNomeNoiv() {
        return nomeNoiv;
    }

    public void setNomeNoiv(String nomeNoiv) {
        this.nomeNoiv = nomeNoiv;
    }

    public Boolean getIs_Noiva() {
        return Is_Noiva;
    }

    public void setIs_Noiva(Boolean is_Noiva) {
        Is_Noiva = is_Noiva;
    }
}
