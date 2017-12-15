package infrastructure;


import domain.Repositorio;
import play.db.jpa.JPAApi;

import javax.persistence.EntityManager;
import java.lang.reflect.ParameterizedType;
import java.util.List;

@SuppressWarnings("unchecked")
public class RepositorioHibernate<T> implements Repositorio<T> {

    private final JPAApi jpaApi;
    private final Class<T> persistentClass;

    public RepositorioHibernate(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
        this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];

    }

    @Override
    public T buscarPorId(Long id) {
        return this.entityManager().find(this.persistentClass, id);
    }

    @Override
    public List<T> buscarTodos() {
        return this.entityManager().createQuery("FROM ".concat(this.persistentClass.getName())).getResultList();
    }

    @Override
    public void salvar(T model) {
        this.entityManager().persist(model);
    }

    @Override
    public T atualizar(T model) {
        return this.entityManager().merge(model);
    }

    private EntityManager entityManager(){
        return jpaApi.em();
    }
}
