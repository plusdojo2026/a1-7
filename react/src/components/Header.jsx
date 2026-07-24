import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Link } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import axios from "axios"; 
import logoImg from "../img/logo.png";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [id] = useState(() => sessionStorage.getItem("id"));

  const separationLabel = (type) => {
    switch (type) {
      case 1: return "🔥可燃ごみ";
      case 2: return "💎不燃ごみ";
      case 3: return "♻️埋め立てごみ";
      case 4: return "🪵その他";
      default: return "";
    }
  };

  useEffect(() => {
    if (!id) return;

    fetch(`/api/waste/?id=${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((json) => {
        console.log("APIから返ってきた生データ:", JSON.stringify(json[0], null, 2));
        const filtered = (json || []).filter(
          (item) => item.checkBox === false && item.ap_type === 2
        );
        setProducts(filtered);
      })
      .catch((err) => console.error("メニュー用データ取得エラー:", err));
  }, [id]);

  const handleCheck = (item) => {
    const updated = { ...item, checkBox: true };

    axios
      .post("/api/waste/mod/", updated)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== item.id));
      })
      .catch((err) => console.error("チェック更新エラー:", err));
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div className="header-nav">
            <BottomNavigation showLabels className="header-bottom-nav">
              <BottomNavigationAction
                label="ログアウト"
                icon={<MeetingRoomIcon />}
                component={Link}
                to="/"
                className="logout-action"
              />
            </BottomNavigation>
          </div>

          <div className="header-logo">
            <Link to="/Calendar">
              <img src={logoImg} alt="ロゴ" />
            </Link>
          </div>

          <div className="header-menu">
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="side-panel-overlay" onClick={() => setIsOpen(false)}>
          <nav className="side-panel" onClick={(e) => e.stopPropagation()}>
            {products.length === 0 ? (
              <p className="side-panel-empty">対象の商品はありません</p>
            ) : (
              <>
                <h3 className="side-panel-title">必ず捨てるもの達！</h3>
                <h5>捨てたらチェックを付けてください</h5>
                <table className="side-panel-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>購入日</th>
                      <th>商品名</th>
                      <th>分別</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr className="wasterow" key={item.id}>
                        <td className="check">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleCheck(item)}
                          />
                        </td>
                        <td className="date">
                          {item.buyDate ? item.buyDate.substring(0, 10) : ""}
                        </td>
                        <td className="name">{item.name}</td>
                        <td className="separation">
                          {separationLabel(item.separation)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </nav>
        </div>
      )}
    </>
    
  );
}