import { useEffect, useState } from "react";

function Dashboard() {

  const [data, setData] = useState(null)

  useEffect(() => {

    fetch("http://127.0.0.1:8000/complaints/dashboard", {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setData(result)
      })

  }, [])

    return (

      <div className="dashboard">
      
      <div className="topbar">
      
      <h1>
      Complaint Dashboard 📊
      </h1>
      <p className="live-tag">
      🟢 Live Analytics
      </p>
      
      <a href="/">
      <button className="logout-btn">
      Logout →
      </button>
      </a>
      
      </div>
      
      <p className="subtitle">
      AI Powered Insights
      </p>
      
      <div className="stats">
      
      <div className="stat-box">
      <h2>250</h2>
      <p>Total Complaints</p>
      </div>
      
      <div className="stat-box">
      <h2>68%</h2>
      <p>Positive</p>
      </div>
      
      <div className="stat-box">
      <h2>32%</h2>
      <p>Negative</p>
      </div>
      
      </div>
      
      <div className="charts">
      
      <div className="chart-card">
      📈 Sentiment Chart
      </div>
      
      <div className="chart-card">
      🥧 Complaint Distribution
      </div>
      
      </div>
      
      </div>
      
      )
}

export default Dashboard