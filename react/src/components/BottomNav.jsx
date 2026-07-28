import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation  } from "react-router-dom";
import { useState, useEffect } from "react";
import './BottomNav.css'; 

export default function BottomNav() {
    const location = useLocation();

    const [value, setValue] = useState(location.pathname);

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    return (
        <div className="bottom-nav">
        <BottomNavigation showLabels className="nav" value={value}>
            <BottomNavigationAction label="分析" icon={<BarChartIcon />}
                component={Link}
                to="/Chart"
                value="/Chart" 
                />
            <BottomNavigationAction label="検索" icon={<SearchIcon />}
                component={Link}
                to="/ProductSearch"
                value="/ProductSearch"
                 />
            <BottomNavigationAction label="ホーム" icon={<HomeIcon />}
                component={Link}
                to="/Calendar"
                value="/Calendar"
                 />
            <BottomNavigationAction label="仕分け" icon={<CategoryIcon />}
                component={Link}
                to="/ProductSorting"
                value="/ProductSorting"
                 />
            <BottomNavigationAction label="マイページ" icon={<PersonIcon />}
                component={Link}
                to="/Mypage"
                value="/Mypage"
                 />
        </BottomNavigation>
        </div>
    )
}

