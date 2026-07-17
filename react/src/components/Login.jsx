import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//import "../css/Login.css"; 

const Login = () => {

    let navigate = useNavigate();
    let [users, setUsers] = useState({userId: "", pw: "" });
    let inputUsers = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    let handleClick = () => {

        if(users.userId === ""){
            alert("ログインIDを入力してください。")
            return;
        }

         if(users.pw === ""){
            alert("パスワードを入力してください。")
            return;
        }
        axios.post('http://localhost:8080/Login',users)
        .then(response => {
            if(response.data === "OK"){
                alert("ログイン成功");
            }else{
                alert(response.data);
            }
        });
    }
    return (
        <div className="login-container">
            <h1>ログイン</h1>
        <p className="form-group">ID
            <input type="text" name="userId" value={users.userId} onChange={inputUsers}></input>
            </p>
        <p className="form-group">PW
            <input type="password" name="pw" value={users.pw} onChange={inputUsers}></input>
        </p>
		
        <button className="login-button"  onClick={handleClick}>ログイン</button>

        <h2>新規会員登録はこちらから</h2>
        <button className="register-button" onClick={() => navigate("/Register")}>新規会員登録</button>
        </div>
    );
}
export default Login;