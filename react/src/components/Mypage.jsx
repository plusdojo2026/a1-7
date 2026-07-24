import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Mypage.css";
import icon from "../img/sample.png";
import BottomNav from "./BottomNav";
import Header from "./Header";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const Mypage = () => {
    let [users, setUsers] = useState({});
    let [modUsers, setModUsers] = useState({ id: null, userId: '', pw: '' , newPw: '', name: '',fireGarbage: 1, nofireGarbage:1, landfillGarbage:1, recycleGarbage: 1, targetPrice: 1});
    
    let [showUsersModal, setShowUsersModal] = useState(false);
    let [showGabageTypeModal, setShowGabageTypeModal] = useState(false);
    let [showMoneyModal, setShowMoneyModal] = useState(false);

//　マイページアイコン写真
    let[file, setFile] = useState(null);
    let changeFile = (e)=> {
        setFile(e.target.files[0]);
    }
// ここまで

    let inputModUsers = (e) => {
        setModUsers({ ...modUsers, [e.target.name]: e.target.value });
    }

    let modUsersStart = (users) => {
         console.log(users);
        setModUsers({
            ...users,
            newPw: ''
        });
        toggleUsersModal();
    }
    let modGabageTypeStart = (users) => {
        setModUsers({
            ...users,
        });
        toggleGabageTypeModal();
    }
    let modMoneyStart = (users) => {
        setModUsers({...users});
        toggleMoneyModal();
    }

    let toggleUsersModal = () => {
        setShowUsersModal(!showUsersModal);
    }
    let toggleGabageTypeModal = () => {
        setShowGabageTypeModal(!showGabageTypeModal);
    }
    let toggleMoneyModal = () => {
        setShowMoneyModal(!showMoneyModal);
    }
    useEffect(() => {
        refreshUsers();
    }, []);
    let refreshUsers = () => {

        let id = sessionStorage.getItem("id");

        fetch(`/api/users/${id}`)
            .then(response => response.json())
            .then(json => setUsers(json));
    }
    let updateUsers = () => {

        //エラーチェック
        if(modUsers.name === ""){
            alert("ユーザー名を入力してください。")
            return;
        }
        if(modUsers.name.length <1 || modUsers.name.length > 10){
            alert("ユーザー名は1文字以上10文字以下で入力してください。");
            return;
        }
        if(modUsers.userId === ""){
            alert("ログインIDを入力してください。");
            return;
        }  
        if(modUsers.userId.length < 8 || modUsers.userId.length > 50){
            alert("ログインIDは8文字以上50文字以下で入力してください。");
            return;
        }
        if(modUsers.pw === ""){
            alert("現在のパスワードを入力してください。");
            return;
        }
        if(modUsers.newPw === ""){
            alert("新しいパスワードを入力してください。");
            return;
        }
        if(modUsers.newPw.length < 8 || modUsers.newPw.length > 50){
            alert("パスワードは8文字以上50文字以下で入力してください。");
            return;
        }
        //現在のパスワードが一致しているか
        axios.post("/api/users/checkPw",modUsers)
        .then(response =>{

            //pwが違う
            if(response.data !== "OK"){
                alert(response.data);
                return;
            }
        
        //newPwをDBに登録
        let updateData = {
            ...modUsers,
            pw: modUsers.newPw
        };
        axios.post('/api/users/mod/', updateData)
        .then(response => {

              if(response.data === "OK"){

            alert("更新しました");

            refreshUsers();
            toggleUsersModal();

              }else{
                alert(response.data);
              }
        });
    });
}  
    let updateGabageType = () => {
        axios.post('/api/users/mod/', modUsers)
        .then(response => {
            refreshUsers();
            setModUsers({ fireGarbage: 1, nofireGarbage:1, landfillGarbage:1, recycleGarbage: 1 });
            toggleGabageTypeModal();
        });
    }
    let updateMoney = () => {
        axios.post('/api/users/mod/', modUsers)
        .then(response => {
            refreshUsers();
            toggleMoneyModal();
        });
    }

    //　マイページアイコン写真ここから
        let upload =() => {

            console.log(users);
            console.log(file);

            if (!users.id || !file) {
                alert("画像を選択してください");
                return;
            }

            const formData = new FormData();
    
 
            formData.append("user_id", users.id);
            formData.append("image", file);
            
            axios.post('/api/users/upload/', formData)
            
            .then(response => { alert("アップロードしました");
            window.location.reload();
                });
        }
    
      
                
    

    return (        
        <div>
            <Header />
            
        <div className="mypage-container">
            <h1>MY PAGE</h1>
            <div className="image-area">
             <label htmlFor="imageInput">
            
                <img className="user-icon" src={users.id ? "/api/users/images/" + users.id : icon}
                onError={(e) =>  e.
                currentTarget.src =  icon} />
                
    </label>
                <button className="save-button" onClick={upload}>✔</button>
                
                </div>
                <input id="imageInput" type="file" style={{display:"none"}} onChange={changeFile} />

            <p className="form-group">{users.name}さん</p>

            <button className="mypage-button-3" onClick={() => modUsersStart(users)}> プロフィール編集</button>
            <p className="form-group-p">設定</p>
            <button className="mypage-button-3" onClick={() => modGabageTypeStart(users)}> ごみ回収スケジュール</button>
            <button className="mypage-button-3" onClick={() => modMoneyStart(users)}> 目標金額</button>
            {/* モーダルウィンドウ(編集) */}
            {showUsersModal &&
                <div id="overlay">
                    <div id="content">
                        <div className="modal-item">
                        ユーザー名<br></br>
                        <input
                            type="text"
                            name="name"
                            value={modUsers.name}
                            onChange={inputModUsers}
                        />
                        <br />
                        </div>
                        <div className="modal-item">
                        ID<br></br>
                        <input
                            type="text"
                            name="userId"
                            value={modUsers.userId}
                            onChange={inputModUsers}
                        />
                        <br />
                        </div>

                        <div className="modal-item">
                        変更前PW<br></br>
                        <input
                            type="password"
                            name="pw"
                            value={modUsers.pw}
                            onChange={inputModUsers}
                        />
                        <br />
                        </div>

                        変更PW<br></br>
                        <input
                            type="password"
                            name="newPw"
                            value={modUsers.newPw}
                            onChange={inputModUsers}
                        />
                        <br />

<div class="button-group">
                        <button onClick={updateUsers}>更新</button>
                        <button onClick={toggleUsersModal}>閉じる</button>
                        </div>
                    </div>
                </div>
            }
            {/* モーダルウィンドウ(編集) */}
            {showGabageTypeModal &&
                <div id="overlay">
                    <div id="content">
                        可燃ごみ：
                        <select className="p" name="fireGarbage" value={modUsers.fireGarbage} onChange={inputModUsers}>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="7">日曜日</option>
                        </select>
                        <br />
                        資源ごみ：
                        <select className="p" name="nofireGarbage" value={modUsers.nofireGarbage} onChange={inputModUsers}>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="7">日曜日</option>
                        </select>
                        <br />
                        不燃ごみ：
                        <select className="p" name="landfillGarbage" value={modUsers.landfillGarbage} onChange={inputModUsers}>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="7">日曜日</option>
                        </select>
                        <br />
                        埋め立てごみ：
                        <select className="p" name="recycleGarbage" value={modUsers.recycleGarbage} onChange={inputModUsers}>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="7">日曜日</option>
                        </select>
                        <br />

<div class="button-group">
                        <button onClick={updateGabageType}>更新</button>
                        <button onClick={toggleGabageTypeModal}>閉じる</button>
                        </div>
                    </div>
                </div>
            }
            {/* モーダルウィンドウ(編集) */}
            {showMoneyModal &&
                <div id="overlay">
                    <div id="content">
                        目標金額設定
                        <input
                            type="text"
                            name="targetPrice"
                            value={modUsers.targetPrice|| ""}
                            onChange={inputModUsers}
                        />
                        <br />
<div class="button-group">
                        <button onClick={updateMoney}>更新</button>
                        <button onClick={toggleMoneyModal}>閉じる</button>
                        </div>
                    </div>
                </div>
            }

        </div>
        <BottomNav class="BottomNav" />
        </div>
    );
};
export default Mypage;