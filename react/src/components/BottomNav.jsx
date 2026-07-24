import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function BottomNav() {
    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction label="分析" icon={<BarChartIcon />}
                component={Link}
                to="/Chart" />
            <BottomNavigationAction label="検索" icon={<SearchIcon />}
                component={Link}
                to="/ProductSearch" />
            <BottomNavigationAction label="ホーム" icon={<HomeIcon />}
                component={Link}
                to="/Calendar" />
            <BottomNavigationAction label="仕分け" icon={<CategoryIcon />} />
            <BottomNavigationAction label="マイページ" icon={<PersonIcon />}
                component={Link}
                to="/Mypage" />
        </BottomNavigation>
    )
}

