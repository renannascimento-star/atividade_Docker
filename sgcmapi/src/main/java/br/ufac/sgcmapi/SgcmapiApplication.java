package br.ufac.sgcmapi;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufac.sgcmapi.atendimento.Atendimento;
import br.ufac.sgcmapi.atendimento.AtendimentoRepository;
import br.ufac.sgcmapi.atendimento.EStatus;
import br.ufac.sgcmapi.convenio.Convenio;
import br.ufac.sgcmapi.paciente.Paciente;
import br.ufac.sgcmapi.profissional.Profissional;

@SpringBootApplication
@RestController
public class SgcmapiApplication {

	private final ExemploService servico;
	private final AtendimentoRepository repo;

	public SgcmapiApplication(
			ExemploService exemploService,
			AtendimentoRepository atendimentoRepository) {
		this.servico = exemploService;
		this.repo = atendimentoRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(SgcmapiApplication.class, args);
	}

	@RequestMapping(value = "/salvar")
	public String salvar() {
		var atendimento = new Atendimento();
		var profissional = new Profissional();
		var paciente = new Paciente();
		var convenio = new Convenio();

		profissional.setId(2L);
		paciente.setId(3L);
		convenio.setId(1L);

		atendimento.setData(LocalDate.of(2026, 7, 1));
		atendimento.setHora(LocalTime.of(14, 0));
		atendimento.setProfissional(profissional);
		atendimento.setPaciente(paciente);
		atendimento.setConvenio(convenio);

		repo.save(atendimento);

		return "Registro inserido!";
	}

	@RequestMapping(value = "/historico-paciente")
	public String historicoPaciente() {
		var atendimentos = repo.findByPacienteId(1L);
		return formatarAtendimentos(atendimentos);
	}

	@RequestMapping(value = "/consultar")
	public String consultar() {
		var status = new ArrayList<EStatus>();
		status.add(EStatus.AGENDADO);
		var atendimentos = repo.consultar("maria", status);
		return formatarAtendimentos(atendimentos);
	}

	@RequestMapping(value = "/teste")
	public String teste() {
		var atendimentos = repo.findAll();
		return formatarAtendimentos(atendimentos);
	}

	private String formatarAtendimentos(List<Atendimento> atendimentos) {
		var resultado = new StringBuilder();
		for (var item : atendimentos) {
			var padrao = "%s %s | %s | %s | %s | %s<br>";
			var parametros = new Object[] {
				item.getData(),
				item.getHora(),
				item.getPaciente().getNome(),
				item.getProfissional().getNome(),
				item.getConvenio().getNome(),
				item.getStatus().name()
			};
			resultado.append(String.format(padrao, parametros));
		}
		return resultado.toString();
	}

	@RequestMapping(value = "/exemplo")
	public String exemplo() {
		return servico.exibeMensagem();
	}

	@Service
	public static class ExemploService {
		public String exibeMensagem() {
			return "SGCM funcionando!!!";
		}
	}

}
