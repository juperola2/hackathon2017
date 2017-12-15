package web.ocorrencia;

import domain.localizacao.Localizacao;
import domain.ocorrencia.TipoDaOcorrencia;

import java.time.LocalDateTime;

public class AdicionarOcorrenciaHttpDTO {

    private String imagem;

    private TipoDaOcorrencia tipoDaOcorrencia;

    private LocalDateTime horaDoRegistro;

    private Localizacao localizacao;

    private String nomeDoUsuario;

    private String descricao;

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
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
