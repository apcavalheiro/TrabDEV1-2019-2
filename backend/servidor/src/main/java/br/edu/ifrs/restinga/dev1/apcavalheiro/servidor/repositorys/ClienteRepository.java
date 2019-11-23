package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    List<Cliente> findByNomeContaining(String nome);
}
