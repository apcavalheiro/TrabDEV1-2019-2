package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String nome;
    private String login;
    private String senha;
    private String pass;
    private List<String> permissoes;

    public Usuario() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Column(unique = true)
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    // Senha não deve nunca ficar disponível para a api cliente
    @JsonIgnore
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // Campo necessário para cadastrar senha inicial ou atualiza-lá
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    @ElementCollection(fetch = FetchType.EAGER)
    public List<String> getPermissoes() {
        return permissoes;
    }

    public void setPermissoes(List<String> permissoes) {
        this.permissoes = permissoes;
    }
}
