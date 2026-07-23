package com.example.demo.controller.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Images;
import com.example.demo.entity.Users;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.UsersRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

@Autowired
private UsersRepository repository;

//マイページ写真
@Autowired
private ImagesRepository imagesRepository;

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

@PostMapping("/api/users/checkPw")
public String checkPw(@RequestBody Users user){

    // idから現在のユーザーを取得
    Users dbUser = repository.findById(user.getId()).orElse(null);

    if(dbUser == null){
        return "ユーザーが存在しません";
    }

    // 入力された現在のパスワードとDBを比較
    if(dbUser.getPw().equals(user.getPw())){
        return "OK";
    }

    return "現在のパスワードが違います";
}
//マイページ写真
@PostMapping("/api/users/upload/")
public String uploadImage(
		@RequestParam("user_id") Integer userId
		,@RequestParam("image") MultipartFile file
) {
	try {
	Images image = imagesRepository.findFirstByUserIdOrderByIdAsc(userId);
	if(image == null){
      image = new Images();
	image.setUserId(userId);
	}
	image.setImageData(file.getBytes());
	image.setMimeType(file.getContentType());
	image.setUserImg(file.getOriginalFilename());
	
	imagesRepository.save(image);

	return "OK";
} catch (IOException e) {
 e.printStackTrace();
 return "NG";
}
}
@GetMapping("/api/users/images/{user_id}")
public ResponseEntity<byte[]> getImage(
		@PathVariable("user_id") Integer userId) {
	Images image = imagesRepository.findFirstByUserIdOrderByIdAsc(userId);
	if(image == null) {
		return ResponseEntity.notFound().build();
	}
	ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.ok();
	MediaType mediaType = MediaType.parseMediaType(image.getMimeType());
	responseBuilder.contentType(mediaType);
	ResponseEntity<byte[]> response = responseBuilder.body(image.getImageData());
	return response;
}
}