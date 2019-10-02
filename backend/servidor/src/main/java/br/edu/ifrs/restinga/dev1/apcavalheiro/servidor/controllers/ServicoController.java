package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.controllers;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Servico;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/servicos/")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @PostMapping
    public ResponseEntity<Servico> cadastrarServico(@RequestBody Servico servico) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.servicoService.cadastrarServico(servico));
    }

    @GetMapping
    public ResponseEntity<Iterable<Servico>> buscarServicos() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.servicoService.buscarServicos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarServico(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.servicoService.buscarServico(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarServico(@PathVariable Integer id,
                                                 @RequestBody Servico servico) {
        this.servicoService.atualizarServico(id, servico);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirServico(@PathVariable Integer id) {
        this.servicoService.excluirServico(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }
}
