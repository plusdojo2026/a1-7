import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { useState, useEffect } from "react";
import "./Chart.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";

// レンダリング
export default function Chart(){

  const [month, setMonth] = useState("2026-07");

  const [chartData, setChartData] = useState(null);

  const [spendingTotal, setSpendingTotal] = useState(0);

  

  useEffect(() => {

  fetch(`http://localhost:8080/api/graph?month=${month}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      const chart = {
        labels: data.graph.map(item => `${item.category}`),

        datasets:[
          {
            label:"浪費額",

            data:data.graph.map(item => -item.buy),

             backgroundColor:
                "rgba(255,205,86,0.2)",

              borderColor:
                "rgb(255,205,86)",

              borderWidth:1
          },
          {
            label:"売却額",
            data:data.graph.map(item => item.sell),
              backgroundColor:
                "rgba(0,156,123,0.2)",

              borderColor:
                "rgb(0,156,123)",

              borderWidth:1
          }
        ]
      }
      //jsonを保存
      setChartData(chart)

      //総浪費額保存
      setSpendingTotal(data.total)
    });

}, [month]);

 
  return(
  <div>
    <div>
      <label></label>

         <input type="month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
    />
    </div>
    
      <div className="chart-container">
       {chartData &&( <Bar data={chartData}
        options={{
          maintainAspectRatio:false
        }} />
      )}
      </div>
    <p>総浪費額：{spendingTotal}円</p>

      <BottomNav />
  </div>
  
  );
}