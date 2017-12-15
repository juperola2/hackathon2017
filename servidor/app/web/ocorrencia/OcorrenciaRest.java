package web.ocorrencia;

import application.AdicionaOcorrencia;
import application.ConsultarOcorrencia;
import com.fasterxml.jackson.databind.JsonNode;
import domain.ocorrencia.Ocorrencia;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;

public class OcorrenciaRest extends Controller {

    @Inject
    private AdicionaOcorrencia adicionaOcorrencia;

    @Inject
    private ConsultarOcorrencia consultarOcorrencia;

    @Transactional
    public Result adicionar() {
        AdicionarOcorrenciaHttpDTO adicionarOcorrenciaHttpDTO = Json.fromJson(request().body().asJson(), AdicionarOcorrenciaHttpDTO.class);
        this.adicionaOcorrencia.adicionar(adicionarOcorrenciaHttpDTO);
        return ok();
    }

    @Transactional
    public Result consultarTodas(){
        List<Ocorrencia> ocorrencias = consultarOcorrencia.consultarTodas();
        JsonNode jsonNode = Json.toJson(ocorrencias);
        return ok(jsonNode);
    }

}
