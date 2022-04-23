package com.vancollstudios.WedDigital.model.usuarios;

import com.vancollstudios.WedDigital.model.casamentos.Casamento;

public class DadosResumoPerfil {

    private Integer idUsuario;

    private String nome;

    private String tipoUsuario;

    private Profissional dadosProfissional;

    private Casamento dadosCasamento;

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Profissional getDadosProfissional() {
        return dadosProfissional;
    }

    public void setDadosProfissional(Profissional dadosProfissional) {
        this.dadosProfissional = dadosProfissional;
    }

    public Casamento getDadosCasamento() {
        return dadosCasamento;
    }

    public void setDadosCasamento(Casamento dadosCasamento) {
        this.dadosCasamento = dadosCasamento;
    }
}
