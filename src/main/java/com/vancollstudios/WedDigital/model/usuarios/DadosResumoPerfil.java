package com.vancollstudios.WedDigital.model.usuarios;

import com.vancollstudios.WedDigital.model.anuncios.Anuncio;
import com.vancollstudios.WedDigital.model.casamentos.Casamento;

import java.util.Collection;

public class DadosResumoPerfil {

    private String tipoUsuario;

    private Usuario usuario;

    private Casamento dadosCasamento;

    private Collection<Anuncio> listaAnuncios;

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

    public Collection<Anuncio> getListaAnuncios() {
        return listaAnuncios;
    }

    public void setListaAnuncios(Collection<Anuncio> listaAnuncios) {
        this.listaAnuncios = listaAnuncios;
    }
}
