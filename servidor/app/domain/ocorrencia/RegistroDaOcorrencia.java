package domain.ocorrencia;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class RegistroDaOcorrencia {

    private byte[] dados;

    @Enumerated(EnumType.STRING)
    private TipoDoRegistro tipoDoRegistro;

    public RegistroDaOcorrencia() {
    }

    public RegistroDaOcorrencia(byte[] dados, TipoDoRegistro tipoDoRegistro) {
        this.dados = dados;
        this.tipoDoRegistro = tipoDoRegistro;
    }

    public byte[] getDados() {
        return dados;
    }

    public void setDados(byte[] dados) {
        this.dados = dados;
    }

    public TipoDoRegistro getTipoDoRegistro() {
        return tipoDoRegistro;
    }

    public void setTipoDoRegistro(TipoDoRegistro tipoDoRegistro) {
        this.tipoDoRegistro = tipoDoRegistro;
    }
}
