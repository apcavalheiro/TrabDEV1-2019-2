package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.controllers;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ReciboRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.ReciboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

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
    public ResponseEntity<Void> atualizarRecibo(@RequestBody Recibo recibo, @PathVariable Integer id) {
        this.reciboService.atualizarRecibo(recibo, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    //filtros
    @GetMapping("/clientes")
    public ResponseEntity<Iterable<Recibo>> buscarRecibo(@RequestParam(required = false) String email,
                                                     @RequestParam(required = false) String nome) {
        if (nome == null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(this.reciboService.buscarRecibosPorEmailCliente(email));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.reciboService.buscarRecibosPorNomeCliente(nome));
    }

    @GetMapping("/servicos")
    public ResponseEntity<Iterable<Recibo>> buscarRecibo(@RequestParam(required = false) String nome,
                                                     @RequestParam(required = false) Double valor) {
        if (nome == null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(this.reciboService.buscarRecibosPorValorServico(valor));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.reciboService.buscarRecibosPorNomeServico(nome));
    }
}
