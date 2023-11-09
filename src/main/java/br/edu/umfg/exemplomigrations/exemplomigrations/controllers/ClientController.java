package br.edu.umfg.exemplomigrations.exemplomigrations.controllers;

import br.edu.umfg.exemplomigrations.exemplomigrations.model.Client;
import br.edu.umfg.exemplomigrations.exemplomigrations.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postClient (@RequestBody Client client){
        Optional<Client> existingClient = clientRepository.findByEmail(client.getEmail());
        if (existingClient.isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado.");
        }
        clientRepository.save(client);
        return ResponseEntity.ok(client);
    }

    @GetMapping("/login")
    public ResponseEntity<?> getClientLogin(@RequestParam String email, @RequestParam String password){
        Optional<Client> client = clientRepository.findByEmail(email);
        if(client.isPresent() && client.get().getPassword().equals(password)) {
            return ResponseEntity.ok("Cliente logado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos.");
        }
    }
}
