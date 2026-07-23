import React from "react";
import { useNavigate } from "react-router-dom";

function PickCard() {
  const navigate = useNavigate();

  const pickCard = () => {
    navigate("/role");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "900px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "gold",
            fontSize: "55px",
          }}
        >
          🎮 GAME STARTED
        </h1>

        <h2>
          Pick Your Secret Parchi
        </h2>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {[1,2,3,4].map((card)=>(
            <div
              key={card}
              onClick={pickCard}
              style={{
                width:"150px",
                height:"220px",
                border:"3px solid gold",
                borderRadius:"15px",
                cursor:"pointer",
                background:"#222",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                fontSize:"60px",
                transition:"0.3s",
              }}
            >
              🂠
            </div>
          ))}
        </div>

        <br />

        <h3 style={{color:"orange"}}>
          Select Any Parchi
        </h3>

      </div>
    </div>
  );
}

export default PickCard;