package com.vancollstudios.WedDigital.model.anuncios;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "anuncio")
public class Anuncio {

    @Id @GeneratedValue
    private Integer idAnuncio;

    @Column(nullable = false, length = 128)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false, length = 3)
    private Integer categoria;

    @Column(nullable = false, length = 11)
    private String preco;

    @Column(nullable = false, length = 128)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String estado;

    @Column(nullable = false, length = 15)
    private String telefone;

    @Column(nullable = false)
    private Boolean whatsapp;

    @Column(nullable = false, length = 128)
    private String email;

    @Column(length = 5)
    private Integer classificacao;

    @Column(length = 9)
    private Integer orcamentosPedidos;

    @Column(nullable = false)
    private Integer idUsuarioFornecedor;

    @Column(nullable = true, length = 11)
    private String dataCriacao;

    @Column(nullable = true, length = 11)
    private String dataExpiracao;


    public Integer getIdAnuncio() {
        return idAnuncio;
    }

    public void setIdAnuncio(Integer idAnuncio) {
        this.idAnuncio = idAnuncio;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getCategoria() {
        return categoria;
    }

    public void setCategoria(Integer categoria) {
        this.categoria = categoria;
    }

    public String getPreco() {
        return preco;
    }

    public void setPreco(String preco) {
        this.preco = preco;
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Boolean getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(Boolean whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(Integer classificacao) {
        this.classificacao = classificacao;
    }

    public Integer getOrcamentosPedidos() {
        return orcamentosPedidos;
    }

    public void setOrcamentosPedidos(Integer orcamentosPedidos) {
        this.orcamentosPedidos = orcamentosPedidos;
    }

    public Integer getIdUsuarioFornecedor() {
        return idUsuarioFornecedor;
    }

    public void setIdUsuarioFornecedor(Integer idUsuarioFornecedor) {
        this.idUsuarioFornecedor = idUsuarioFornecedor;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getDataExpiracao() {
        return dataExpiracao;
    }

    public void setDataExpiracao(String dataExpiracao) {
        this.dataExpiracao = dataExpiracao;
    }
}
