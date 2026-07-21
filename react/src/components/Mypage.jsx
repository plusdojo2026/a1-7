import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Mypage.css";

const Mypage = () => {
    let [users, setUsers] = useState({});
    let [modUsers, setModUsers] = useState({ user_id: '', pw: '' , name: '',targetPrice:''});
    
    let [showUsersModal, setShowUsersModal] = useState(false);
    let [showGabageTypeModal, setShowGabageTypeModal] = useState(false);
    let [showMoneyModal, setShowMoneyModal] = useState(false);

    let inputModUsers = (e) => {
        setModUsers({ ...modUsers, [e.target.name]: e.target.value });
    }

    let modUsersStart = (users) => {
        setModUsers(users);
        toggleUsersModal();
    }
    let modGabageTypeStart = (users) => {
        setModUsers(users);
        toggleGabageTypeModal();
    }
    let modMoneyStart = (users) => {
        setModUsers(users);
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

    //useEffect(() => {
    //    refreshUsers();
    //}, []);
    let refreshUsers = () => {
        fetch('/api/Users/')
            .then(response => response.json())
            .then(json => setUsers(json));
    }
    let updateUsers = () => {
        axios.post('/api/Users/mod/', modUsers)
        .then(response => {
            refreshUsers();
            toggleUsersModal();
        });
    }
    let updateGabageType = () => {
        axios.post('/api/Users/mod/', modUsers)
        .then(response => {
            refreshUsers();
            toggleGabageTypeModal();
        });
    }
    let updateMoney = () => {
        axios.post('/api/Users/mod/', modUsers)
        .then(response => {
            refreshUsers();
            toggleMoneyModal();
        });
    }

    return (
        <div className="login-container">
            <h1>マイページ</h1>
            <p className="form-group">ユーザー名: {users.name}</p>
            <button className="login-button" onClick={() => modUsersStart(users)}>編集</button>
            <button className="login-button" onClick={() => modGabageTypeStart(users)}>ゴミの日曜日設定</button>
            <button className="login-button" onClick={() => modMoneyStart(users)}>目標金額設定</button>
            {/* モーダルウィンドウ(編集) */}
            {showUsersModal &&
                <div id="overlay">
                    <div id="content">
                        ユーザー名：
                        <input
                            type="text"
                            name="name"
                            value={modUsers.name}
                            onChange={inputModUsers}
                        />
                        <br />

                        ID：
                        <input
                            type="text"
                            name="userId"
                            value={modUsers.userId}
                            onChange={inputModUsers}
                        />
                        <br />

                        変更前PW：
                        <input
                            type="password"
                            name="pw"
                            value={modUsers.pw}
                            onChange={inputModUsers}
                        />
                        <br />
                        変更PW：
                        <input
                            type="password"
                            name="pw"
                            value={modUsers.pw}
                            onChange={inputModUsers}
                        />
                        <br />


                        <button onClick={updateUsers}>更新</button>
                        <button onClick={toggleUsersModal}>閉じる</button>
                    </div>
                </div>
            }
            {/* モーダルウィンドウ(編集) */}
            {showGabageTypeModal &&
                <div id="overlay">
                    <div id="content">
                        可燃ごみ：
                        <select name="kind" value={modUsers.fireGarbage} onChange={inputModUsers}>
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
                        <select name="kind" value={modUsers.nofireGarbage} onChange={inputModUsers}>
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
                        <select name="kind" value={modUsers.landfillGarbage} onChange={inputModUsers}>
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
                        <select name="kind" value={modUsers.recycleGarbage} onChange={inputModUsers}>
                            <option value="1">月曜日</option>
                            <option value="2">火曜日</option>
                            <option value="3">水曜日</option>
                            <option value="4">木曜日</option>
                            <option value="5">金曜日</option>
                            <option value="6">土曜日</option>
                            <option value="7">日曜日</option>
                        </select>
                        <br />


                        <button onClick={updateGabageType}>更新</button>
                        <button onClick={toggleGabageTypeModal}>閉じる</button>
                    </div>
                </div>
            }
            {/* モーダルウィンドウ(編集) */}
            {showMoneyModal &&
                <div id="overlay">
                    <div id="content">
                        目標金額設定：
                        <input
                            type="text"
                            name="targetPrice"
                            value={modUsers.targetPrice}
                            onChange={inputModUsers}
                        />
                        <br />

                        <button onClick={updateMoney}>更新</button>
                        <button onClick={toggleMoneyModal}>閉じる</button>
                    </div>
                </div>
            }
        </div>
    );
};
export default Mypage;