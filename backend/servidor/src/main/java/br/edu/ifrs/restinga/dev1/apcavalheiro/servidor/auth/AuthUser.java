
package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class AuthUser extends User {
    private Usuario usuario;
    public AuthUser(Usuario usuario) {
        super(usuario.getLogin(),
                usuario.getSenha(),
                AuthorityUtils.createAuthorityList(
                    usuario.getPermissoes().toArray(new String[]{})));
        this.usuario=usuario;
    }
    public Usuario getUsuario() {
        return usuario;
    }
}