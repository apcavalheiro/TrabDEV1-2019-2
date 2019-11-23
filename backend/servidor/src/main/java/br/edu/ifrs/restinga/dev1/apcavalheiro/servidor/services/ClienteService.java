package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Cliente;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ClienteRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.DataIntegrityException;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.ObjectNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente buscarCliente(Integer id) {
        Optional<Cliente> cliente = this.clienteRepository.findById(id);
        return cliente.orElseThrow(() -> new ObjectNotFound("Cliente com id: " + id + " não encontrado!"));
    }

    public Iterable<Cliente> buscarClientes() {
        List<Cliente> clientes = this.clienteRepository.findAll();
        if (clientes.isEmpty()) {
            throw new ObjectNotFound("Nenhum cliente cadastrado!");
        }
        return clientes;
    }

    public List<Cliente> buscarClientePorNome(String nome) {
        if(nome.equals("")){
            throw new ObjectNotFound("necessário um  nome para realizar a busca!");
        }
        List<Cliente> clientes = this.clienteRepository.findByNomeContaining(nome);
        if(clientes.isEmpty()){
            throw new ObjectNotFound("Nenhum cliente cadastrado com este nome!");
        }
        return clientes;
    }

    public void excluirCliente(Integer id) {
        Cliente cliente = this.buscarCliente(id);
        try {
            this.clienteRepository.delete(cliente);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há recibo relacionado");
        }
    }

    public Cliente cadastrarCliente(Cliente cliente) {
        Cliente clienteSalvo = null;
        List<Cliente> clientesDb = this.clienteRepository.findAll();
        try {
            this.isCliente(cliente);
            this.existNameAndEmail(clientesDb, cliente);
            clienteSalvo = this.clienteRepository.save(cliente);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!" + e);
        }
        return clienteSalvo;
    }

    public Cliente atualizarCliente(Cliente cliente, Integer id) {
        Cliente clientesDb = this.buscarCliente(id);
        try {
            this.isCliente(cliente);
            clientesDb.setEmail(cliente.getEmail());
            clientesDb.setEndereco(cliente.getEndereco());
            clientesDb.setNome(cliente.getNome());
            clientesDb = this.clienteRepository.save(clientesDb);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!" + e);
        }
        return clientesDb;
    }

    private boolean isCliente(Cliente cliente) {
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

    private void existNameAndEmail(List<Cliente> clientesDb, Cliente cliente) {
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

