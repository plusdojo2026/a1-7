package com.example.demo.controller.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

@PostMapping("/Login")
public Map<String, Object> login(@RequestBody Users user) {
	
	Map<String, Object> result = new HashMap<>();
	
	String userId = user.getUserId();
    String pw = user.getPw();
	
    Users users = repository.findByUserId(userId);
    
	if(users == null) {
		
		result.put("result", "NG");
        result.put("message", "ログインIDまたはパスワードに誤りがあります");
		return result;
	}
	
	if(users.getPw().equals(pw)) {
		 // ログイン成功
        result.put("result", "OK");

        // idを返す
        result.put("id", users.getId());

        // userIdを返す
        result.put("userId", users.getUserId());

	}else {
        result.put("result", "NG");
        result.put("message", "ログインIDまたはパスワードに誤りがあります");
	}
	System.out.println(result);
	return result;
}

@PostMapping("/Register")
public String add(@RequestBody Users user){
	Users exist = repository.findByUserId(user.getUserId());

    if(exist != null){
        return "このログインIDは既に使用されています";
    }
	repository.save(user);
	return "OK";
}

@GetMapping("/api/users/{id}")
public Users get(@PathVariable Integer id){
    return repository.findById(id).get();
}
@PostMapping("/api/users/mod/")
public Object mod(@RequestBody Users user) {
	
	Users exist = repository.findByUserId(user.getUserId());
	
	 // 自分以外がそのuserIdを使っていたらエラー
    if(exist != null && !exist.getId().equals(user.getId())) {
        return "このログインIDは既に使用されています";
    }
	repository.save(user);
	
	return "OK";
}
}