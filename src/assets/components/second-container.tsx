import React from "react";
import "../css/second-container.css";

const SecondContainer: React.FC = () => {
  return (
    <div className="second-container">
      <div className="second-container-buttons">
        <button className="window-btn">−</button>
        <button className="window-btn">□</button>
        <button className="window-btn close-btn">×</button>
      </div>
    </div>
  );
};

export default SecondContainer;
