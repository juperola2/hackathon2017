package domain;


import java.util.List;

public interface Repositorio<T> {

    T buscarPorId(Long id);

    List<T> buscarTodos();

    void salvar(T model);

    T atualizar(T model);
}
