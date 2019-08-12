package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ReciboRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ServicoRepository;
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

    @Autowired
    private ServicoRepository servicoRepository;

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
            this.servicoRepository.save(recibo.getServico());
            reciboSalvo = this.reciboRepository.save(recibo);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
        return reciboSalvo;
    }

    public Recibo atualizarRecibo(Recibo recibo, Integer id) {
        Recibo reciboDb = null;
        try {
            isRecibo(recibo);
            reciboDb = this.buscarRecibo(id);
            reciboDb.setData(recibo.getData());
            reciboDb.setCliente(recibo.getCliente());
            reciboDb.getServico().setValor(recibo.getServico().getValor());
            reciboDb.getServico().setDescricao(recibo.getServico().getDescricao());
            recibo = this.reciboRepository.save(reciboDb);
        } catch (NullPointerException e) {
            throw new InvalidRequest("Não é permitido cadastro nulo!");
        }
        return recibo;
    }

    private boolean isRecibo(Recibo recibo) {
        if (recibo.getData().equals("") || recibo.getData() == null) {
            throw new InvalidRequest("O campo Data é obrigatório!");
        }
        if (recibo.getCliente().getId() == null) {
            throw new InvalidRequest("É necessário um cliente para cadastrar o recibo!");
        }
        if (recibo.getServico().getValor() <= 0 || recibo.getServico().getValor() == null) {
            throw new InvalidRequest("É necessário um valor de serviço válido para o recibo!");
        }
        if (recibo.getServico().getDescricao() == "" || recibo.getServico().getDescricao() == null) {
            throw new InvalidRequest("É necessário uma descrição do serviço para o recibo!");
        }
        return true;
    }
}
