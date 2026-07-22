package com.example.demo.controller.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
            targetPrice = null;
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
                int overAmount = totalWaste - targetPrice;

                if (overAmount <= 10000) { 
                    for (int i = 201; i <= 210; i++) {
                        targetIds.add(i);
                    }
                } else {
                    for (int i = 301; i <= 350; i++) {
                        targetIds.add(i);
                    }
                }
            }
        }

        // 1. リスト(targetIds)からランダムに1つのIDを決定
        Random random = new Random();
        int selectedId = targetIds.get(random.nextInt(targetIds.size()));

        // ★★★ ここでコンソールに選ばれた comment id を出力！ ★★★
        System.out.println("==========================================");
        System.out.println("★ 選ばれた comment id: " + selectedId);
        System.out.println("==========================================");

        // 2. 選ばれたIDを元にDBからコメントを取得
        Comment randomComment = commentRepository.findById(selectedId).orElse(null);

        return randomComment != null ? randomComment.getComment() : "コメントが見つかりませんでした。";
    }
}