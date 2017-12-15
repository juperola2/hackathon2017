import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import play.libs.Json;

public class JavaJsonCustomObjectMapper {

    JavaJsonCustomObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        mapper.registerModule(new JSR310Module());
        mapper.registerModule(new Jdk8Module());
        Json.setObjectMapper(mapper);
    }

}
