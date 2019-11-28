package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.ConfiguracaoSeguranca;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth.AuthUser;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Pass;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.UsuarioRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.DataIntegrityException;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.Forbidden;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.ObjectNotFound;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.*;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario buscarUsuario(AuthUser authUser, Integer id) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        Optional<Usuario> usuario = this.usuarioRepository.findById(id);
        return usuario.orElseThrow(() -> new ObjectNotFound("Usuário com id: " + id + " não encontrado!"));
    }

    public Iterable<Usuario> buscarUsuarios(AuthUser authUser) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        List<Usuario> usuarios = this.usuarioRepository.findAll();
        if (usuarios.isEmpty()) {
            throw new ObjectNotFound("Nenhum usuário cadastrado!");
        }
        return usuarios;
    }

    public void excluirUsuario(AuthUser authUser, Integer id) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        Usuario usuario = this.buscarUsuario(authUser, id);
        try {
            this.usuarioRepository.delete(usuario);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há recibo relacionado");
        }
    }

    public String gerarToken(Usuario usuario) throws UnsupportedEncodingException {
        Algorithm algorithm = Algorithm.HMAC256(ConfiguracaoSeguranca.SEGREDO);
        Calendar agora = Calendar.getInstance();
        agora.add(Calendar.HOUR, 24 * 7);
        Date expira = agora.getTime();
        String token = "Bearer ";
        token += JWT.create()
                .withClaim("id", usuario.getId()).
                        withExpiresAt(expira).
                        sign(algorithm);
        return token;
    }

    public Usuario login(Pass pass) {
        Usuario usuarioBanco = usuarioRepository.findByLogin(pass.getLogin());
        if (usuarioBanco != null) {
            boolean senhasIguais = ConfiguracaoSeguranca.PASSWORD_ENCODER.matches(pass.getSenha(),
                    usuarioBanco.getSenha());
            if (senhasIguais) {
                return usuarioBanco;
            }
        }
        throw new ObjectNotFound("Usuário e/ou senha incorreto(s)");
    }

    public Usuario cadastrarUsuario(AuthUser authUser, Usuario usuario) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        usuario.setId(0);
        this.isUsuario(usuario);
        usuario.setSenha(ConfiguracaoSeguranca.PASSWORD_ENCODER.encode(usuario.getPass()));
        return this.usuarioRepository.save(usuario);
    }

    public Usuario atualizarUsuario(AuthUser authUser, Usuario usuario, Integer id) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        Usuario usuarioDb = this.buscarUsuario(authUser, id);
        try {
            this.isUsuario(usuario);
            if (id == usuarioDb.getId()) {
                usuario.setId(id);
                this.usuarioRepository.save(usuario);
            }
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!" + e);
        }
        return usuario;
    }

    private boolean isUsuario(Usuario usuario) {

        if (usuario.getNome() == null || usuario.getNome().equals("")) {
            throw new InvalidRequest("O Campo Nome é obrigatório");
        }
        if (usuario.getLogin() == null || usuario.getLogin().equals("")) {
            throw new InvalidRequest("O Campo Login é obrigatório");
        }
        if (usuario.getId() != null) {
            if (usuario.getPass() == null || usuario.getPass().equals("")) {
                throw new InvalidRequest("O Campo Senha é obrigatório");
            }
        }
        return true;
    }
}

