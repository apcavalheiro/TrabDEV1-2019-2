package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByLogin(String login);
}
