package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Servico;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ServicoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.ObjectNotFound;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules.ServicoRN;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ServicoRN servicoRN;

    public List<Servico> buscarServicoPorNome(String nome) {
        if(nome.equals("")){
            throw new ObjectNotFound("necessário um  nome para realizar a busca!");
        }
        List<Servico> servicos = this.servicoRepository.findByNomeContaining(nome);
        if(servicos.isEmpty()){
            throw new ObjectNotFound("Nenhum serviço cadastrado com este nome!");
        }
        return servicos;
    }
    public Servico cadastrarServico(Servico servico) {
        Servico servicoSalvo = null;
        try {
            this.servicoRN.isServico(servico);
            servicoSalvo = this.servicoRepository.save(servico);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
        return servicoSalvo;
    }

    public Servico buscarServico(Integer id) {
        Optional<Servico> servico = this.servicoRepository.findById(id);
        return servico.orElseThrow(() -> new ObjectNotFound("Serviço com id: " + id + " não encontrado!"));
    }

    public Iterable<Servico> buscarServicos() {
        List<Servico> servicos = this.servicoRepository.findAll();
        if (servicos.isEmpty()) {
            throw new ObjectNotFound("Nenhum Serviço cadastrado");
        }
        return servicos;
    }

    public void atualizarServico(Integer id, Servico servico) {
        try {
            this.servicoRN.isServico(servico);
            servico.setId(id);
            this.servicoRepository.save(servico);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
    }

    public void excluirServico(Integer id) {
        Servico servico = this.buscarServico(id);
        this.servicoRepository.delete(servico);
    }
}
