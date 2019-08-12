package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
