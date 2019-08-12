package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Entity
public class Recibo implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private Date data;
    private Cliente cliente;
    private Servico servico;

    public Recibo() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    @ManyToOne
    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recibo recibo = (Recibo) o;
        return id.equals(recibo.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
