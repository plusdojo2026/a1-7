package com.example.demo.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

@Autowired
private UsersRepository repository;

//@PostMapping("/Login")
//public String login(@RequestBody("userId") Integer id, @RequestBody("pw") String pw) {
//		
//	if(id == null || pw == null){
//		return "※IDとPWを入力してください！";
//	}else {
//		Users users = repository.findByUserId(userId).get();
//	
//		if(users.getPw().equals(pw)){
//	        return "OK";
//	    } else {
//	        return "※IDまたはPWが違います";
//	    }
//	}
//}
@PostMapping("/Login")
public String login(@RequestBody Users user) {
	
	String userId = user.getUserId();
	String pw = user.getPw();
	
	if(userId == null || pw == null) {
		return "※IDとPWを入力してください！";
	}
	
	Users users = repository.findByUserId(userId);
	
	if(users == null) {
		return "※IDまたはPWが違います";
	}
	
	if(users.getPw().equals(pw)) {
		return "OK";
	}else {
		return"※IDまたはPWが違います";
	}
}

@PostMapping("/Register/")
public String add(@RequestBody Users user){
	repository.save(user);
	return "OK";
}
}