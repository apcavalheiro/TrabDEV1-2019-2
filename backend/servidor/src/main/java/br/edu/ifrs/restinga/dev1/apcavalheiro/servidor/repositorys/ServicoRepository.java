package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Integer> {
    List<Servico> findByNomeContaining(String nome);
}
