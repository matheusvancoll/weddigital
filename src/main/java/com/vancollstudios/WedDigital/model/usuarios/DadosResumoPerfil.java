package com.vancollstudios.WedDigital.model.usuarios;

import com.vancollstudios.WedDigital.model.casamentos.Casamento;

import java.util.Collection;

public class DadosResumoPerfil {

    private String tipoUsuario;

    private Usuario usuario;

    private Casamento dadosCasamento;

   public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Casamento getDadosCasamento() {
        return dadosCasamento;
    }

    public void setDadosCasamento(Casamento dadosCasamento) {
        this.dadosCasamento = dadosCasamento;
    }

}
