package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Cliente;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClienteRN {
    public boolean isCliente(Cliente cliente) {
        if (cliente.getEmail() == null || cliente.getEmail().equals("")) {
            throw new InvalidRequest("O Campo E-Mail é obrigatório");
        }
        if (cliente.getNome() == null || cliente.getNome().equals("")) {
            throw new InvalidRequest("O Campo Nome é obrigatório");
        }
        if (cliente.getEndereco() == null || cliente.getEndereco().equals("")) {
            throw new InvalidRequest("O Campo Endereço é obrigatório");
        }
        return true;
    }

    public void existNameAndEmail(List<Cliente> clientesDb, Cliente cliente) {
        for (Cliente clienteDb : clientesDb) {
            if (clienteDb.getEmail().equals(cliente.getEmail())) {
                throw new InvalidRequest("O Endereço de E-Mail já consta na base de dados!");
            }
            if (clienteDb.getNome().equals(cliente.getNome())) {
                throw new InvalidRequest("O Cliente já consta na base de dados!");
            }
        }
    }
}
