package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class Forbidden extends RuntimeException {
    public Forbidden(String message) {
        super(message);
    }
}