package com.example.demo.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class CommentRandomController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/random-text")
    public String getRandomComment(@RequestParam("userId") Integer userId, HttpSession session) {
        
        Integer totalWaste = (Integer) session.getAttribute("totalWaste");
        if (totalWaste == null) {
            totalWaste = 0;
        }

        Integer targetPrice = null;
        try {
            targetPrice = jdbcTemplate.queryForObject(
                "SELECT target_price FROM users WHERE id = ?", Integer.class, userId
            );
        } catch (Exception e) {
        }

        List<Integer> targetIds = new ArrayList<>();

        for (int i = 1; i <= 99; i++) {
            targetIds.add(i);
        }

        if (targetPrice != null) {
            if (totalWaste <= targetPrice) {
                for (int i = 101; i <= 110; i++) {
                    targetIds.add(i);
                }
            } else {
                for (int i = 201; i <= 210; i++) {
                    targetIds.add(i);
                }
            }
        }

        Comment randomComment = commentRepository.findRandomCommentInIds(targetIds);
        
        return randomComment != null ? randomComment.getComment() : "コメントが見つかりませんでした。";
    }
}