package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception;

import java.io.Serializable;

public class InvalidRequest extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;
    public InvalidRequest(String message) {
        super(message);
    }

    public InvalidRequest(String message, Throwable cause) {
        super(message,cause);
    }
}
