package br.ufac.sgcmapi.unidade;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UnidadeService {
    private final UnidadeRepository repo;

    public UnidadeService(UnidadeRepository repo) {
        this.repo = repo;
    }

    public List<Unidade> consultar(String termoBusca) {
        if (termoBusca != null) {
            termoBusca = termoBusca.trim();
        }
        return repo.consultar(termoBusca);
    }

    public Unidade consultar(Long id) {
        if (id == null) {
            return null;
        }
        return repo.findById(id).orElse(null);
    }

    public Unidade salvar(Unidade objeto) {
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
