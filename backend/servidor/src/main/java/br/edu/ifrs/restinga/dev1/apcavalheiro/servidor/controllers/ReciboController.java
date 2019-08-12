package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.controllers;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.ReciboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/recibos/")
public class ReciboController {

    @Autowired
    private ReciboService reciboService;

    @GetMapping
    public ResponseEntity<Iterable<Recibo>> buscarRecibos() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.reciboService.buscarRecibos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recibo> buscarRecibo(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.reciboService.buscarRecibo(id));
    }

    @PostMapping
    public ResponseEntity<Recibo> cadastrarRecibo(@RequestBody Recibo recibo) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.reciboService.cadastrarRecibo(recibo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirRecibo(@PathVariable Integer id) {
        this.reciboService.excluirRecibo(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recibo> atualizarRecibo(@RequestBody Recibo recibo, @PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(this.reciboService.atualizarRecibo(recibo, id));
    }
}
