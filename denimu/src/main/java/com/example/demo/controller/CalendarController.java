package com.example.demo.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Frequency;
import com.example.demo.entity.Products;
import com.example.demo.entity.Users;
import com.example.demo.repository.FrequencyRepository;
import com.example.demo.repository.ProductsRepository;
import com.example.demo.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CalendarController {

    private static final ZoneId JST = ZoneId.of("Asia/Tokyo");

    private final ProductsRepository productsRepository;
    private final UsersRepository usersRepository;
    private final FrequencyRepository frequencyRepository;

    public CalendarController(
            ProductsRepository productsRepository,
            UsersRepository usersRepository,
            FrequencyRepository frequencyRepository
    ) {
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.frequencyRepository = frequencyRepository;
    }

    @GetMapping("/calc-waste")
    public int calculateAndSaveTotalWaste(
            @RequestParam("id") Integer id,
            @RequestParam(value = "month", required = false) String month, 
            HttpSession session
    ) {
        List<Products> products;

        if (month != null && !month.isEmpty()) {
            products = productsRepository.findByUserIdAndMonth(id, month); 
        } else {
            products = productsRepository.findByUserId(id);
        }

        int totalBuy = 0;
        int totalSell = 0;

        for (Products p : products) {
            if (p.getSellingPrice() != null) {
                totalBuy += p.getSellingPrice();
            }
            if (p.getPurchasePrice() != null) {
                totalSell += p.getPurchasePrice();
            }
        }

        int totalWaste = totalBuy - totalSell;

        session.setAttribute("totalWaste", totalWaste);

        System.out.println("★[" + month + "]のセッション保存値 totalWaste: " + session.getAttribute("totalWaste"));

        return totalWaste;
    }

    /**
     * 翌日のごみ出し通知チェック。
     * 本日すでに既読(last_login = 今日)なら show=false を返す。
     * 未読で、かつ翌日該当のごみ種別に未処理の products があれば show=true とその内容を返す。
     */
    @GetMapping("/notice/tomorrow")
    public Map<String, Object> checkTomorrowNotice(@RequestParam("id") Integer id) {

        Map<String, Object> result = new HashMap<>();
        result.put("show", false);

        Users user = usersRepository.findById(id).orElse(null);
        if (user == null) {
            return result;
        }

        // 本日すでに既読なら何も返さない
        LocalDate today = LocalDate.now(JST);
        if (user.getLastLogin() != null) {
            LocalDate lastLoginDate = user.getLastLogin().toInstant().atZone(JST).toLocalDate();
            if (lastLoginDate.isEqual(today)) {
                return result;
            }
        }

        LocalDate tomorrow = today.plusDays(1);
        int dayOfWeek = tomorrow.getDayOfWeek().getValue() % 7; // 日=0〜土=6 (JS の getDay() と揃える)
        int weekOfMonth = (tomorrow.getDayOfMonth() + 6) / 7;   // 1〜7日=第1週, 8〜14日=第2週...

        List<Frequency> rules = frequencyRepository.findByUserIdAndDay(id, dayOfWeek);

        List<Integer> garbageTypes = rules.stream()
                .filter(f -> isWeekActive(f, weekOfMonth))
                .map(Frequency::getGabageType)
                .distinct()
                .collect(Collectors.toList());

        if (garbageTypes.isEmpty()) {
            return result;
        }

        List<Products> targets = productsRepository.findUnprocessedByUserIdAndTypes(id, garbageTypes);

        if (targets.isEmpty()) {
            return result;
        }

        result.put("show", true);
        result.put("garbageTypes", garbageTypes);
        result.put("products", targets);
        return result;
    }

    /**
     * モーダルを閉じたタイミングで呼び出し、last_login を更新して既読扱いにする。
     */
    @PostMapping("/notice/close")
    public Map<String, Object> closeNotice(@RequestParam("id") Integer id) {
        Map<String, Object> result = new HashMap<>();

        Users user = usersRepository.findById(id).orElse(null);
        if (user == null) {
            result.put("result", "NG");
            return result;
        }

        user.setLastLogin(Date.from(ZonedDateTime.now(JST).toInstant()));
        usersRepository.save(user);

        result.put("result", "OK");
        return result;
    }

    private boolean isWeekActive(Frequency f, int week) {
        Boolean active = switch (week) {
            case 1 -> f.getFirstWeek();
            case 2 -> f.getSecondWeek();
            case 3 -> f.getThirdWeek();
            case 4 -> f.getFourthWeek();
            default -> false; // 第5週はどのフラグにも該当しないため通知なし（フロントの既存ロジックと同じ）
        };
        return Boolean.TRUE.equals(active);
    }
}