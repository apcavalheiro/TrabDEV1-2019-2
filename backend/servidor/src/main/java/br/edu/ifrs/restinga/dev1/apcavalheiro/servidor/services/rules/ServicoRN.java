package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Servico;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import org.springframework.stereotype.Component;

@Component
public class ServicoRN {

    public boolean isServico(Servico servico) {
        if (servico.getNome() == null || servico.getNome().equals("")) {
            throw new InvalidRequest("O campo Nome é obrigatório!");
        }
        if (servico.getDescricaoValor() == null || servico.getDescricaoValor().equals("")) {
            throw new InvalidRequest("É necessário uma descrição do valor para realizar o cadastro!");
        }
        if (servico.getDescricaoServico() == null || servico.getDescricaoServico().equals("")) {
            throw new InvalidRequest("É necessário uma descrição do serviço para realizar o cadastro!");
        }
        return true;
    }
}
