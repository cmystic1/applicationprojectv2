import React from "react";
import "../css/third-container.css";
import { BsShieldLock } from "react-icons/bs";
import Downloading from '../../assets/components/downloading';  

const ThirdContainer: React.FC = () => {
    return (
        <div className="third-container">
            <div className="third-container-title-bar">
                <div className="title-left">
                    <BsShieldLock className="shield-icon" />
                    <span className="title-text">Security Center</span>
                </div>
                <div className="third-container-buttons">
                    <button className="window-btn">−</button>
                    <button className="window-btn">□</button>
                    <button className="window-btn close-btn">×</button>
                </div>
            </div>

            <div className="third-container-body" style={{ marginTop: "10px" }}>
                <h2 style={{ fontSize: "38px" }}>
                    Regretfully, the assessment is not concluded!
                </h2>
                <h2 style={{ fontSize: "36px", color: "#ea1111", margin: "15px 0 0 0" }}>
                    Problem : 0x88820
                </h2>
                <p style={{ fontSize: "26px", color: "#524f4f", marginTop: "15px" }}>
                    IP Detected: 95.122.68.19
                </p>
                <p style={{ fontSize: "20px", color: "#000", marginTop: "15px" }}>
                    Microsoft Defender found infected files but could not remove them.
                </p>
                <p style={{ fontSize: "20px", color: "#000" }}>
                    Policy permissions. Please scan now to delete them immediately.
                </p>
            </div>
            <Downloading />
            {/* <video
                className="security-video"
                src="/microsoft/microsoft.mp4"
                autoPlay
                loop
                muted
                playsInline
            /> */}


            <div className="third-container-footer">
                <button className="footer-btn" style={{background: "red", color: "white", height: "50px", width: "150px", fontSize: "20px"}}>Audit Now</button>
            </div>
        </div>
    );
};

export default ThirdContainer;
