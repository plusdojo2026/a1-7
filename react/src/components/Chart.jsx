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
import BottomNav from "./BottomNav";
import Header from "./Header";

// レンダリング
export default function Chart(){

  const [month, setMonth] = useState("2026-07");

  const [chartData, setChartData] = useState(null);

  const [spendingTotal, setSpendingTotal] = useState(0);

  const [lastTotal, setLastTotal] = useState(0);

  useEffect(() => {
  document.body.classList.add("chart-screen");

  return () => {
    document.body.classList.remove("chart-screen");
  };
}, []);

  useEffect(() => {

    const userId = sessionStorage.getItem("id");

  fetch(`http://localhost:8080/api/graph?month=${month}&userId=${userId}`)
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

       // 先月総浪費額保存
      setLastTotal(data.lastTotal);
    });

   

}, [month]);

 const diff = spendingTotal - lastTotal;

  return(
    
  <div className="chart-page">
    <Header />
    <div className="content7">
      <label></label>

         <input type="month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
    />
    </div>
    
      <div className="chart-container7">
       {chartData &&( <Bar data={chartData}
        options={{
          maintainAspectRatio:false
        }} />
      )}
      </div>
      <div className="total-card">
      <p className="total-title">総浪費額：{spendingTotal}円</p>
      <p>
      {diff > 0
      ? `先月より${diff}円多く浪費しました`
      : `先月より${Math.abs(diff)}円浪費を抑えられました`}
      </p>
      </div>
    
      <BottomNav />
  </div>
  
  );
}