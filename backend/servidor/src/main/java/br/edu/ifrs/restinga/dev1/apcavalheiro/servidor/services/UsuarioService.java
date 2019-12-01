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
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules.UsuarioRN;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioRN usuarioRN;

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

    public Usuario buscarUsuario(AuthUser authUser, Integer id) {
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

    public Usuario cadastrarUsuario(AuthUser authUser, Usuario usuario) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        usuario.setId(0);
        this.usuarioRN.isUsuario(usuario);
        this.usuarioRN.isLogin(usuario);
        if (!usuario.getPermissoes().contains("administrador")) {
            usuario.getPermissoes().add("usuario");
        }
        usuario.setSenha(ConfiguracaoSeguranca.PASSWORD_ENCODER.encode(usuario.getPass()));
        return this.usuarioRepository.save(usuario);
    }

    public Usuario atualizarUsuario(AuthUser authUser, Usuario usuario, Integer id) {
        Usuario usuarioDb = this.buscarUsuario(authUser, id);
        try {
            this.usuarioRN.isAllowed(authUser, usuarioDb);
            this.usuarioRN.isUsuario(usuario);
            if (id == usuarioDb.getId()) {
                usuarioDb.setSenha(ConfiguracaoSeguranca.PASSWORD_ENCODER.encode(usuario.getPass()));
                usuarioDb.setNome(usuario.getNome());
                usuarioDb.setLogin(usuario.getLogin());
                if (usuario.getPermissoes() != null && usuario.getPermissoes().contains("administrador")) {
                    usuarioDb.getPermissoes().add("administrador");
                }
                this.usuarioRepository.save(usuarioDb);
            }
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!" + e);
        }
        return usuarioDb;
    }

    public void excluirUsuario(AuthUser authUser, Integer id) {
        if (!authUser.getUsuario().getPermissoes().contains("administrador")) {
            throw new Forbidden("Não tem permissão para acessar esse recurso!");
        }
        Usuario usuario = this.buscarUsuario(authUser, id);
        if (authUser.getUsername() == usuario.getLogin()) {
            throw new InvalidRequest("Não é permitido excluir usuário logado!");
        }
        try {
            this.usuarioRepository.delete(usuario);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há recibo relacionado");
        }
    }
}

