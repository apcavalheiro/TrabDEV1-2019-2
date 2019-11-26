package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.ConfiguracaoSeguranca;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.UsuarioRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


public class FiltroPorToken extends OncePerRequestFilter {

    private UsuarioRepository usuarioRepository;

    public FiltroPorToken(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            Algorithm algorithm = Algorithm.HMAC256(ConfiguracaoSeguranca.SEGREDO);
            DecodedJWT decode = JWT.require(algorithm).build().verify(token);
            Integer id = decode.getClaim("id").asInt();
            Usuario usuario = usuarioRepository.findById(id).get();
            AuthUser usuarioAut = new AuthUser(usuario);
            UsernamePasswordAuthenticationToken authToken
                    = new UsernamePasswordAuthenticationToken(usuarioAut, null, usuarioAut.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        chain.doFilter(request, response);
    }

}
