import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Mypage.css";
import icon from "../img/sample.png";
import BottomNav from "./BottomNav";
import Header from "./Header";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const Mypage = () => {
    let [users, setUsers] = useState({});
    let [modUsers, setModUsers] = useState({ id: null, userId: '', pw: '' , newPw: '', name: '',fireGarbageDay: 1, nofireGarbageDay:1, landfillGarbageDay:1, recycleGarbageDay: 1, targetPrice: 1,
});
    let [frequency,setFrequency] = useState({
        fireGarbage:{
        firstWeek:false,
        secondWeek:false,
        thirdWeek:false,
        fourthWeek:false
    },

    nofireGarbage:{
        firstWeek:false,
        secondWeek:false,
        thirdWeek:false,
        fourthWeek:false
    },

    landfillGarbage:{
        firstWeek:false,
        secondWeek:false,
        thirdWeek:false,
        fourthWeek:false
    },

    recycleGarbage:{
        firstWeek:false,
        secondWeek:false,
        thirdWeek:false,
        fourthWeek:false
    }
    });
    
    let [showUsersModal, setShowUsersModal] = useState(false);
    let [showGabageTypeModal, setShowGabageTypeModal] = useState(false);
    let [showMoneyModal, setShowMoneyModal] = useState(false);

//　マイページアイコン写真
    let[file, setFile] = useState(null);
    let changeFile = (e)=> {
        setFile(e.target.files[0]);
    }

// 変更 頻度
    let inputModUsers = (e) => {
    let {name, type, value, checked} = e.target;
    setModUsers({
        ...modUsers,
        [name]: type === "checkbox" ? checked : value
    });
    };

    let inputFrequency = (e)=>{
    let {name,checked}=e.target;
    setFrequency({
        ...frequency,
        [name]:checked
    });
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
        .then(json => { 
            setUsers(json);       
            setModUsers(json);
        });


    fetch(`/api/users/frequency/${id}`)

.then(response => response.json())
.then(json => {

    setFrequency({
    fireGarbage: json.find(item => item.gabageType === 1),
    nofireGarbage: json.find(item => item.gabageType === 2),
    landfillGarbage: json.find(item => item.gabageType === 3),
    recycleGarbage: json.find(item => item.gabageType === 4)
});
});
    };
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
        <div className="mypage-page">
            <Header />
            
        <div className="mypage-container">
            <h1>MY PAGE</h1>
            <div className="image-area">
             <label htmlFor="imageInput">
            
                <img className="user-icon" src={users.id ? "/api/users/images/" + users.id : icon}
                onError={(e) =>  e.
                currentTarget.src =  icon} />
            </label>
                <button className="save-button" onClick={upload}>＋</button>
                
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

                        <div className="button-group">
                        <button className="submit" onClick={updateUsers}>更新</button>
                        <button className="close"  onClick={toggleUsersModal}>閉じる</button>
                        </div>
                    </div>
                </div>
            }
            {/* モーダルウィンドウ(編集) */}
            {showGabageTypeModal &&
                <div id="overlay">
                    <div id="content">
                        🔥可燃ごみ：
                        <select className="p" name="fireGarbageDay" value={modUsers.fireGarbage} onChange={inputModUsers}>
                            <option value="">選択してください</option>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="0">日曜日</option>
                        </select>
                        <br />

                    <div className="frequency">
                        <label>
                            <input type="checkbox" name="firstWeek" checked={frequency.fireGarbage?.firstWeek} onChange={inputFrequency}/>
                            第1週
                        </label>

                        <label>
                            <input type="checkbox" name="secondWeek" checked={frequency.fireGarbage?.secondWeek}onChange={inputFrequency}/> 
                            第2週
                        </label>

                        <label>
                            <input type="checkbox" name="thirdWeek" checked={frequency.fireGarbage?.thirdWeek} onChange={inputFrequency}/>
                            第3週
                        </label>

                        <label>
                            <input type="checkbox" name="fourthWeek" checked={frequency.fireGarbage?.fourthWeek} onChange={inputFrequency}/>
                            第4週
                        </label>
                    </div>
                        ♻️資源ごみ：
                        <select className="p" name="nofireGarbageDay" value={modUsers.nofireGarbage} onChange={inputModUsers}>
                            <option value="">選択してください</option>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="0">日曜日</option>
                        </select>
                        <br />
                    <div className="frequency">
                        <label>
                            <input type="checkbox" name="firstWeek" checked={frequency.nofireGarbage?.firstWeek} onChange={inputFrequency}/>
                            第1週
                        </label>

                        <label>
                            <input type="checkbox" name="secondWeek" checked={frequency.nofireGarbage?.secondWeek}onChange={inputFrequency}/> 
                            第2週
                        </label>

                        <label>
                            <input type="checkbox" name="thirdWeek" checked={frequency.nofireGarbage?.thirdWeek} onChange={inputFrequency}/>
                            第3週
                        </label>

                        <label>
                            <input type="checkbox" name="fourthWeek" checked={frequency.nofireGarbage?.fourthWeek} onChange={inputFrequency}/>
                            第4週
                        </label>
                    </div>
                        💎不燃ごみ：
                        <select className="p" name="landfillGarbageDay" value={modUsers.landfillGarbage} onChange={inputModUsers}>
                            <option value="0">選択してください</option>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="0">日曜日</option>
                        </select>
                        <br />
                    <div className="frequency">
                        <label>
                            <input type="checkbox" name="firstWeek" checked={frequency.landfillGarbage?.firstWeek} onChange={inputFrequency}/>
                            第1週
                        </label>

                        <label>
                            <input type="checkbox" name="lsecondWeek" checked={frequency.landfillGarbage?.secondWeek}onChange={inputFrequency}/> 
                            第2週
                        </label>

                        <label>
                            <input type="checkbox" name="thirdWeek" checked={frequency.landfillGarbage?.thirdWeek} onChange={inputFrequency}/>
                            第3週
                        </label>

                        <label>
                            <input type="checkbox" name="fourthWeek" checked={frequency.landfillGarbage?.fourthWeek} onChange={inputFrequency}/>
                            第4週
                        </label>
                    </div>
                        🪵埋め立てごみ：
                        <select className="p" name="recycleGarbageDay" value={modUsers.recycleGarbage} onChange={inputModUsers}><option value="">選択してください</option>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="0">日曜日</option>
                        </select>
                        <br />
                        <div className="frequency">
                        <label>
                            <input type="checkbox" name="firstWeek" checked={frequency.recycleGarbage?.firstWeek} onChange={inputFrequency}/>
                            第1週
                        </label>

                        <label>
                            <input type="checkbox" name="secondWeek" checked={frequency.recycleGarbage?.secondWeek}onChange={inputFrequency}/> 
                            第2週
                        </label>

                        <label>
                            <input type="checkbox" name="thirdWeek" checked={frequency.recycleGarbage?.thirdWeek} onChange={inputFrequency}/>
                            第3週
                        </label>

                        <label>
                            <input type="checkbox" name="fourthWeek" checked={frequency.recycleGarbage?.fourthWeek} onChange={inputFrequency}/>
                            第4週
                        </label>
                    </div>

<div class="button-group">
                        <button className="submit" onClick={updateGabageType}>更新</button>
                        <button className="close"  onClick={toggleGabageTypeModal}>閉じる</button>
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
                        /> 円
                        <br />
<div class="button-group">
                        <button className="submit"  onClick={updateMoney}>更新</button>
                        <button className="close" onClick={toggleMoneyModal}>閉じる</button>
                        </div>
                    </div>
                </div>
            }

        </div>
        <BottomNav className="BottomNav" />
        </div>
    );
};
export default Mypage;