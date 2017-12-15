package domain.ocorrencia;

import domain.Entidade;
import domain.localizacao.Localizacao;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Entity
public class Ocorrencia extends Entidade {

    private RegistroDaOcorrencia registroDaOcorrencia;

    @Enumerated(EnumType.STRING)
    private TipoDaOcorrencia tipoDaOcorrencia;

    private LocalDateTime horaDoRegistro;

    private Localizacao localizacao;

    private String nomeDoUsuario;

    private String descricao;

    public Ocorrencia() {
    }

    public Ocorrencia(RegistroDaOcorrencia registroDaOcorrencia, TipoDaOcorrencia tipoDaOcorrencia, LocalDateTime horaDoRegistro, Localizacao localizacao, String nomeDoUsuario, String descricao) {
        this.registroDaOcorrencia = registroDaOcorrencia;
        this.tipoDaOcorrencia = tipoDaOcorrencia;
        this.horaDoRegistro = horaDoRegistro;
        this.localizacao = localizacao;
        this.nomeDoUsuario = nomeDoUsuario;
        this.descricao = descricao;
    }

    public RegistroDaOcorrencia getRegistroDaOcorrencia() {
        return registroDaOcorrencia;
    }

    public void setRegistroDaOcorrencia(RegistroDaOcorrencia registroDaOcorrencia) {
        this.registroDaOcorrencia = registroDaOcorrencia;
    }

    public TipoDaOcorrencia getTipoDaOcorrencia() {
        return tipoDaOcorrencia;
    }

    public void setTipoDaOcorrencia(TipoDaOcorrencia tipoDaOcorrencia) {
        this.tipoDaOcorrencia = tipoDaOcorrencia;
    }

    public LocalDateTime getHoraDoRegistro() {
        return horaDoRegistro;
    }

    public void setHoraDoRegistro(LocalDateTime horaDoRegistro) {
        this.horaDoRegistro = horaDoRegistro;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        this.localizacao = localizacao;
    }

    public String getNomeDoUsuario() {
        return nomeDoUsuario;
    }

    public void setNomeDoUsuario(String nomeDoUsuario) {
        this.nomeDoUsuario = nomeDoUsuario;
    }

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }
}
