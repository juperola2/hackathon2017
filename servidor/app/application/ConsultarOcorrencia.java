package application;

import domain.ocorrencia.Ocorrencia;
import domain.ocorrencia.OcorrenciaRepositorio;
import play.db.jpa.Transactional;

import javax.inject.Inject;
import java.util.List;

public class ConsultarOcorrencia {

    private final OcorrenciaRepositorio ocorrenciaRepositorio;

    @Inject
    public ConsultarOcorrencia(OcorrenciaRepositorio ocorrenciaRepositorio) {
        this.ocorrenciaRepositorio = ocorrenciaRepositorio;
    }

    @Transactional
    public List<Ocorrencia> consultarTodas(){
        return ocorrenciaRepositorio.buscarTodos();
    }
}
