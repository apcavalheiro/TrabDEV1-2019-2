package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.controllers;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth.AuthUser;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Pass;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/usuarios/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('administrador')")
    public ResponseEntity<Usuario> buscarUsuario(@AuthenticationPrincipal AuthUser authUser,
                                                 @PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.usuarioService.buscarUsuario(authUser, id));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('administrador')")
    public ResponseEntity<Iterable<Usuario>> buscarUsuarios(@AuthenticationPrincipal AuthUser authUser) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.usuarioService.buscarUsuarios(authUser));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('administrador')")
    public ResponseEntity<Usuario> cadastrarUsuario(@AuthenticationPrincipal AuthUser authUser,
                                                    @RequestBody Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.usuarioService.cadastrarUsuario(authUser, usuario));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('administrador')")
    public ResponseEntity<Usuario> atualizarUsuario(@AuthenticationPrincipal AuthUser authUser,
                                                    @RequestBody Usuario usuario,
                                                    @PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(this.usuarioService.atualizarUsuario(authUser, usuario, id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('administrador')")
    public ResponseEntity<Void> atualizarUsuario(@AuthenticationPrincipal AuthUser authUser,
                                                 @PathVariable Integer id) {
        this.usuarioService.excluirUsuario(authUser, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PostMapping("login/")
    public ResponseEntity<Usuario> loginToken(@RequestBody Pass pass) throws UnsupportedEncodingException {
        String token = null;
        Usuario usuario = this.usuarioService.login(pass);
        token = this.usuarioService.gerarToken(usuario);

        return ResponseEntity.status(HttpStatus.OK)
                .header("token", token).body(usuario);

    }
}
