package com.example.demo.controller.api;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Users;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:5173" ,allowCredentials = "true")
@RequestMapping("/api")
public class CommentRandomController {

    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private UsersRepository userRepository;
    
    @GetMapping("/random-text")
    public String getRandomComment(
    		@RequestParam("id") Integer id, HttpSession session) {
        
    	Integer totalWaste = (Integer) session.getAttribute("totalWaste");
        
        Users user = userRepository.findById(id).orElse(null);
        Integer targetPrice = (user != null) ? user.getTargetPrice() : null;
        
        int selectedId;

        if (totalWaste == null || targetPrice == null) {
            selectedId = ThreadLocalRandom.current().nextInt(1, 51);
        }
        else if (targetPrice >= totalWaste) {
            selectedId = ThreadLocalRandom.current().nextInt(51, 101);
        }
        else {
            boolean chooseFirstGroup = ThreadLocalRandom.current().nextBoolean();
            if (chooseFirstGroup) {
                selectedId = ThreadLocalRandom.current().nextInt(1, 51);
            } else {
                selectedId = ThreadLocalRandom.current().nextInt(101, 151);
            }
        }

        System.out.println("==========================================");
        System.out.println("★ 選ばれた comment id: " + selectedId);
        System.out.println("★ 選ばれた totalWaste: " + totalWaste);
        System.out.println("★ 選ばれた targetPrice: " + targetPrice);
        System.out.println("==========================================");

        Comment randomComment = commentRepository.findById(selectedId).orElse(null);

        return (randomComment != null) ? randomComment.getComment() : "コメントが見つかりませんでした。";
    }
}