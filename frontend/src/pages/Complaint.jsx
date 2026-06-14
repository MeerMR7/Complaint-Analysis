import {useState} from "react"
import axios from "axios"


export default function Complaint(){

const [complaint,setComplaint]=useState("")
const [loading,setLoading]=useState(false)
const [result,setResult]=useState("")

const analyzeComplaint = async () => {

    try{
    
    setLoading(true)
    
    const token = localStorage.getItem("token")
    
    console.log(token)
    
    const res = await axios.post(
        `http://127.0.0.1:8000/complaints/predict?text=${complaint}`,
        
        null,
        
        {
        headers:{
        Authorization:`Bearer ${token}`
        }
        }
        )
    
        console.log("API RESPONSE:", res.data)

        setResult(
        res.data.sentiment ||
        res.data.prediction ||
        res.data.result
        )
    
    setLoading(false)
    
    }
    
    catch(err){
    
    console.log(err)
    
    setLoading(false)
    
    alert("Prediction Failed")
    
    }
    
    }

return(

<div className="auth-page">

<div className="auth-card">

<div className="complaint-title">


<h1>
Complaint
</h1>

<span>📝</span>

<a href="/">
      <button className="logout-btn">
      Logout →
      </button>
      </a>



</div>



<textarea
rows="5"
placeholder="Describe your complaint..."
value={complaint}
onChange={(e)=>setComplaint(e.target.value)}
className="complaint-box"
/>

<button
className="complaint-btn"
onClick={analyzeComplaint}
disabled={loading}
>

{
loading
?
"Analyzing..."
:
"Analyze Complaint →"
}

</button>

{
result && (

<p
style={{
marginTop:"18px",
color:
result==="Positive"
?
"#00ff99"
:
"#ff5555",

fontWeight:"700"
}}
>

<p
style={{
marginTop:"18px",
fontSize:"22px",
fontWeight:"700",
color:
result==="Positive"
? "#00ff99"
: "#ff5555"
}}
>

{result==="Positive"
? "✅ Positive"
: "❌ Negative"}

</p>

</p>

)
}

</div>

</div>

)

}