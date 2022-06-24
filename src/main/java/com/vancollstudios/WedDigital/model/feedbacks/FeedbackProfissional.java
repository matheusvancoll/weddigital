package com.vancollstudios.WedDigital.model.feedbacks;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "FEEDBACKS_PROFISSIONAL")
public class FeedbackProfissional {

    @Id
    @GeneratedValue
    private Integer idFeedback;

    @Column
    private Integer idProfissional;

    @Column
    private Integer idCasamento;

    @Column
    private Integer idNoivos;

    @Column
    private String dataCasamento;

    @Column
    private String feedbackTexto;

    public Integer getIdFeedback() {
        return idFeedback;
    }

    public void setIdFeedback(Integer idFeedback) {
        this.idFeedback = idFeedback;
    }

    public Integer getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(Integer idProfissional) {
        this.idProfissional = idProfissional;
    }

    public Integer getIdCasamento() {
        return idCasamento;
    }

    public void setIdCasamento(Integer idCasamento) {
        this.idCasamento = idCasamento;
    }

    public Integer getIdNoivos() {
        return idNoivos;
    }

    public void setIdNoivos(Integer idNoivos) {
        this.idNoivos = idNoivos;
    }

    public String getDataCasamento() {
        return dataCasamento;
    }

    public void setDataCasamento(String dataCasamento) {
        this.dataCasamento = dataCasamento;
    }

    public String getFeedbackTexto() {
        return feedbackTexto;
    }

    public void setFeedbackTexto(String feedbackTexto) {
        this.feedbackTexto = feedbackTexto;
    }
}
