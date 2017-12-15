package domain.ocorrencia;

import infrastructure.RepositorioHibernate;
import play.db.jpa.JPAApi;

import javax.inject.Inject;

public class OcorrenciaRepositorio extends RepositorioHibernate<Ocorrencia> {

    @Inject
    public OcorrenciaRepositorio(JPAApi jpaApi) {
        super(jpaApi);
    }

}
