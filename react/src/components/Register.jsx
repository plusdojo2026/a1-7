import axios from "axios";
import { useState } from "react";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();

    let [newUsers, setNewUsers] = useState({ name: '', userId: '', pw: ''});

    let [confirmPassword, setConfirmPassword] = useState("");

    let inputNewUsers = (e) => {
        setNewUsers({ ...newUsers, [e.target.name]: e.target.value });
    }
    let inputConfirmPassword =(e) => {
        setConfirmPassword(e.target.value);
    }

    let createFrequency = (id) => {
        const frequencyForm = {
            id: null,
            userId: id,
            gabageType: null,
            firstWeek: null,
            secondWeek: null,
            thirdWeek: null,
            fourthWeek: null,
            dayOfWeek: null,
            dayOfWeek2: null
        };

        // デバッグ用ログ：どんなデータが送られるか確認
        console.log("【送信データ】frequencyForm:", frequencyForm);

        axios.post('http://localhost:8080/api/frequency/add/', frequencyForm)
        .then(response => {
          console.log('Frequencyレコードをつくったお', response.data);
        })
        .catch(error => {
          console.error("Frequency作成失敗", error);
        });
    };

    let handleClick = () => {
        if(newUsers.name === ""){
            alert("ユーザー名を入力してください。")
            return;
        }
        if(newUsers.name.length < 1 || newUsers.name.length > 10){
            alert("ユーザー名は1文字以上10文字以下で入力してください。");
            return;
        }
        if(newUsers.userId === ""){
            alert("ログインIDを入力してください。")
            return;
        }
        if(newUsers.userId.length < 8 || newUsers.userId.length > 50){
            alert("ログインIDは8文字以上50文字以下で入力してください。");
            return;
        }
        if(newUsers.pw === ""){
            alert("パスワードを入力してください。")
            return;
        }
        if(newUsers.pw.length < 8 || newUsers.pw.length > 50){
            alert("パスワードは8文字以上50文字以下で入力してください。");
            return;
        }
        if(confirmPassword === ""){
            alert("正しいパスワードを入力してください。")
            return;
        }
        if(newUsers.pw !== confirmPassword){
            alert("パスワードが一致しません。")
            return;
        }

        axios.post('http://localhost:8080/Register', newUsers)
        .then(response => {
            console.log("登録レスポンス(response.data):", response.data);

            if(response.data){
                alert("新規登録しました");
                setNewUsers({ name: '', userId: '', pw: ''});
                setConfirmPassword("");
                
                createFrequency(response.data.id);
                navigate("/");
            }else{
                alert("登録に失敗しました");
            }
        })
        .catch(error => {
            console.error("ユーザー登録エラー", error);
        });
    }

    return(
        <div className="register-page">
        <div className="login-container2">
            <h1>新規会員登録</h1>
            <p className="form-group2">ユーザー名
            <input type="text" name="name" value={newUsers.name} onChange={inputNewUsers} placeholder="10文字以下"></input></p>
            <p className="form-group2">ID
            <input type="text" name="userId" value={newUsers.userId} onChange={inputNewUsers} placeholder="8文字以上50文字以下"></input></p>
            <p className="form-group2">PW
            <input type="password" name="pw" value={newUsers.pw} onChange={inputNewUsers} placeholder="8文字以上50文字以下"></input></p>
            <p className="form-group2">PW（確認用）
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={inputConfirmPassword} placeholder="確認用"></input></p>
            <button className="login-button2" onClick={handleClick}>新規登録</button>
            <Link to="/" className="back-login">
            前の画面に戻る
            </Link>
        </div>
        </div>
    );
}
export default Register;