package com.vancollstudios.WedDigital.model.usuarios;

import org.w3c.dom.Text;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "DADOS_PROFISSIONAL")
public class Profissional {

    @Id @GeneratedValue
    private Integer idProfissional;

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
    private Integer nivelConta;

    @Column
    private Integer idUsuario;

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
}
