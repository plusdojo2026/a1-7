import axios from "axios";
import { useState } from "react";
import "../css/Register.css";

const Register = () => {

    let [newUsers, setNewUsers] = useState({ name: '', userId: '', pw: ''});

    let [confirmPassword, setConfirmPassword] = useState("");

    let inputNewUsers = (e) => {
        setNewUsers({ ...newUsers, [e.target.name]: e.target.value });
    }
    let inputConfirmPassword =(e) => {
        setConfirmPassword(e.target.value);
    }

    let handleClick = () => {
        if(newUsers.name === ""){
            alert("ユーザー名を入力してください。")
            return;
        }
        if(newUsers.userId === ""){
            alert("ログインIDを入力してください。")
            return;
        }

        if(newUsers.pw === ""){
            alert("パスワードを入力してください。")
            return;
        }
        if(newUsers.pw !== confirmPassword){
            alert("パスワードが一致しません。")
            return;
        }
        axios.post('http://localhost:8080/Register', newUsers)
        .then(response => {
            alert("新規登録しました");
            setNewUsers({ name: '', userId: '', pw: ''});
        });
    }
    return(
        <div className="login-container">
            <h1>新規会員登録</h1>
            <p className="form-group">ユーザー名
            <input type="text" name="name" value={newUsers.name} onChange={inputNewUsers} placeholder="10文字以下"></input></p>
            <p className="form-group">ID
            <input type="text" name="userId" value={newUsers.userId} onChange={inputNewUsers} placeholder="8文字以上50文字以下"></input></p>
            <p className="form-group">PW
            <input type="password" name="pw" value={newUsers.pw} onChange={inputNewUsers} placeholder="8文字以上50文字以下"></input></p>
            <p className="form-group">PW（確認用）
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={inputConfirmPassword}placeholder="確認用"></input></p>
            <button className="login-button" onClick={handleClick}>新規登録</button>
        </div>
    );
}
export default Register;