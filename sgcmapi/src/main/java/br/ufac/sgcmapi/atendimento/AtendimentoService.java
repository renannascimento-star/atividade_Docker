package br.ufac.sgcmapi.atendimento;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class AtendimentoService {
    private final AtendimentoRepository repo;

    public AtendimentoService(AtendimentoRepository atendimentoRepository) {
        this.repo = atendimentoRepository;
    }

    public List<Atendimento> consultar(String termoBusca, List<EStatus> status) {
        if (termoBusca != null) {
            termoBusca = termoBusca.trim();
        }
        return repo.consultar(termoBusca, status);
    }

    public Atendimento consultar(Long id) {
        if (id == null) {
            return null;
        }
        return repo.findById(id).orElse(null);
    }

    public Atendimento salvar(Atendimento objeto) {
        if (objeto == null) {
            return null;
        }
        return repo.save(objeto);
    }

    public void remover(Long id) {
        var registro = this.consultar(id);
        if (registro != null) {
            registro.setStatus(EStatus.CANCELADO);
            this.salvar(registro);
        }
    }

    public Atendimento atualizarStatus(Long id) {
        var registro = this.consultar(id);
        if (registro != null) {
            var novoStatus = registro.getStatus().proximo();
            registro.setStatus(novoStatus);
            registro = this.salvar(registro);
        }
        return registro;
    }
}
