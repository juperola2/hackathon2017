package application;

import domain.ocorrencia.Ocorrencia;
import domain.ocorrencia.OcorrenciaRepositorio;
import domain.ocorrencia.RegistroDaOcorrencia;
import domain.ocorrencia.TipoDoRegistro;
import play.db.jpa.Transactional;
import web.ocorrencia.AdicionarOcorrenciaHttpDTO;

import javax.inject.Inject;
import java.util.Base64;

public class AdicionaOcorrencia {

    @Inject
    private OcorrenciaRepositorio ocorrenciaRepositorio;

    @Transactional
    public void adicionar(AdicionarOcorrenciaHttpDTO adicionarOcorrenciaHttpDTO ) {
        RegistroDaOcorrencia registroDaOcorrencia = new RegistroDaOcorrencia(Base64.getDecoder().decode(adicionarOcorrenciaHttpDTO.getImagem()), TipoDoRegistro.IMAGEM);
        Ocorrencia ocorrencia = new Ocorrencia(registroDaOcorrencia, adicionarOcorrenciaHttpDTO.getTipoDaOcorrencia(), adicionarOcorrenciaHttpDTO.getHoraDoRegistro(), adicionarOcorrenciaHttpDTO.getLocalizacao(), adicionarOcorrenciaHttpDTO.getNomeDoUsuario(), adicionarOcorrenciaHttpDTO.getDescricao());
        this.ocorrenciaRepositorio.salvar(ocorrencia);
    }

}
