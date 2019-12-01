package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.auth.AuthUser;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ReciboRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ServicoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.ObjectNotFound;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules.ReciboRN;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReciboService {

    @Autowired
    private ReciboRepository reciboRepository;

    @Autowired
    private ReciboRN reciboRN;

    public Recibo buscarRecibo(Integer id) {
        Optional<Recibo> recibo = this.reciboRepository.findById(id);
        return recibo.orElseThrow(() -> new ObjectNotFound("Recibo com id: " + id + " não encontrado!"));
    }

    public Iterable<Recibo> buscarRecibos() {
        List<Recibo> recibos = this.reciboRepository.findAll();
        if (recibos.isEmpty()) {
            throw new ObjectNotFound("Nenhum recibo cadastrado!");
        }
        return recibos;
    }

    public Iterable<Recibo> buscarRecibosPorNomeCliente(String nome) {
        if (nome.equals("")) {
            throw new ObjectNotFound("necessário um  nome para realizar a busca!");
        }
        List<Recibo> recibos = this.reciboRepository.findByCliente_NomeContaining(nome);
        if (recibos.isEmpty()) {
            throw new ObjectNotFound("Nenhum recibo cadastrado para este cliente!");
        }
        return recibos;
    }

    public Iterable<Recibo> buscarRecibosPorEmailCliente(String email) {
        if (email.equals("")) {
            throw new ObjectNotFound("necessário um  email para realizar a busca!");
        }
        List<Recibo> recibos = this.reciboRepository.findByCliente_EmailContaining(email);
        if (recibos.isEmpty()) {
            throw new ObjectNotFound("Nenhum recibo cadastrado este cliente!");
        }
        return recibos;
    }

    public Iterable<Recibo> buscarRecibosPorValorServico(Double valor) {
        List<Recibo> recibos = this.reciboRepository.findByServico_ValorBase(valor);
        if (recibos.isEmpty()) {
            throw new ObjectNotFound("Nenhum recibo cadastrado com este valor!");
        }
        return recibos;
    }

    public Iterable<Recibo> buscarRecibosPorNomeServico(String nome) {
        List<Recibo> recibos = this.reciboRepository.findByServico_NomeContaining(nome);
        if (recibos.isEmpty()) {
            throw new ObjectNotFound("Nenhum recibo cadastrado com este nome!");
        }
        return recibos;
    }

    public void excluirRecibo(Integer id) {
        Recibo recibo = this.buscarRecibo(id);
        this.reciboRepository.delete(recibo);
    }

    public Recibo cadastrarRecibo(Recibo recibo, AuthUser authUser) {
        Recibo reciboSalvo = null;
        try {
            this.reciboRN.isRecibo(recibo);
            this.reciboRN.calcularValorRecibo(recibo);
            recibo.setUsuario(authUser.getUsuario());
            reciboSalvo = this.reciboRepository.save(recibo);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
        return reciboSalvo;
    }

    public void atualizarRecibo(Recibo recibo, Integer id, AuthUser authUser) {
        try {
            this.reciboRN.isRecibo(recibo);
            recibo.setId(id);
            recibo.setUsuario(authUser.getUsuario());
            this.reciboRN.calcularValorRecibo(recibo);
            this.reciboRepository.save(recibo);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
    }
}
