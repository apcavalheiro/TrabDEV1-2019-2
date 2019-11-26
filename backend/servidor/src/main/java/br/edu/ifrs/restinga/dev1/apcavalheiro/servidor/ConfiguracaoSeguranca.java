package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth.FiltroPorToken;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class ConfiguracaoSeguranca extends WebSecurityConfigurerAdapter {
    
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    public static final String SEGREDO="string grande para c*, usada como chave para assinatura!";
    
    @Autowired
    UsuarioRepository usuarioRepository;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            //o login pode ser acessado sem autenticação
            .antMatchers(HttpMethod.POST, "/api/usuarios/login/").permitAll()
            // Caso o sistema permita o autocadastro                
            //.antMatchers(HttpMethod.POST, "/api/usuarios/").permitAll()
            // permite o acesso somente se autenticado
            .antMatchers("/api/**").authenticated()
            .and().addFilterBefore(new FiltroPorToken(usuarioRepository), UsernamePasswordAuthenticationFilter.class)
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().csrf().disable();
    }
}