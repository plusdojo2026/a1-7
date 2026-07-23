import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Link } from "react-router-dom";
import logoImg from "../img/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/Calendar">
            <img src={logoImg} alt="ロゴ" />
          </Link>
        </div>
        
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
      </div>
    </header>
  );
}