package org.rollthedice.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/roll")
public class RollRandom {
    private final Random ran = new Random();

    @GetMapping("/random-number")
    public int rollRandomNumber(){
        return (ran.nextInt(7));
    }
}
