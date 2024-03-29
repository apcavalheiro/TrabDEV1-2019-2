package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReciboRepository extends JpaRepository<Recibo, Integer> {
    List<Recibo> findByCliente_NomeContaining(String cliente);
    List<Recibo> findByCliente_EmailContaining(String email);
    List<Recibo> findByServico_NomeContaining(String nome);
    List<Recibo> findByServico_ValorBase(Double valor);

}
