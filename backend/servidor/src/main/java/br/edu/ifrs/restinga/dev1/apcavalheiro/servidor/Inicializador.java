package br.edu.ifrs.restinga.dev1.apcavalheiro.servidor;

import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Cliente;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Recibo;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Servico;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.entities.Usuario;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ClienteRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ReciboRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.ServicoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.servidor.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class Inicializador {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ReciboRepository reciboRepository;

    @PostConstruct
    public void init() {
//        Usuario usuarioSistema = new Usuario();
//        usuarioSistema.setNome("João Pedro");
//        usuarioSistema.setLogin("JP");
//        usuarioSistema.setSenha(ConfiguracaoSeguranca.PASSWORD_ENCODER
//                .encode("123456"));
//
//        Usuario administrador = new Usuario();
//        usuarioSistema.setPermissoes(Arrays.asList("atendente"));
//        Scanner scanner = new Scanner(System.in);
//        System.out.println("Entre com o Nome do administrador do sistema: ");
//        String nome = scanner.nextLine();
//        System.out.println("Entre com o Login do administrador do sistema: ");
//        String login = scanner.nextLine();
//        System.out.println("Entre com a senha do administrador do sistema, minímo (6) caracteres: ");
//        String senha = scanner.nextLine();
//        administrador.setNome(nome);
//        administrador.setLogin(login);
//        administrador.setSenha(ConfiguracaoSeguranca.PASSWORD_ENCODER
//                .encode(senha));
//        administrador.setPermissoes(Arrays.asList("administrador"));
//
//        usuarioRepository.save(administrador);
//        usuarioRepository.save(usuarioSistema);
//
//        Cliente cliente = new Cliente("Adão de Paula", "apaula@gmail.com",
//                "rua das hortências nº 120, bairro Auxiliadora");
//        Cliente cliente1 = new Cliente("Paula dos Santos", "paulas@gmail.com",
//                "rua Barão de Cotegipe nº 10, bairro Bela Praia");
//        Cliente cliente2 = new Cliente("Pedro Malazarte", "pmal@gmail.com",
//                "rua da pedreira nº 18, bairro Navegantes");
//        Cliente cliente3 = new Cliente("Mara Regina", "mare@gmail.com",
//                "rua sem nome nº 90, bairro Restinga");
//        List<Cliente> clientes = new ArrayList<>();
//        clientes.add(cliente);
//        clientes.add(cliente1);
//        clientes.add(cliente2);
//        clientes.add(cliente3);
//        clienteRepository.saveAll(clientes);
//
//        Servico servico = new Servico("Pinturas", "Pinturas em geral, interna, externa reparos",
//                "R$ 35,00 o metro quadrado, mínimo de 50 metros", 1750D);
//        Servico servico1 = new Servico("Corte de grama", "Corte de grama e varrição",
//                "R$ 5,00 o metro quadrado, mínimo de 80 metros", 400D);
//        Servico servico2 = new Servico("Poda", "Serviço de podas de árvores de grande e" +
//                " pequeno porte além de árvores frutíferas",
//                "R$ 50,00 a hora, mínimo de 2h", 100D);
//        Servico servico3 = new Servico("Marido de aluguel", "Pequenos reparos, " +
//                "como trocas ou instalações de tomada, de lâmpadas, chuveiros",
//                "R$ 100,00 o valor mínimo para visita", 100D);
//
//        List<Servico> servicos = new ArrayList<>();
//        servicos.add(servico);
//        servicos.add(servico1);
//        servicos.add(servico2);
//        servicos.add(servico3);
//        servicoRepository.saveAll(servicos);
//
//        Recibo recibo = new Recibo(new Date(), 1000D, cliente, servico, usuarioSistema);
//        Recibo recibo1 = new Recibo(new Date(), 500D, cliente3, servico, usuarioSistema);
//        Recibo recibo2 = new Recibo(new Date(), 400D, cliente1, servico, usuarioSistema);
//
//        List<Recibo> recibos = new ArrayList<>();
//        recibos.add(recibo);
//        recibos.add(recibo1);
//        recibos.add(recibo2);
//
//        reciboRepository.saveAll(recibos);
    }
}
