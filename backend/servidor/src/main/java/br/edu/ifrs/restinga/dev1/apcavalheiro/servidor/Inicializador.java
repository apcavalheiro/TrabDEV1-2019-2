package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Component
public class Inicializador {
    @Autowired
    UsuarioRepository usuarioRepository;
    // Executa o método logo após a aplicação spring inicializar por completo
    @PostConstruct
    public void init() {
        Usuario usuarioRoot = usuarioRepository.findByLogin("admin");
        if (usuarioRoot == null) {
            usuarioRoot = new Usuario();
            usuarioRoot.setNome("admin");
            usuarioRoot.setLogin("admin");
            usuarioRoot.setSenha(ConfiguracaoSeguranca.PASSWORD_ENCODER.encode("123"));
            usuarioRoot.setPermissoes(Arrays.asList("administrador" ));
            usuarioRepository.save(usuarioRoot);
        }
    }
}
