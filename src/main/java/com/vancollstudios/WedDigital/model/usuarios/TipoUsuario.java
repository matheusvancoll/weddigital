package com.vancollstudios.WedDigital.model.usuarios;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "tipoUsuario")
public class TipoUsuario {

    @Id
    private Integer idTipoUsuario;

    private String descricaoTipo;

    public Integer getIdTipoUsuario() {
        return idTipoUsuario;
    }

    public void setIdTipoUsuario(Integer idTipoUsuario) {
        this.idTipoUsuario = idTipoUsuario;
    }

    public String getDescricaoTipo() {
        return descricaoTipo;
    }

    public void setDescricaoTipo(String descricaoTipo) {
        this.descricaoTipo = descricaoTipo;
    }
}
