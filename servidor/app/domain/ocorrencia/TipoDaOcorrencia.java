package domain.ocorrencia;

public enum TipoDaOcorrencia {

    ESTACIONAMENTO_INDEVIDO("Estacionamento indevido"),
    BURACO_NA_VIA("Buraco na via");

    private String descricao;

    TipoDaOcorrencia(String descricao){
        this.descricao = descricao;
    }

    public String descricao() {
        return descricao;
    }
}
