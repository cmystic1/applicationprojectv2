import React from "react";
import "../css/third-container.css";
import { BsShieldFill } from "react-icons/bs";
import Downloading from '../../assets/components/downloading';

const ThirdContainer: React.FC = () => {
    return (
        <div className="third-container">
            <div className="third-container-title-bar" >
                <div className="title-left">
                    <BsShieldFill className="shield-icon" />
                    <span className="title-text" style={{ fontSize: '15px', fontWeight: 600 }}>
                        Windows Security
                    </span>
                </div>
                <div className="third-container-buttons">
                    <button className="window-btn" style={windowButtonStyle} aria-label="Minimize">−</button>
                    <button className="window-btn" style={windowButtonStyle} aria-label="Maximize">□</button>
                    <button className="window-btn close-btn" style={{ ...windowButtonStyle, background: '#e81123' }} aria-label="Close">×</button>
                </div>
            </div>

            <div className="third-container-body">
                <div style={{
                    marginBottom: '20px',
                    color: '#0052cc',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    lineHeight: 1.1,
                }}>
                    SECURITY ASSESSMENT INCOMPLETE — ACTION REQUIRED IMMEDIATELY.
                </div>

                <div style={{
                    color: '#c42b1c',
                    fontSize: '34px',
                    fontWeight: 'bold',
                    margin: '20px 0',
                }}>
                    Problem : 0x88820
                </div>

                <div style={{
                    fontSize: '22px',
                    color: '#1e1e1e',
                    margin: '18px 0',
                    fontWeight: 500,
                }}>
                    IP Detected: 95.122.68.19
                </div>

                <p style={{
                    fontSize: '17px',
                    color: '#333',
                    margin: '16px 0',
                    lineHeight: 1,
                }}>
                    Microsoft Defender found infected files but could not remove them.
                </p>

                <p style={{
                    fontSize: '17px',
                    color: '#333',
                    margin: '12px 0 30px',
                    lineHeight: 1.4,
                }}>
                    Policy permissions. Please scan now to delete them immediately.
                </p>

                <div style={{
                    margin: '30px auto',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'rgba(0,120,212,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Downloading />

                </div>

                <div className="third-container-footer" style={{ marginTop: '40px' }}>
                    <button className="footer-btn" style={{
                        backgroundColor: '#0078d4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '14px 60px',
                        fontSize: '22px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,120,212,0.3)',
                        transition: 'all 0.15s',
                    }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#0067c5'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#0078d4'}
                    >
                        Call
                    </button>
                </div>

                <div style={{
                    marginTop: '30px',
                    fontSize: '15px',
                    color: '#666',
                }}>
                    Microsoft Defender Security Center • Do not close this window
                </div>
            </div>
        </div>
    );
};

const windowButtonStyle = {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
} as const;

export default ThirdContainer;