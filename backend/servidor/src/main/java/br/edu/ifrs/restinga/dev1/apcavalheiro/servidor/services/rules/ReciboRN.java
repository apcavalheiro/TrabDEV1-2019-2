package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.rules;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.services.exception.InvalidRequest;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ReciboRN {
    public boolean isRecibo(Recibo recibo) {
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

    public boolean calcularValorRecibo(Recibo recibo) {
        if (recibo.getServico().getValorBase() > recibo.getValor()) {
            recibo.setValor(recibo.getServico().getValorBase());
        }
        return true;
    }
}
