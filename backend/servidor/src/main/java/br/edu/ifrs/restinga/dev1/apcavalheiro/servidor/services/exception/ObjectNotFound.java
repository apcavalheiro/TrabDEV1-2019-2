package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception;

import java.io.Serializable;

public class ObjectNotFound extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;
    public ObjectNotFound(String message) {
        super(message);
    }

    public ObjectNotFound(String message, Throwable cause) {
        super(message,cause);
    }
}
