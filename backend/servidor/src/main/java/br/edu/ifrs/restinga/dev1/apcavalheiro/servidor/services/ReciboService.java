package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ReciboRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.ObjectNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReciboService {

    @Autowired
    private ReciboRepository reciboRepository;

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

    public void excluirRecibo(Integer id) {
        Recibo recibo = this.buscarRecibo(id);
        this.reciboRepository.delete(recibo);
    }

    public Recibo cadastrarRecibo(Recibo recibo) {
        Recibo reciboSalvo = null;
        try {
            isRecibo(recibo);
            reciboSalvo = this.reciboRepository.save(recibo);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
        return reciboSalvo;
    }

    public void atualizarRecibo(Recibo recibo, Integer id) {
        try {
            this.isRecibo(recibo);
            recibo.setId(id);
            this.reciboRepository.save(recibo);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
    }

    private boolean isRecibo(Recibo recibo) {
        if (recibo.getData().equals("") || recibo.getData() == null) {
            throw new InvalidRequest("O campo Data é obrigatório!");
        }
        if (recibo.getCliente().getId() == null) {
            throw new InvalidRequest("É necessário um cliente para cadastrar o recibo!");
        }
        if (recibo.getServico().getId() == null) {
            throw new InvalidRequest("É necessário um Serviço para cadastrar o recibo!");
        }
        if (recibo.getValor() <= 0 || recibo.getValor() == null) {
            throw new InvalidRequest("É necessário um Valor para fechar o recibo!");
        }
        return true;
    }
}
