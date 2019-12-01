package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth.AuthUser;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.UsuarioRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.Forbidden;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioRN {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean isAllowed(AuthUser authUser, Usuario usuarioDb) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador") ||
                usuarioDb.getLogin() == authUser.getUsername()) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        return true;
    }

    public boolean isLogin(Usuario usuario) {
        Usuario usuarioExiste = this.usuarioRepository.findByLogin(usuario.getLogin());
        if (usuarioExiste != null) {
            throw new InvalidRequest("Este login já está cadastrado em nosso sistema!");
        }
        return true;
    }

    public boolean isUsuario(Usuario usuario) {
        if (usuario.getNome() == null || usuario.getNome().equals("")) {
            throw new InvalidRequest("O Campo Nome é obrigatório");
        }
        if (usuario.getLogin() == null || usuario.getLogin().equals("")) {
            throw new InvalidRequest("O Campo Login é obrigatório");
        }
        if (usuario.getPass() == null || usuario.getPass().equals("")) {
            throw new InvalidRequest("O Campo Senha é obrigatório");
        }
        if (usuario.getPass().length() < 6) {
            throw new InvalidRequest("O Campo Senha deve conter no mínimo 6 caracteres!");
        }

        return true;
    }
}
