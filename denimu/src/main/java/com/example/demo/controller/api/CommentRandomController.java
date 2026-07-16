package com.example.demo.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.CommentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class CommentRandomController {

    @Autowired
    private CommentRepository repository;

    @GetMapping("/random-text")
    public String getRandomText() {
        int randomId = (int)(Math.random() * 10) + 1;
               
        return repository.findById(randomId).get().getComment();
    }
}