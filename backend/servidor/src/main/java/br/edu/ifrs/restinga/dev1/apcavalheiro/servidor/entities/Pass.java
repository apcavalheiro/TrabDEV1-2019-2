package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities;

import java.io.Serializable;

public class Pass implements Serializable {
    private static final long serialVersionUID = 1L;
    private String login;
    private String senha;

    public Pass() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
