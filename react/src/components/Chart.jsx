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

import { useState } from "react";
import "./Chart.css";

const graphData = {
  "2026-07":{
    //浪費総額

    buy: 6500 + 5900 + 8000 + 810 + 5600,
    sell: 650 + 590 + 2000 + 0 + 1600,

    // x 軸のラベル
  labels: ['カテゴリ 1', 'カテゴリ 2', 'カテゴリ 3', 'カテゴリ 4', 'カテゴリ 5'],
  datasets: [
    {
      label: 'カテゴリ別浪費額',
      // データの値
      data: [-6500, -5900, -8000, -810, -5600],
      // グラフの背景色
      backgroundColor: [
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(201, 203, 207, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        // 'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
    {
      label: 'カテゴリ別売却額',
      // データの値
      data: [650, 590, 2000, 0, 1600],
      // グラフの背景色
      backgroundColor: [
        'rgba(0, 156, 123, 0.2)',
        // 'rgba(0, 96, 191, 0.2)',
        // 'rgba(0, 50, 169, 0.2)',
        // 'rgba(180, 63, 63, 0.2)',
        // 'rgba(201, 93, 20, 0.2)',
        // 'rgba(102, 153, 0, 0.2)',
        // 'rgba(54, 52, 48, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
  
  ],
  },

    "2026-06":{
    //浪費総額

    buy: 65000 + 900 + 800 + 810 + 56000,
    sell: 650 + 590 + 2000 + 0 + 1600,

    // x 軸のラベル
  labels: ['カテゴリ 1', 'カテゴリ 2', 'カテゴリ 3', 'カテゴリ 4', 'カテゴリ 5'],
  datasets: [
    {
      label: 'カテゴリ別浪費額',
      // データの値
      data: [-65000, -900, -800, -810, -56000],
      // グラフの背景色
      backgroundColor: [
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(201, 203, 207, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        // 'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
    {
      label: 'カテゴリ別売却額',
      // データの値
      data: [650, 590, 2000, 0, 1600],
      // グラフの背景色
      backgroundColor: [
        'rgba(0, 156, 123, 0.2)',
        // 'rgba(0, 96, 191, 0.2)',
        // 'rgba(0, 50, 169, 0.2)',
        // 'rgba(180, 63, 63, 0.2)',
        // 'rgba(201, 93, 20, 0.2)',
        // 'rgba(102, 153, 0, 0.2)',
        // 'rgba(54, 52, 48, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
  
  ],
  },

    "2026-05":{
   //浪費総額

    buy: 500 + 590 + 800 + 810 + 5600,
    sell: 650 + 590 + 2000 + 0 + 1600,

    // x 軸のラベル
  labels: ['カテゴリ 1', 'カテゴリ 2', 'カテゴリ 3', 'カテゴリ 4', 'カテゴリ 5'],
  datasets: [
    {
      label: 'カテゴリ別浪費額',
      // データの値
      data: [-500, -590, -800, -810, -5600],
      // グラフの背景色
      backgroundColor: [
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(201, 203, 207, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        // 'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
    {
      label: 'カテゴリ別売却額',
      // データの値
      data: [650, 590, 2000, 0, 1600],
      // グラフの背景色
      backgroundColor: [
        'rgba(0, 156, 123, 0.2)',
        // 'rgba(0, 96, 191, 0.2)',
        // 'rgba(0, 50, 169, 0.2)',
        // 'rgba(180, 63, 63, 0.2)',
        // 'rgba(201, 93, 20, 0.2)',
        // 'rgba(102, 153, 0, 0.2)',
        // 'rgba(54, 52, 48, 0.2)',
      ],
      // グラフの枠線の色
      borderColor: [
        'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        // 'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        // 'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
  
  ],
  },
};
// レンダリング
export default function Chart(){

  const [month, setMonth] = useState("2026-07");

  const spendingTotal = graphData[month].buy - graphData[month].sell;

  return(
  <div>
    <div>
      <label></label>

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="2026-07">2026年7月</option>
        <option value="2026-06">2026年6月</option>
        <option value="2026-05">2026年5月</option>
      </select>
    </div>
    
      <div className="chart-container">
        <Bar data={graphData[month]}
        options={{
          maintainAspectRatio:false
        }} />
      </div>
    <p>総浪費額：{spendingTotal}円</p>
  </div>
  );
}