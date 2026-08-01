package br.ufac.sgcmapi.especialidade;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EspecialidadeService {
    private final EspecialidadeRepository repo;

    public EspecialidadeService(EspecialidadeRepository repo) {
        this.repo = repo;
    }

    public List<Especialidade> consultar(String termoBusca) {
        if (termoBusca != null) {
            termoBusca = termoBusca.trim();
        }
        return repo.consultar(termoBusca);
    }

    public Especialidade consultar(Long id) {
        if (id == null) {
            return null;
        }
        return repo.findById(id).orElse(null);
    }

    public Especialidade salvar(Especialidade objeto) {
        if (objeto == null) {
            return null;
        }
        return repo.save(objeto);
    }

    public void remover(Long id) {
        if (id == null) {
            return;
        }
        repo.deleteById(id);
    }
}
