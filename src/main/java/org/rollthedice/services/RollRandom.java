package org.rollthedice.services;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/roll")
public class RollRandom {
    private final Random ran = new Random();
    private int rando = -1;
    @GetMapping("/random-number")
    public int rollRandomNumber(){
        return (ran.nextInt(6)+1);
    }

    @GetMapping("/bet")
    public boolean bet(int value) {
        rando = rollRandomNumber();
        return value == rando;
    }

}
