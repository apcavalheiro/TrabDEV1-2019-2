package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.controllers;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Cliente;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/clientes/")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarCliente(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.clienteService.buscarCliente(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Cliente>> buscarClientes() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.clienteService.buscarClientes());
    }

    @GetMapping("/buscar")
    public ResponseEntity<Iterable<Cliente>> buscarClientePorNome(@RequestParam(required = true) String nome) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.clienteService.buscarClientePorNome(nome));
    }

    @PostMapping
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.clienteService.cadastrarCliente(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@RequestBody Cliente cliente, @PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(this.clienteService.atualizarCliente(cliente, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCliente(@PathVariable Integer id) {
        this.clienteService.excluirCliente(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }
}

