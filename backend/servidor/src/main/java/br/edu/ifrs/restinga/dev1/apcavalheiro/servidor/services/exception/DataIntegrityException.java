package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception;

import java.io.Serializable;

public class DataIntegrityException extends RuntimeException implements Serializable {

    private static final long serialVersionUID = 1L;

    public DataIntegrityException(String message) {
        super(message);
    }

    public DataIntegrityException(String msg, Throwable cause) {
        super(msg, cause);
    }
}