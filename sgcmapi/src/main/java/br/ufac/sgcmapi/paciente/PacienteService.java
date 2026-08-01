package br.ufac.sgcmapi.paciente;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class PacienteService {
    private final PacienteRepository repo;

    public PacienteService(PacienteRepository repo) {
        this.repo = repo;
    }

    public List<Paciente> consultar(String termoBusca) {
        if (termoBusca != null) {
            termoBusca = termoBusca.trim();
        }
        return repo.consultar(termoBusca);
    }

    public Paciente consultar(Long id) {
        if (id == null) {
            return null;
        }
        return repo.findById(id).orElse(null);
    }

    public Paciente salvar(Paciente objeto) {
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
