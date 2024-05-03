import "./App.css";
import BarChart from "./graph/BarChart";

const configs = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
  ],
  borderColor: [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
  ],
  borderWidth: 1,
};
const labels1 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const data1 = [2, 28, 14, 15, 16, 32, 40];

const labels2 = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const data2 = [5, 8, 13, 15, 16, 32, 50, 3, 5, 44, 22];

function App() {
  return (
    <>
      <BarChart configs={configs} data={data1} labels={labels1} />
      <BarChart configs={configs} data={data2} labels={labels2} />
    </>
  );
}

export default App;
